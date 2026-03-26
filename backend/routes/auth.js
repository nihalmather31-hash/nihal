const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../server-debug.log');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const { protect, isMainAdmin, log } = require('../middleware/auth');

// @route   POST /api/auth/reset-password-temp
// @desc    TEMPORARY - Reset a user's password directly (remove after use)
// @access  Public (TEMP - remove this route in production)
router.post('/reset-password-temp', async (req, res) => {
    try {
        const { username, newPassword, secretKey } = req.body;
        // Basic protection so random users can't abuse this endpoint
        if (secretKey !== 'RESET_SECRET_2026') {
            return res.status(403).json({ success: false, message: 'Invalid key' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: `User '${username}' not found` });
        }
        user.password = newPassword;
        await user.save(); // pre-save hook will hash the password
        log(`Password reset for user: ${username} (role: ${user.role})`);
        res.json({ success: true, message: `Password for '${username}' reset successfully`, role: user.role, status: user.status });
    } catch (error) {
        log(`Reset password error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        log(`Login Request: ${JSON.stringify(req.body)}`);

        // Map incoming role to check both old and new role variants
        const roleVariants = {
            'local-admin': ['local-admin', 'local'],
            'local': ['local-admin', 'local'],
            'main-admin': ['main-admin', 'main'],
            'main': ['main-admin', 'main'],
            'general': ['general', 'user'],
            'user': ['general', 'user']
        };
        const rolesToCheck = roleVariants[role] || [role];

        // Find user by username + matching role (supports old and new role values)
        const user = await User.findOne({ username, role: { $in: rolesToCheck } });

        if (!user) {
            const allUsers = await User.find({});
            log(`User not found. All Users in DB: ${JSON.stringify(allUsers.map(u => ({ u: u.username, r: u.role })))}`);
            log(`Searching for username: '${username}', roles tried: ${JSON.stringify(rolesToCheck)}`);
        } else {
            log(`User found: ${user.username}, role: ${user.role}`);
        }

        let isMatch = false;
        if (user) {
            isMatch = await user.matchPassword(password);
            log(`Password match result for ${username}: ${isMatch}`);
        }

        if (user && isMatch) {
            // Check approval status for ALL local admin roles (old 'local' AND new 'local-admin')
            const localAdminRoles = ['local-admin', 'local'];
            const skipStatusCheck = ['main-admin', 'main', 'general', 'user']; // these are auto-approved or not managed

            if (localAdminRoles.includes(user.role)) {
                if (user.status === 'pending') {
                    log(`User ${username} status is pending. Access denied.`);
                    return res.status(403).json({
                        success: false,
                        message: 'Account pending approval. Please wait for the main administrator to approve your account.'
                    });
                }
                if (user.status === 'rejected') {
                    log(`User ${username} status is rejected. Access denied.`);
                    return res.status(403).json({
                        success: false,
                        message: 'Account has been rejected by the administrator.'
                    });
                }
            }

            // Account is approved, allow login
            user.lastLogin = Date.now();
            await user.save();
            log(`Login successful for ${username}`);
            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    district: user.district || '',
                    city: user.city || '',
                    village: user.village || ''
                },
                token: generateToken(user._id)
            });
        } else {
            log(`Login failed for ${username}: Invalid username or password`);
            res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        log(`Login error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/auth/register
// @desc    Register new user (for initial setup)
// @access  Public (you may want to protect this later)
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, email, fullName, phone, address, district, city, village } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            username,
            password,
            role,
            email,
            fullName,
            phone,
            address,
            district,
            city,
            village
        });

        if (user) {
            res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    status: user.status,
                    email: user.email,
                    fullName: user.fullName
                },
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (user) {
            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
});

// @route   GET /api/auth/local-admins
// @desc    Get all local admins grouped by status
// @access  Private (Main Admin only)
router.get('/local-admins', protect, isMainAdmin, async (req, res) => {
    try {
        // Query for both old 'local' and new 'local-admin' role values
        const localAdmins = await User.find({
            role: { $in: ['local-admin', 'local'] }
        }).select('-password');

        // Group by status
        const grouped = {
            pending: localAdmins.filter(u => u.status === 'pending'),
            approved: localAdmins.filter(u => u.status === 'approved'),
            rejected: localAdmins.filter(u => u.status === 'rejected')
        };

        res.json({
            success: true,
            data: grouped
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/auth/approve/:id
// @desc    Approve a local admin
// @access  Private (Main Admin only)
router.put('/approve/:id', protect, isMainAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!['local-admin', 'local'].includes(user.role)) {
            return res.status(400).json({
                success: false,
                message: 'Can only approve local admin accounts'
            });
        }

        user.status = 'approved';
        await user.save();

        res.json({
            success: true,
            message: 'User approved successfully',
            user: {
                id: user._id,
                username: user.username,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/auth/reject/:id
// @desc    Reject a local admin
// @access  Private (Main Admin only)
router.put('/reject/:id', protect, isMainAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!['local-admin', 'local'].includes(user.role)) {
            return res.status(400).json({
                success: false,
                message: 'Can only reject local admin accounts'
            });
        }

        user.status = 'rejected';
        await user.save();

        res.json({
            success: true,
            message: 'User rejected successfully',
            user: {
                id: user._id,
                username: user.username,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/auth/users/:id
// @desc    Delete a user
// @access  Private (Main Admin only)
router.delete('/users/:id', protect, isMainAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'main-admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete main admin account'
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/auth/users
// @desc    Get all users (for main-admin)
// @access  Private (Main Admin only)
router.get('/users', protect, isMainAdmin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/auth/main-admin-id
// @desc    Get main admin ID for chat (Public)
router.get('/main-admin-id', async (req, res) => {
    try {
        const admin = await User.findOne({ role: { $in: ['main-admin', 'main'] } }).select('_id username');
        if (admin) {
            res.json({ success: true, admin });
        } else {
            res.status(404).json({ success: false, message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
