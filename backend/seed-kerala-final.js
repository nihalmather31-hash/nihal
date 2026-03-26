const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('./models/Place');

const comprehensiveData = [
  {
    district: 'Idukki',
    city: 'Munnar',
    village: 'Munnar Colony',
    description: "Munnar is Kerala's most famous hill station, known for its sprawling tea estates and cool climate.",
    hotels: [
      {
        name: 'Panoramic Getaway',
        description: 'Luxury hilltop resort with heated pools',
        price: '8500',
        distance: 10,
        bookingLink: 'https://www.thepanoramicgetaway.com/'
      },
      {
        name: 'Amber Dale Luxury Hotel',
        description: 'Premium stay with mountain views',
        price: '5500',
        distance: 5,
        bookingLink: 'https://www.amberdalemunnar.com/'
      },
      {
        name: 'Sunleo Spice Villas',
        description: 'Highly rated budget stay',
        price: '1200',
        distance: 2,
        bookingLink: 'https://www.booking.com/hotel/in/sunleo-spice-villas.html'
      },
      {
        name: 'Munnar Inn',
        description: 'Convenient town center hotel',
        price: '2200',
        distance: 0.5,
        bookingLink: 'http://www.munnarinn.in/'
      },
      {
        name: 'Grand Munnar Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.3391549379387095
      },
      {
        name: 'Munnar Colony Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.301188293393827
      },
      {
        name: 'Sunrise Munnar Colony Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.403687922350325
      },
      {
        name: 'Munnar Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.9308322580326889
      },
      {
        name: 'Blue Lagoon Munnar Colony',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.493220490131334
      },
      {
        name: 'Green Park Munnar',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.0125177085568873
      }
    ],
    food: [
      {
        name: 'Hotel Gurubhavan',
        description: 'Famous for Kerala style beef fry and seafood',
        price: '400',
        distance: 1
      },
      {
        name: 'Saravana Bhavan',
        description: 'Reliable South Indian vegetarian meals',
        price: '250',
        distance: 0.5
      },
      {
        name: 'Rapsy Restaurant',
        description: 'Budget friendly with great parathas',
        price: '150',
        distance: 0.6
      },
      {
        name: 'Tea Tales Cafe',
        description: 'Cozy cafe for tea and snacks',
        price: '300',
        distance: 0.2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Munnar Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 0.9515159740490772
      },
      {
        name: 'Munnar Colony Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.1115636714625685
      },
      {
        name: 'Green Leaf Munnar',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.8440483208503275
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'KSRTC (from Aluva RS)',
        route: 'Aluva Railway Station to Munnar',
        price: '180',
        distance: 110
      },
      {
        type: 'Taxi',
        name: 'Prepaid Taxi (from Aluva RS)',
        route: 'Aluva Railway Station to Munnar',
        price: '3000',
        distance: 110
      },
      {
        type: 'Auto',
        name: 'Local Auto',
        route: 'Munnar Town to Sightseeing (Half Day)',
        price: '800',
        distance: 15
      }
    ],
    banks: [
      {
        name: 'SBI Munnar Branch',
        description: 'Near Town Hall',
        distance: 0.5
      },
      {
        name: 'Union Bank of India',
        description: 'Main Bazar',
        distance: 0.4
      },
      {
        name: 'South Indian Bank',
        description: 'Colony Road',
        distance: 0.8
      }
    ],
    medical: [
      {
        name: 'Munnar Medicals',
        description: '24/7 Pharmacy in town center',
        distance: 0.5
      },
      {
        name: 'Neethi Medical Store',
        description: 'Near Mattupetty Road',
        distance: 1.2
      }
    ],
    events: [
      {
        name: 'Kathakali Performance',
        description: 'Traditional Kerala dance drama portraying Hindu epics.',
        timing: 'Daily, 6:00 PM - 7:00 PM',
        venue: 'Munnar Punarjani Traditional Village'
      },
      {
        name: 'Kalaripayattu Show',
        description: 'Ancient martial art demonstration with traditional weapons.',
        timing: 'Daily, 5:00 PM - 6:00 PM',
        venue: 'Punarjani Village Center'
      },
      {
        name: 'Munnar Flower Show',
        description: 'Annual seasonal floral exhibition featuring diverse mountain species.',
        timing: 'January - March, 9:00 AM - 8:00 PM',
        venue: 'Munnar Botanical Garden'
      }
    ],
    fuelStations: [
      {
        name: 'HP Petrol Pump - Munnar Town',
        type: 'Petrol/Diesel',
        description: 'Centrally located',
        distance: 0.5
      },
      {
        name: 'KSEB EV Charging Station',
        type: 'EV',
        description: 'Near Bus Stand',
        distance: 1.2
      },
      {
        name: 'Indian Oil Pump',
        type: 'Petrol/Diesel',
        description: 'On the way to Mattupetty',
        distance: 2.5
      }
    ],
    emergency: {
      police: '04865-230321',
      hospital: '04865-232222',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Eravikulam National Park',
        description: 'Home to the endangered Nilgiri Tahr',
        price: '200',
        distance: 15
      },
      {
        name: 'Mattupetty Dam',
        description: 'Beautiful lake for boating',
        price: '50',
        distance: 12
      }
    ]
  },
  {
    district: 'Thiruvananthapuram',
    city: 'Trivandrum',
    village: 'Varkala Beach',
    description: 'Varkala is famous for its unique red cliffs overlooking the Arabian Sea and its pristine beaches.',
    hotels: [
      {
        name: 'Gateway Varkala - IHCL',
        description: 'Luxury resort on the cliff edge',
        price: '9500',
        distance: 0.5,
        bookingLink: 'https://www.tajhotels.com/en-in/gateway/varkala/'
      },
      {
        name: 'Black Beach Resort',
        description: 'Waterfront property at North Cliff',
        price: '4000',
        distance: 0.2,
        bookingLink: 'https://www.blackbeachresort.com/'
      },
      {
        name: 'Jickys Nest',
        description: 'Popular budget stay near the cliff',
        price: '1500',
        distance: 0.3,
        bookingLink: 'https://www.jickysnest.com/'
      },
      {
        name: 'Clafouti Beach Resort',
        description: 'Boutique stay with sea views',
        price: '4500',
        distance: 0.2,
        bookingLink: 'https://www.clafoutiresort.com/'
      },
      {
        name: 'Grand Trivandrum Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 4.292528982613152
      },
      {
        name: 'Varkala Beach Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.8071365761612097
      },
      {
        name: 'Sunrise Varkala Beach Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.490666422832319
      },
      {
        name: 'Trivandrum Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 0.6988694785609897
      },
      {
        name: 'Blue Lagoon Varkala Beach',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.885238501662899
      },
      {
        name: 'Green Park Trivandrum',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.887703120131123
      }
    ],
    food: [
      {
        name: 'Darjeeling Cafe',
        description: 'Vibrant cafe with great music and sea views',
        price: '600',
        distance: 0.3
      },
      {
        name: 'ABBA Restaurant',
        description: 'Large menu with fresh seafood and bakery',
        price: '800',
        distance: 0.4
      },
      {
        name: 'Gods Own Country Kitchen',
        description: 'Best for authentic Kerala seafood',
        price: '700',
        distance: 0.5
      },
      {
        name: 'Inda Cafe',
        description: 'Healthy bowls and great coffee',
        price: '500',
        distance: 0.2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Trivandrum Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 0.9080645390737605
      },
      {
        name: 'Varkala Beach Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.730768566387275
      },
      {
        name: 'Green Leaf Trivandrum',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.7035643610864784
      }
    ],
    transport: [
      {
        type: 'Auto',
        name: 'Local Auto (from Varkala RS)',
        route: 'Varkala Sivagiri Station to Cliff',
        price: '100',
        distance: 3.5
      },
      {
        type: 'Taxi',
        name: 'Taxi (from Varkala RS)',
        route: 'Varkala Sivagiri Station to Cliff',
        price: '250',
        distance: 3.5
      },
      {
        type: 'Rent',
        name: 'Scooter Rental',
        route: 'Daily Rental',
        price: '500',
        distance: 0
      }
    ],
    banks: [
      {
        name: 'Federal Bank Varkala',
        description: 'Near Temple Road',
        distance: 2
      },
      {
        name: 'HDFC Bank',
        description: 'Puthenchantha',
        distance: 2.5
      },
      {
        name: 'SBI ATM Cliff',
        description: 'Near North Cliff Entrance',
        distance: 0.2
      }
    ],
    medical: [
      {
        name: 'New Life Medicals',
        description: 'Main Road Varkala',
        distance: 2.5
      },
      {
        name: 'Viswas Medicals',
        description: 'Near Railway Station',
        distance: 3.4
      }
    ],
    events: [
      {
        name: 'Kathakali & Mohiniyattam',
        description: 'Evening cultural showcase of classical dances.',
        timing: 'Daily, 6:30 PM - 8:00 PM',
        venue: 'Varkala Cultural Center'
      },
      {
        name: 'Sivagiri Pilgrimage',
        description: 'Traditional spiritual gathering and spiritual discourses.',
        timing: 'Dec 30 - Jan 1, All Day',
        venue: 'Sivagiri Mutt'
      },
      {
        name: 'Yoga Beach Sessions',
        description: 'Group meditation and yoga practice by the cliff side.',
        timing: 'Daily, 7:00 AM - 8:30 AM',
        venue: 'North Cliff Yoga Deck'
      }
    ],
    touristspots: [
      {
        name: 'Varkala Cliff',
        description: 'Famous red cliffs overlooking the Arabian Sea, perfect for sunset views',
        price: 'Free',
        distance: 0
      },
      {
        name: 'Janardanaswamy Temple',
        description: 'A 2000-year-old Hindu temple also known as Dakshin Kashi',
        price: 'Free',
        distance: 1.5
      },
      {
        name: 'Sivagiri Mutt',
        description: 'Ashram founded by the social reformer Sree Narayana Guru',
        price: 'Free',
        distance: 3.5
      },
      {
        name: 'Kappil Beach & Backwaters',
        description: 'Where backwaters meet the sea, offering boat rides and serene views',
        price: 'Free',
        distance: 7
      },
      {
        name: 'Ponnumthuruthu Island',
        description: 'Golden island surrounded by scenic backwaters, accessible by boat',
        price: '500',
        distance: 10
      },
      {
        name: 'Odayam Beach',
        description: 'A quiet, uncrowded beach perfect for a peaceful evening',
        price: 'Free',
        distance: 2
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Varkala Town',
        type: 'Petrol/Diesel',
        description: 'Main Junction',
        distance: 3.2
      },
      {
        name: 'Varkala EV Charging Point',
        type: 'EV',
        description: 'Near Railway Station',
        distance: 3.5
      }
    ],
    emergency: {
      police: '0470-2602331',
      hospital: '0470-2607730',
      fire: '101'
    }
  },
  {
    district: 'Ernakulam',
    city: 'Kochi',
    village: 'Fort Kochi',
    description: 'Fort Kochi is a historic neighborhood known for its colonial architecture and Chinese fishing nets.',
    hotels: [
      {
        name: 'Brunton Boatyard',
        description: 'Classic heritage luxury hotel',
        price: '15000',
        distance: 0.2,
        bookingLink: 'https://www.cghearth.com/brunton-boatyard'
      },
      {
        name: 'Forte Kochi',
        description: 'Restored colonial mansion',
        price: '12000',
        distance: 0.3,
        bookingLink: 'https://www.fortekochi.in/'
      },
      {
        name: 'Villa Elixir',
        description: 'Quiet boutique stay',
        price: '3000',
        distance: 0.8,
        bookingLink: 'https://www.villaelixir.com/'
      },
      {
        name: 'Dream Catcher Homestay',
        description: 'Cozy and affordable',
        price: '1800',
        distance: 0.5,
        bookingLink: 'https://www.booking.com/hotel/in/dream-catcher-home-stay-kochi.html'
      },
      {
        name: 'Grand Kochi Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.5728529473443973
      },
      {
        name: 'Fort Kochi Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.3181936764531628
      },
      {
        name: 'Sunrise Fort Kochi Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.006130769168276
      },
      {
        name: 'Kochi Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.0977615953952304
      },
      {
        name: 'Blue Lagoon Fort Kochi',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.1072254029990845
      },
      {
        name: 'Green Park Kochi',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.730549072025389
      }
    ],
    food: [
      {
        name: 'FusionBay',
        description: 'Top rated for Syrian Christian cuisine',
        price: '800',
        distance: 0.4
      },
      {
        name: 'Sree Muruga Cafe',
        description: 'Local fav for beef fry and pazhampori',
        price: '200',
        distance: 1.2
      },
      {
        name: 'Kashi Art Cafe',
        description: 'Art gallery cafe with great chocolate cake',
        price: '500',
        distance: 0.5
      },
      {
        name: 'Dal Roti',
        description: 'North Indian style wraps and rolls',
        price: '400',
        distance: 0.3
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kochi Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.8035354514915451
      },
      {
        name: 'Fort Kochi Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 1.9436563682541779
      },
      {
        name: 'Green Leaf Kochi',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.8184374345237693
      }
    ],
    transport: [
      {
        type: 'Ferry',
        name: 'Public Ferry',
        route: 'Ernakulam Jetty to Fort Kochi',
        price: '10',
        distance: 5
      },
      {
        type: 'Taxi',
        name: 'Uber/Taxi',
        route: 'Ernakulam South RS to Fort Kochi',
        price: '350',
        distance: 12
      },
      {
        type: 'Metro',
        name: 'Kochi Metro + Bus',
        route: 'South RS to MG Road then Bus',
        price: '40',
        distance: 12
      }
    ],
    banks: [
      {
        name: 'South Indian Bank',
        description: 'Near Beach',
        distance: 0.3
      },
      {
        name: 'Canara Bank Fort Kochi',
        description: 'Princess Street',
        distance: 0.5
      },
      {
        name: 'HDFC Bank ATM',
        description: 'Near Maritime Museum',
        distance: 1
      }
    ],
    medical: [
      {
        name: 'Regal Medicals',
        description: 'Princess Street',
        distance: 0.4
      },
      {
        name: 'Davaindia Generic Pharmacy',
        description: 'Amaravathi Road',
        distance: 0.8
      }
    ],
    events: [
      {
        name: 'Keralagramam Kathakali',
        description: 'Intimate classical dance-drama experience.',
        timing: 'Daily, 6:00 PM - 7:30 PM',
        venue: 'Fort Kochi Kathakali Centre'
      },
      {
        name: 'Cochin Carnival',
        description: 'Massive New Year celebration with parades and music.',
        timing: 'Last Week of Dec, All Day',
        venue: 'Fort Kochi Beach'
      },
      {
        name: 'Art Gallery Walks',
        description: 'Guided tours through local contemporary art spaces.',
        timing: 'Tue - Sun, 10:00 AM - 5:00 PM',
        venue: 'Kashi Art Gallery & David Hall'
      }
    ],
    fuelStations: [
      {
        name: 'Bharat Petroleum - Thoppumpady',
        type: 'Petrol/Diesel',
        description: 'Nearest major pump',
        distance: 3.5
      },
      {
        name: 'Kochi Smart EV Charging',
        type: 'EV',
        description: 'Near Beach Walk',
        distance: 0.8
      }
    ],
    emergency: {
      police: '0484-2215055',
      hospital: '0484-2216007',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Chinese Fishing Nets',
        description: 'Iconic mechanical fishing nets',
        price: 'Free',
        distance: 0.5
      },
      {
        name: 'Mattancherry Palace',
        description: 'Historic Portuguese palace',
        price: '50',
        distance: 2.5
      }
    ]
  },
  {
    district: 'Alappuzha',
    city: 'Alappuzha',
    village: 'Punnamada',
    description: 'The houseboat capital of Kerala, famous for its backwater cruises and Nehru Trophy Boat Race.',
    hotels: [
      {
        name: 'Ramada by Wyndham',
        description: 'Luxury hotel with backwater views',
        price: '9000',
        distance: 1.5,
        bookingLink: 'https://www.wyndhamhotels.com/ramada/alleppey-india/ramada-alleppey/'
      },
      {
        name: 'Uday Backwater Resort',
        description: 'Waterfront eco-resort',
        price: '7000',
        distance: 2,
        bookingLink: 'https://www.udaybackwaterresort.in/'
      },
      {
        name: 'Windsor Castle',
        description: 'Premium stay near finishing point',
        price: '4500',
        distance: 1,
        bookingLink: 'http://www.thewindsorcastle.net/'
      },
      {
        name: 'Alleppey Prince Hotel',
        description: 'Classic town hotel',
        price: '3000',
        distance: 3,
        bookingLink: 'https://www.alleppeyprincehotel.com/'
      },
      {
        name: 'Grand Alappuzha Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.3228284874419822
      },
      {
        name: 'Punnamada Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.4938223470618803
      },
      {
        name: 'Sunrise Punnamada Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 3.9520836052899053
      },
      {
        name: 'Alappuzha Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.1001570171107924
      },
      {
        name: 'Blue Lagoon Punnamada',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.919391587843824
      },
      {
        name: 'Green Park Alappuzha',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.214544783996808
      }
    ],
    food: [
      {
        name: 'Halais Restaurant',
        description: 'Best for Malabar Biryani',
        price: '350',
        distance: 2.5
      },
      {
        name: 'Thaff Delicacy',
        description: 'Wide range of seafood and local meals',
        price: '450',
        distance: 2.2
      },
      {
        name: 'Puttum Kattanum',
        description: 'Traditional Puttu and Tea varieties',
        price: '200',
        distance: 1.8
      },
      {
        name: 'Cafe Catamaran',
        description: 'Beachfront cafe with global menu',
        price: '500',
        distance: 4.5
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Alappuzha Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.0918033236729223
      },
      {
        name: 'Punnamada Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.472740927283283
      },
      {
        name: 'Green Leaf Alappuzha',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.5647855423984252
      }
    ],
    transport: [
      {
        type: 'Auto',
        name: 'Prepaid Auto',
        route: 'Alappuzha RS to Punnamada Jetty',
        price: '120',
        distance: 4.5
      },
      {
        type: 'Taxi',
        name: 'Prepaid Taxi',
        route: 'Alappuzha RS to Punnamada Jetty',
        price: '280',
        distance: 4.5
      },
      {
        type: 'Bus',
        name: 'Local Bus',
        route: 'Station to Town then Bus to Jetty',
        price: '25',
        distance: 5
      }
    ],
    banks: [
      {
        name: 'Axis Bank Mullackal',
        description: 'Town Center',
        distance: 2.5
      },
      {
        name: 'SBI Beach Road',
        description: 'Near Beach',
        distance: 4
      },
      {
        name: 'State Bank of India',
        description: 'Main Branch Alappuzha',
        distance: 3
      }
    ],
    medical: [
      {
        name: 'Jose Medicals',
        description: 'Mullackal Road',
        distance: 2.6
      },
      {
        name: 'Shifa Medicals',
        description: 'General Hospital Road',
        distance: 3.2
      }
    ],
    events: [
      {
        name: 'Nehru Trophy Boat Race',
        description: 'World-famous snake boat race competition.',
        timing: 'Second Saturday of August, 2:00 PM onwards',
        venue: 'Punnamada Lake'
      },
      {
        name: 'Alappuzha Beach Fest',
        description: 'Annual cultural festival with music and food stalls.',
        timing: 'Dec 25 - Jan 1, Evening',
        venue: 'Alappuzha Beach'
      },
      {
        name: 'Temple Music Fest',
        description: 'Traditional percussion and classical music.',
        timing: 'Nov - Feb, Weekly Sat',
        venue: 'Mullackal Temple'
      }
    ],
    fuelStations: [
      {
        name: 'Hindustan Petroleum - Alleppey',
        type: 'Petrol/Diesel',
        description: 'Near Finishing Point',
        distance: 1.5
      },
      {
        name: 'EV Station - Hotel Ramada',
        type: 'EV',
        description: 'Fast charging available',
        distance: 1.8
      }
    ],
    emergency: {
      police: '0477-2230800',
      hospital: '0477-2251171',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Alappuzha Lighthouse',
        description: 'Historical lighthouse with great views',
        price: '50',
        distance: 3
      },
      {
        name: 'Marari Beach',
        description: 'Beautiful sandy beach',
        price: 'Free',
        distance: 15
      }
    ]
  },
  {
    district: 'Thrissur',
    city: 'Chalakudy',
    village: 'Athirappilly',
    description: 'Majestic waterfalls often called the Niagara of India, set amidst lush green forests.',
    hotels: [
      {
        name: 'Rainforest Resort',
        description: 'Unbeatable view of the falls',
        price: '16000',
        distance: 0.5,
        bookingLink: 'https://www.rainforest.in/'
      },
      {
        name: 'Samroha Athirappilly',
        description: 'Luxury riverside retreat',
        price: '12000',
        distance: 1.2,
        bookingLink: 'https://www.samroha.com/'
      },
      {
        name: 'Sterling Athirappilly',
        description: 'Comfortable family resort',
        price: '6500',
        distance: 3,
        bookingLink: 'https://www.sterlingholidays.com/resorts/athirappilly'
      },
      {
        name: 'Casa Rio Resort',
        description: 'Naturecentric riverside stay',
        price: '5000',
        distance: 2.5,
        bookingLink: 'https://www.casario.in/'
      },
      {
        name: 'Grand Chalakudy Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.4564732913342837
      },
      {
        name: 'Athirappilly Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.272974785366333
      },
      {
        name: 'Sunrise Athirappilly Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.037557036172661
      },
      {
        name: 'Chalakudy Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.9351202552696642
      },
      {
        name: 'Blue Lagoon Athirappilly',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.8887669432456775
      },
      {
        name: 'Green Park Chalakudy',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.987975971707987
      }
    ],
    food: [
      {
        name: 'Foliage Restaurant',
        description: 'Fine dining with waterfall view',
        price: '1000',
        distance: 0.5
      },
      {
        name: 'Vasuettante Kada',
        description: 'Famous for Angamaly Mango Curry and Pork',
        price: '300',
        distance: 12
      },
      {
        name: 'Mullapanthal Toddy Shop',
        description: 'Famous for spicy Kerala delicacies',
        price: '400',
        distance: 25
      },
      {
        name: 'Local Tea Stall',
        description: 'Quick bites and hot tea',
        price: '50',
        distance: 0.2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Chalakudy Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.4542634288489997
      },
      {
        name: 'Athirappilly Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.7290126235074306
      },
      {
        name: 'Green Leaf Chalakudy',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.5456199260661183
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'KSRTC/Private Bus',
        route: 'Chalakudy RS to Athirappilly Falls',
        price: '45',
        distance: 32
      },
      {
        type: 'Taxi',
        name: 'Local Taxi',
        route: 'Chalakudy RS to Athirappilly Falls',
        price: '1100',
        distance: 32
      },
      {
        type: 'Auto',
        name: 'Auto (to nearby spots)',
        route: 'Local travel',
        price: '200',
        distance: 5
      }
    ],
    banks: [
      {
        name: 'Federal Bank Pariyaram',
        description: 'Nearest major branch',
        distance: 8
      },
      {
        name: 'Kerala Gramin Bank',
        description: 'Vazhachal Road',
        distance: 12
      }
    ],
    medical: [
      {
        name: 'Life Medicals',
        description: 'Near Athirappilly entrance',
        distance: 0.5
      },
      {
        name: 'Govt PHC Athirappilly',
        description: 'Primary Health Center',
        distance: 2
      }
    ],
    events: [
      {
        name: 'Rainfall Festival',
        description: 'Cultural programs celebrating the monsoon season.',
        timing: 'June - Aug, Subject to dates',
        venue: 'Athirappilly View Point'
      },
      {
        name: 'Tribal Arts Showcase',
        description: 'Demonstration of local tribal music and craft.',
        timing: 'Weekends, 4:00 PM - 5:30 PM',
        venue: 'Vazhachal Forest Entry'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Chalakudy Road',
        type: 'Petrol/Diesel',
        description: 'Last pump before falls',
        distance: 5
      },
      {
        name: 'Tesla-style EV Hub',
        type: 'EV',
        description: 'Near Rainforest Resort',
        distance: 0.6
      }
    ],
    emergency: {
      police: '0480-2708331',
      hospital: '0480-2709131',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Athirappilly Waterfalls',
        description: 'Niagara of India',
        price: '50',
        distance: 0.5
      },
      {
        name: 'Vazhachal Waterfalls',
        description: 'Scenic rapids in the forest',
        price: '30',
        distance: 5
      }
    ]
  },
  {
    district: 'Wayanad',
    city: 'Kalpetta',
    village: 'Meppadi',
    description: 'A beautiful village in Wayanad, gateway to Chembra Peak and Soochipara Falls.',
    hotels: [
      {
        name: 'After the Rains',
        description: 'Eco-lodge in a spice plantation',
        price: '8000',
        distance: 12,
        bookingLink: 'https://www.aftertherains.in/'
      },
      {
        name: 'Zostel Plus Wayanad',
        description: 'Trendy stay for backpackers',
        price: '1200',
        distance: 5,
        bookingLink: 'https://www.zostel.com/zostel/wayanad/'
      },
      {
        name: 'Sky Sierra Wayanad',
        description: 'Premium hill view stay',
        price: '4500',
        distance: 3,
        bookingLink: 'https://www.skysierrawayanad.com/'
      },
      {
        name: 'Ripon Heritage',
        description: 'Historic bungalow on a tea estate',
        price: '5500',
        distance: 8,
        bookingLink: 'https://www.riponheritagemunnar.com/'
      },
      {
        name: 'Grand Kalpetta Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.2325509980947436
      },
      {
        name: 'Meppadi Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.2497720867890119
      },
      {
        name: 'Sunrise Meppadi Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.691676464789444
      },
      {
        name: 'Kalpetta Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.5829186429098603
      },
      {
        name: 'Blue Lagoon Meppadi',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.7044920967635795
      },
      {
        name: 'Green Park Kalpetta',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.401980274800995
      }
    ],
    food: [
      {
        name: 'Hash Tag Resto Cafe',
        description: 'Modern food with a great vibe',
        price: '500',
        distance: 0.5
      },
      {
        name: 'Club Sulaimani',
        description: 'Famous for tea and local snacks',
        price: '200',
        distance: 1.2
      },
      {
        name: 'Jaleel Kitchen',
        description: 'Reliable Malabar dishes',
        price: '350',
        distance: 0.8
      },
      {
        name: 'Uduppi Pure Veg',
        description: 'Authentic vegetarian food',
        price: '250',
        distance: 0.6
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kalpetta Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.4334300562675237
      },
      {
        name: 'Meppadi Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.9300409560429217
      },
      {
        name: 'Green Leaf Kalpetta',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.5471824691605218
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'KSRTC Bus',
        route: 'Kozhikode RS to Kalpetta/Meppadi',
        price: '160',
        distance: 80
      },
      {
        type: 'Taxi',
        name: 'Taxi',
        route: 'Kozhikode RS to Meppadi',
        price: '2200',
        distance: 80
      },
      {
        type: 'Auto',
        name: 'Auto (from Kalpetta)',
        route: 'Kalpetta to Meppadi',
        price: '150',
        distance: 10
      }
    ],
    banks: [
      {
        name: 'ESAF Bank Meppadi',
        description: 'Near Main Road',
        distance: 0.5
      },
      {
        name: 'Kerala Bank',
        description: 'Meppadi Branch',
        distance: 0.6
      }
    ],
    medical: [
      {
        name: 'Jina Medicals',
        description: 'Main Bazar Meppadi',
        distance: 0.5
      },
      {
        name: 'Dhaya Medicals',
        description: 'Near Hospital Road',
        distance: 0.8
      }
    ],
    events: [
      {
        name: 'Wayanad Splash',
        description: 'Monsoon tourism festival with cultural fests.',
        timing: 'July, Annual',
        venue: 'Kalpetta Grounds'
      },
      {
        name: 'Bamboo Fest',
        description: 'Exhibition of local bamboo crafts and folk music.',
        timing: 'Seasonal, 10:00 AM - 6:00 PM',
        venue: 'Meppadi Town Hall'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Meppadi Town',
        type: 'Petrol/Diesel',
        description: 'Near Bazar',
        distance: 0.5
      },
      {
        name: 'KSEB EV Station',
        type: 'EV',
        description: 'Main Road Kalpetta',
        distance: 10
      }
    ],
    emergency: {
      police: '04936-202222',
      hospital: '04936-202422',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Chembra Peak',
        description: 'Highest peak in Wayanad with a heart-shaped lake',
        price: '300',
        distance: 12
      },
      {
        name: 'Edakkal Caves',
        description: 'Ancient caves with petroglyphs',
        price: '50',
        distance: 25
      }
    ]
  },
  {
    district: 'Kottayam',
    city: 'Kottayam',
    village: 'Kumarakom',
    description: 'Kumarakom is a cluster of little islands on the Vembanad Lake, famous for backwater tourism.',
    hotels: [
      {
        name: 'The Zuri Kumarakom',
        description: 'Ultra-luxury lakefront resort',
        price: '15000',
        distance: 2,
        bookingLink: 'https://www.thezurihotels.com/hotels-resorts/kumarakom-kerala/'
      },
      {
        name: 'Kumarakom Lake Resort',
        description: 'Heritage luxury with private pools',
        price: '18000',
        distance: 1.5,
        bookingLink: 'https://www.kumarakomlakeresort.in/'
      },
      {
        name: 'Backwater Ripples',
        description: 'Premium stay with lake views',
        price: '6000',
        distance: 1,
        bookingLink: 'https://www.backwaterripples.com/'
      },
      {
        name: 'Illikkalam Lakeside Cottages',
        description: 'Budget friendly lakeside stay',
        price: '2500',
        distance: 0.5,
        bookingLink: 'https://www.kumarakomcottages.com/'
      },
      {
        name: 'Grand Kottayam Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 2.996626623292146
      },
      {
        name: 'Kumarakom Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.5028936037920457
      },
      {
        name: 'Sunrise Kumarakom Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 5.117139791136531
      },
      {
        name: 'Kottayam Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 0.7211948801319317
      },
      {
        name: 'Blue Lagoon Kumarakom',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.537132006823283
      },
      {
        name: 'Green Park Kottayam',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.131848610555732
      }
    ],
    food: [
      {
        name: 'Kilikkoodu Toddy Shop',
        description: 'Famous for pearl spot fish and spicy curry',
        price: '800',
        distance: 3
      },
      {
        name: 'The Waterside',
        description: 'Fine dining by the lake',
        price: '1200',
        distance: 1.5
      },
      {
        name: "Baker's Gourmet",
        description: 'Continental and local fusion',
        price: '700',
        distance: 2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kottayam Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.9710297438155766
      },
      {
        name: 'Kumarakom Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.117866380806885
      },
      {
        name: 'Green Leaf Kottayam',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.1343496372855193
      },
      {
        name: 'Kumarakom Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 0.26752731625042586
      }
    ],
    transport: [
      {
        type: 'Auto',
        name: 'Local Auto',
        route: 'Kottayam Railway Station to Kumarakom',
        price: '300',
        distance: 14
      },
      {
        type: 'Bus',
        name: 'KSRTC / Private Bus',
        route: 'Kottayam Bus Stand to Kumarakom',
        price: '25',
        distance: 14
      },
      {
        type: 'Taxi',
        name: 'Prepaid Taxi',
        route: 'Kottayam RS to Kumarakom',
        price: '650',
        distance: 14
      }
    ],
    banks: [
      {
        name: 'SBI Kumarakom',
        description: 'Near Bird Sanctuary Road',
        distance: 0.8
      },
      {
        name: 'Federal Bank',
        description: 'Main Road',
        distance: 1
      }
    ],
    medical: [
      {
        name: 'Kumarakom Medicals',
        description: '24/7 Pharmacy',
        distance: 0.5
      }
    ],
    events: [
      {
        name: 'Kathakali Display',
        description: 'Storytelling through classical Indian dance and music.',
        timing: 'Daily, 7:00 PM - 8:30 PM',
        venue: 'Kumarakom Cultural Center'
      },
      {
        name: 'Vembanad Houseboat Fest',
        description: 'Celebration of backwater lifestyle and local cuisine.',
        timing: 'Dec - Jan, Weekly Sun',
        venue: 'Vembanad Lake Front'
      }
    ],
    fuelStations: [
      {
        name: 'Bharat Petroleum - Kumarakom',
        type: 'Petrol/Diesel',
        description: 'Near Jetty',
        distance: 0.8
      },
      {
        name: 'EV Charging Point - Zuri Resort',
        type: 'EV',
        description: 'For guests & public',
        distance: 2.1
      }
    ],
    emergency: {
      police: '0481-2524321',
      hospital: '0481-2524222',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Kumarakom Bird Sanctuary',
        description: 'Famous bird sanctuary near backwaters',
        price: '100',
        distance: 1.5
      },
      {
        name: 'Pathiramanal Island',
        description: 'Small island on Vembanad Lake',
        price: 'Free',
        distance: 5
      }
    ]
  },
  {
    district: 'Idukki',
    city: 'Kumily',
    village: 'Thekkady',
    description: 'Gateway to Periyar National Park, known for its wildlife sanctuary and spice plantations.',
    hotels: [
      {
        name: 'Spice Village - CGH Earth',
        description: 'Eco-luxury tribal style resort',
        price: '14000',
        distance: 0.5,
        bookingLink: 'https://www.cghearth.com/spice-village'
      },
      {
        name: 'The Elephant Court',
        description: 'Premium boutique stay',
        price: '8000',
        distance: 1,
        bookingLink: 'https://www.theelephantcourt.com/'
      },
      {
        name: 'Greenwoods Resort',
        description: 'Lush greenery and tree houses',
        price: '7500',
        distance: 0.8,
        bookingLink: 'https://www.greenwoods.in/'
      },
      {
        name: 'Wildtern Hostel',
        description: 'Budget friendly for travelers',
        price: '1000',
        distance: 0.2,
        bookingLink: 'https://wildtern.com/'
      },
      {
        name: 'Grand Kumily Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 2.682284532881952
      },
      {
        name: 'Thekkady Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.734618723196385
      },
      {
        name: 'Sunrise Thekkady Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.876470817390509
      },
      {
        name: 'Kumily Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.778642280075523
      },
      {
        name: 'Blue Lagoon Thekkady',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.498493039177053
      },
      {
        name: 'Green Park Kumily',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.1285771335632835
      }
    ],
    food: [
      {
        name: "Grandma's Cafe",
        description: 'Cozy spot for fresh snacks and coffee',
        price: '400',
        distance: 0.3
      },
      {
        name: 'Sree Krishna Restaurant',
        description: 'Excellent vegetarian meals',
        price: '250',
        distance: 0.5
      },
      {
        name: 'Bamboo Cafe',
        description: 'Unique atmosphere with local treats',
        price: '500',
        distance: 0.7
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kumily Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.560824093313435
      },
      {
        name: 'Thekkady Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.5892110450337555
      },
      {
        name: 'Green Leaf Kumily',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.3739189655834352
      },
      {
        name: 'Thekkady Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 0.9745412484890288
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'KSRTC Bus',
        route: 'Kottayam RS to Thekkady (Kumily)',
        price: '180',
        distance: 108
      },
      {
        type: 'Taxi',
        name: 'Global Taxi',
        route: 'Kottayam RS to Thekkady',
        price: '3500',
        distance: 108
      },
      {
        type: 'Auto',
        name: 'Main Bazar Auto',
        route: 'Kumily Town to Periyar Gate',
        price: '50',
        distance: 1.5
      }
    ],
    banks: [
      {
        name: 'Canara Bank Kumily',
        description: 'Main Junction',
        distance: 0.2
      },
      {
        name: 'South Indian Bank',
        description: 'Thekkady Road',
        distance: 0.4
      }
    ],
    medical: [
      {
        name: 'Peermade Medicals',
        description: 'Kumily Town',
        distance: 0.5
      }
    ],
    events: [
      {
        name: 'Kalaripayattu Show',
        description: "Stunning exhibition of Kerala's ancient martial arts.",
        timing: 'Daily, 6:00 PM - 7:00 PM',
        venue: 'Kadathanadan Kalari Centre'
      },
      {
        name: 'Kathakali Art Form',
        description: 'Vibrant facial expressions and dramatic dance drama.',
        timing: 'Daily, 5:00 PM - 6:00 PM',
        venue: 'Navarasa Kathakali Centre'
      },
      {
        name: 'Spice Plantation Walk',
        description: 'Guided group educational tour through spice gardens.',
        timing: 'Daily, 10:00 AM - 4:00 PM',
        venue: 'Green Park Spices'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Kumily',
        type: 'Petrol/Diesel',
        description: 'Main Bazar',
        distance: 0.5
      },
      {
        name: 'KSEB Fast EV Charger',
        type: 'EV',
        description: 'Near Bus Stand',
        distance: 0.8
      }
    ],
    emergency: {
      police: '04869-222049',
      hospital: '04869-222213',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Periyar National Park',
        description: 'Famous wildlife sanctuary',
        price: '150',
        distance: 1
      },
      {
        name: "Abraham's Spice Garden",
        description: 'Organic spice plantation tour',
        price: '100',
        distance: 2.5
      }
    ]
  },
  {
    district: 'Kozhikode',
    city: 'Kozhikode',
    village: 'Kozhikode Beach',
    description: 'Historic beach known for its sunset views and incredible Malabar street food.',
    hotels: [
      {
        name: 'The Gateway Hotel',
        description: 'Luxury overlooking the city',
        price: '7500',
        distance: 1.5,
        bookingLink: 'https://www.tajhotels.com/en-in/gateway/calicut/'
      },
      {
        name: 'Beach Hotel',
        description: 'Historic stay directly on the beach',
        price: '5000',
        distance: 0.1,
        bookingLink: 'https://beachhotel-calicut.com/'
      },
      {
        name: 'Hyson Heritage',
        description: 'Convenient city center stay',
        price: '3500',
        distance: 2,
        bookingLink: 'http://hysonheritage.in/'
      },
      {
        name: 'Grand Kozhikode Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 4.2042024062404675
      },
      {
        name: 'Kozhikode Beach Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.7710301613612476
      },
      {
        name: 'Sunrise Kozhikode Beach Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 5.219447457901527
      },
      {
        name: 'Kozhikode Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 2.2909522295026674
      },
      {
        name: 'Blue Lagoon Kozhikode Beach',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.674864464507559
      },
      {
        name: 'Green Park Kozhikode',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.5669276876307823
      },
      {
        name: 'Kozhikode Beach Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 2.5737994882927815
      }
    ],
    food: [
      {
        name: 'Paragon Restaurant',
        description: 'World famous for Malabar Biryani',
        price: '500',
        distance: 2.5
      },
      {
        name: 'Bombay Hotel',
        description: 'Famous for Malabar snacks and tea',
        price: '200',
        distance: 2.8
      },
      {
        name: 'Zains Hotel',
        description: 'Authentic Malabar home-cooked flavors',
        price: '400',
        distance: 2.2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kozhikode Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.6545366489828153
      },
      {
        name: 'Kozhikode Beach Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 1.827768478077066
      },
      {
        name: 'Green Leaf Kozhikode',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.8032769119477647
      },
      {
        name: 'Kozhikode Beach Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 1.235300029613357
      }
    ],
    transport: [
      {
        type: 'Auto',
        name: 'Beach Road Auto',
        route: 'Kozhikode Railway Station to Beach',
        price: '40',
        distance: 2.5
      },
      {
        type: 'Taxi',
        name: 'Uber / Local Taxi',
        route: 'Station to Beach',
        price: '150',
        distance: 2.5
      },
      {
        type: 'Auto',
        name: 'Long Route Auto',
        route: 'Kozhikode Town to Beypore Beach',
        price: '250',
        distance: 11
      }
    ],
    banks: [
      {
        name: 'SBI Beach Road',
        description: 'Near Lighthouse',
        distance: 0.5
      },
      {
        name: 'PNB Calicut',
        description: 'Mananchira Square',
        distance: 2
      }
    ],
    medical: [
      {
        name: 'Calicut Medicals',
        description: '24/7 Pharmacy near Beach',
        distance: 0.4
      }
    ],
    events: [
      {
        name: 'Malabar Food Fest',
        description: 'Showcasing the legendary flavors of Malabar cuisine.',
        timing: 'Jan, Annual',
        venue: 'Kozhikode Beach Grounds'
      },
      {
        name: 'Mananchira Evening Fest',
        description: 'Local folk music and light shows near the pond.',
        timing: 'Daily, 6:00 PM - 8:30 PM',
        venue: 'Mananchira Square'
      }
    ],
    fuelStations: [
      {
        name: 'HP Petrol Pump - Beach Road',
        type: 'Petrol/Diesel',
        description: 'Near Lighthouse',
        distance: 0.8
      },
      {
        name: 'EV Point - Kozhikode Corporation',
        type: 'EV',
        description: 'Public charging',
        distance: 1.5
      }
    ],
    emergency: {
      police: '0495-2720486',
      hospital: '0495-2720390',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Mananchira Square',
        description: 'Historic park with a large pond',
        price: 'Free',
        distance: 2
      },
      {
        name: 'SM Street',
        description: 'Sweet meat street famous for halwa',
        price: 'Free',
        distance: 2.5
      }
    ]
  },
  {
    district: 'Thiruvananthapuram',
    city: 'Trivandrum',
    village: 'Kovalam Beach',
    description: 'Internationally famous beach with a lighthouse and golden sands.',
    hotels: [
      {
        name: 'The Leela Kovalam',
        description: "Kerala's only cliff-top luxury resort",
        price: '22000',
        distance: 0.1,
        bookingLink: 'https://www.theleela.com/the-leela-kovalam-raviz-hotel'
      },
      {
        name: 'Turtle on the Beach',
        description: 'Artistic luxury beach resort',
        price: '9000',
        distance: 0.5,
        bookingLink: 'https://www.turtleonthebeach.com/'
      },
      {
        name: 'Soma Palmshore',
        description: 'Ayurvedic resort at the lighthouse',
        price: '5000',
        distance: 0.2,
        bookingLink: 'https://www.somapalmshore.com/'
      },
      {
        name: 'Patrickys Beach Stay',
        description: 'Highly rated budget stay',
        price: '1800',
        distance: 0.3,
        bookingLink: 'https://www.booking.com/hotel/in/patrickis-beach-resort.html'
      },
      {
        name: 'Grand Trivandrum Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 2.6198483264087025
      },
      {
        name: 'Kovalam Beach Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 3.16857506420146
      },
      {
        name: 'Sunrise Kovalam Beach Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 5.067737469549373
      },
      {
        name: 'Trivandrum Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 0.6461082203786115
      },
      {
        name: 'Blue Lagoon Kovalam Beach',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.323295127643107
      },
      {
        name: 'Green Park Trivandrum',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.876924020488498
      }
    ],
    food: [
      {
        name: 'The Tides',
        description: 'Premium seafood fine dining',
        price: '1500',
        distance: 0.2
      },
      {
        name: 'Bait',
        description: 'Fresh catch seafood by the beach',
        price: '1200',
        distance: 0.5
      },
      {
        name: 'Swiss Cafe',
        description: 'International menu with sea views',
        price: '600',
        distance: 0.3
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Trivandrum Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.9404268573969483
      },
      {
        name: 'Kovalam Beach Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.9347908987647067
      },
      {
        name: 'Green Leaf Trivandrum',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.6947673647591754
      },
      {
        name: 'Kovalam Beach Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 1.6640109813671407
      }
    ],
    transport: [
      {
        type: 'Taxi',
        name: 'Prepaid Taxi',
        route: 'Trivandrum Central RS to Kovalam',
        price: '650',
        distance: 14
      },
      {
        type: 'Auto',
        name: 'Local Auto',
        route: 'Trivandrum Central RS to Kovalam',
        price: '350',
        distance: 14
      },
      {
        type: 'Bus',
        name: 'KSRTC Low Floor',
        route: 'Trivandrum East Fort to Kovalam',
        price: '45',
        distance: 15
      }
    ],
    banks: [
      {
        name: 'HDFC Bank Kovalam',
        description: 'Near Junction',
        distance: 1.2
      },
      {
        name: 'SBI ATM',
        description: 'Lighthouse Beach Entrance',
        distance: 0.2
      }
    ],
    medical: [
      {
        name: 'Kovalam Medical Store',
        description: 'Junction Road',
        distance: 1
      }
    ],
    events: [
      {
        name: 'Lighthouse Light Show',
        description: 'Colorful projection mapping with cultural music.',
        timing: 'Daily, 7:30 PM - 8:00 PM',
        venue: 'Kovalam Lighthouse'
      },
      {
        name: 'Kathakali & Music',
        description: 'Traditional arts by professional troupes.',
        timing: 'Wed & Sat, 6:30 PM',
        venue: 'Kovalam Arts Village'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Kovalam Junction',
        type: 'Petrol/Diesel',
        description: 'Main Gateway',
        distance: 1.5
      },
      {
        name: 'EV Hub - Leela Raviz',
        type: 'EV',
        description: 'Premium charging',
        distance: 0.5
      }
    ],
    emergency: {
      police: '0471-2480252',
      hospital: '0471-2480355',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Kovalam Lighthouse',
        description: 'Iconic red and white lighthouse',
        price: '50',
        distance: 0.5
      },
      {
        name: 'Samudra Beach',
        description: 'Quieter part of Kovalam',
        price: 'Free',
        distance: 2
      }
    ]
  },
  {
    district: 'Kannur',
    city: 'Kannur',
    village: 'Muzhappilangad Beach',
    description: "Muzhappilangad is Asia's longest drive-in beach and a key attraction of North Kerala.",
    hotels: [
      {
        name: 'Kanoos Residency',
        description: 'Premium city hotel',
        price: '4000',
        distance: 12,
        bookingLink: 'https://www.kanoosresidency.com/'
      },
      {
        name: 'Magnet Hotel',
        description: 'Modern stay near the beach',
        price: '3500',
        distance: 3,
        bookingLink: 'https://www.magnethotel.in/'
      },
      {
        name: 'Club 7 Hotel',
        description: 'Business hotel in Kannur town',
        price: '2800',
        distance: 15,
        bookingLink: 'https://www.club7hotels.com/'
      },
      {
        name: 'Grand Kannur Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 4.180905090664357
      },
      {
        name: 'Muzhappilangad Beach Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.251072515976164
      },
      {
        name: 'Sunrise Muzhappilangad Beach Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.245696689780797
      },
      {
        name: 'Kannur Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 0.9559162909798327
      },
      {
        name: 'Blue Lagoon Muzhappilangad Beach',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.865419182258416
      },
      {
        name: 'Green Park Kannur',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.6948882858457264
      },
      {
        name: 'Muzhappilangad Beach Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 1.6735714933956298
      }
    ],
    food: [
      {
        name: 'Sahibi Restaurant',
        description: 'Famous for Thalassery Biryani',
        price: '300',
        distance: 8
      },
      {
        name: "Odhen's Hotel",
        description: 'Legendary for seafood and fish curry',
        price: '400',
        distance: 16
      },
      {
        name: 'Raandhal Restaurant',
        description: 'Great Malabar fusion menu',
        price: '500',
        distance: 14
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kannur Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.477679551831733
      },
      {
        name: 'Muzhappilangad Beach Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.316161143710352
      },
      {
        name: 'Green Leaf Kannur',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.9752854832432819
      },
      {
        name: 'Muzhappilangad Beach Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 0.8223169290342547
      }
    ],
    transport: [
      {
        type: 'Auto',
        name: 'Thalassery Auto',
        route: 'Thalassery Railway Station to Muzhappilangad',
        price: '150',
        distance: 8
      },
      {
        type: 'Auto',
        name: 'Kannur Auto',
        route: 'Kannur Railway Station to Muzhappilangad',
        price: '300',
        distance: 15
      },
      {
        type: 'Taxi',
        name: 'Prepaid Taxi',
        route: 'Kannur RS to Beach',
        price: '500',
        distance: 15
      }
    ],
    banks: [
      {
        name: 'Federal Bank Muzhappilangad',
        description: 'Near Bazar',
        distance: 1
      },
      {
        name: 'SBI ATM',
        description: 'Highway Junction',
        distance: 2
      }
    ],
    medical: [
      {
        name: 'PVS Medicals',
        description: 'Edakkad Road',
        distance: 3
      }
    ],
    events: [
      {
        name: 'Theyyam Performance',
        description: 'Spectacular ritualistic dance of North Kerala.',
        timing: 'Seasonal (Nov-May), Late Night',
        venue: 'Local Kavu (Groves) / Parassinikadavu'
      },
      {
        name: 'Drive-In Beach Fest',
        description: 'Motor stunts and cultural music events on the sand.',
        timing: 'Jan, Annual',
        venue: 'Muzhappilangad Beach'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Muzhappilangad',
        type: 'Petrol/Diesel',
        description: 'Near beach entrance',
        distance: 1.2
      },
      {
        name: 'EV Charging - Magnet Hotel',
        type: 'EV',
        description: 'Fast DC charging',
        distance: 3.1
      }
    ],
    emergency: {
      police: '0497-2833233',
      hospital: '0497-2831213',
      fire: '101'
    },
    touristspots: [
      {
        name: 'St. Angelo Fort',
        description: 'Massive seaside fort built by Portuguese',
        price: '25',
        distance: 10
      },
      {
        name: 'Payyambalam Beach',
        description: 'Clean and wide sandy beach',
        price: 'Free',
        distance: 12
      }
    ]
  },
  {
    district: 'Ernakulam',
    city: 'Aluva',
    village: 'Aluva',
    description: 'A major transportation hub and pilgrimage center on the banks of the Periyar River.',
    hotels: [
      {
        name: 'Flora Airport Hotel',
        description: 'Convenient stay near Aluva and Airport',
        price: '6000',
        distance: 8,
        bookingLink: 'https://www.florahotels.com/'
      },
      {
        name: 'Hotel Periyar',
        description: 'Riverview hotel in Aluva town',
        price: '3500',
        distance: 0.5,
        bookingLink: 'http://www.hotelperiyar.com/'
      },
      {
        name: 'Saj Earth Resort',
        description: 'Luxury eco-resort near Aluva',
        price: '9500',
        distance: 10,
        bookingLink: 'https://www.sajearthresort.com/'
      },
      {
        name: 'Grand Aluva Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 4.007406898691836
      },
      {
        name: 'Aluva Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 3.1521308719158325
      },
      {
        name: 'Sunrise Aluva Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 5.25059692906552
      },
      {
        name: 'Aluva Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 2.4609982328969515
      },
      {
        name: 'Blue Lagoon Aluva',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.931055408016973
      },
      {
        name: 'Green Park Aluva',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.1179172187303035
      },
      {
        name: 'Aluva Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 3.4540468832521523
      }
    ],
    food: [
      {
        name: 'Shala Restaurant',
        description: 'Traditional Kerala meals',
        price: '200',
        distance: 0.5
      },
      {
        name: 'Kitchen Aluva',
        description: 'Modern multicuisine restaurant',
        price: '450',
        distance: 0.8
      },
      {
        name: 'Indian Coffee House',
        description: 'Iconic affordable South Indian food',
        price: '150',
        distance: 0.3
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Aluva Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.4177059610257043
      },
      {
        name: 'Aluva Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.2005983401725793
      },
      {
        name: 'Green Leaf Aluva',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.5002386323264221
      },
      {
        name: 'Aluva Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 1.6020915993620184
      }
    ],
    transport: [
      {
        type: 'Metro',
        name: 'Kochi Metro',
        route: 'Aluva to Petta',
        price: '60',
        distance: 25
      }
    ],
    banks: [
      {
        name: 'SBI Aluva',
        description: 'Near Metro Station',
        distance: 0.2
      }
    ],
    medical: [
      {
        name: 'Najath Hospital Pharmacy',
        description: '24/7 Service',
        distance: 1
      }
    ],
    events: [
      {
        name: 'Aluva Sivarathri',
        description: 'Grand celebration on the banks of Periyar River with ritual baths.',
        timing: 'Maha Sivarathri (Feb-Mar), All Night',
        venue: 'Aluva Manappuram'
      },
      {
        name: 'Sivarathri Trade Fair',
        description: 'Month-long massive exhibition and amusement park.',
        timing: 'Post Sivarathri, 4:00 PM - 10:00 PM',
        venue: 'Manappuram Grounds'
      }
    ],
    fuelStations: [
      {
        name: 'Bharat Petroleum - Aluva RS',
        type: 'Petrol/Diesel',
        description: 'Near Metro Station',
        distance: 0.4
      },
      {
        name: 'KSEB EV Hub - Aluva',
        type: 'EV',
        description: 'Major charging center',
        distance: 1.2
      }
    ],
    emergency: {
      police: '0484-2624006',
      hospital: '0484-2624241',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Aluva Manappuram',
        description: 'Famous Mahadeva Temple on the river banks',
        price: 'Free',
        distance: 1.5
      },
      {
        name: 'Marthanda Varma Bridge',
        description: 'Historic bridge over Periyar',
        price: 'Free',
        distance: 1
      }
    ]
  },
  {
    district: 'Ernakulam',
    city: 'Angamaly',
    village: 'Mookannoor',
    description: 'Birthplace of Adi Shankara nearby, known for its spiritual legacy and green landscapes.',
    hotels: [
      {
        name: 'Courtyard by Marriott',
        description: 'Luxury stay near Airport/Angamaly',
        price: '9000',
        distance: 5,
        bookingLink: 'https://www.marriott.com/'
      },
      {
        name: 'Quality Inn Himas',
        description: 'Premium business hotel in Angamaly',
        price: '4500',
        distance: 2.5,
        bookingLink: 'https://www.qualityinnhimas.com/'
      },
      {
        name: 'Hotel Elite Palace',
        description: 'Comfortable stay in Angamaly town',
        price: '3200',
        distance: 0.8,
        bookingLink: 'https://www.hotelelitepalace.com/'
      },
      {
        name: 'Grand Angamaly Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.5204712122781086
      },
      {
        name: 'Mookannoor Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.440047681542972
      },
      {
        name: 'Sunrise Mookannoor Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 5.620053567006209
      },
      {
        name: 'Angamaly Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 1.6152429511352988
      },
      {
        name: 'Blue Lagoon Mookannoor',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 5.257252140148178
      },
      {
        name: 'Green Park Angamaly',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.9725301171987324
      },
      {
        name: 'Mookannoor Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 2.904941030759603
      }
    ],
    food: [
      {
        name: 'Aroma Restaurant',
        description: 'Popular for local delicacies',
        price: '300',
        distance: 2
      },
      {
        name: 'Elite Food Court',
        description: 'Fast food and traditional meals',
        price: '250',
        distance: 0.8
      },
      {
        name: 'Thaqwa Dum Biryani',
        description: 'Famous for local style biryani',
        price: '350',
        distance: 0.5
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Angamaly Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.658175969109605
      },
      {
        name: 'Mookannoor Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.7143933653503645
      },
      {
        name: 'Green Leaf Angamaly',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.5166958167667607
      },
      {
        name: 'Mookannoor Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 1.0506615703410056
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'Local Bus',
        route: 'Angamaly to Mookannoor',
        price: '15',
        distance: 6
      }
    ],
    banks: [
      {
        name: 'Federal Bank Mookannoor',
        description: 'Corporate Office Area',
        distance: 0.5
      }
    ],
    medical: [
      {
        name: 'Apollo Adlux Hospital',
        description: 'Premium medical services',
        distance: 4
      }
    ],
    events: [
      {
        name: 'Kalady Shankara Jayanthi',
        description: 'Traditional spiritual programs celebrating Adi Shankara.',
        timing: 'April - May, Annual',
        venue: 'Sringeri Mutt, Kalady'
      },
      {
        name: 'Local Church Feast',
        description: 'Traditional Christian festivals with colorful processions.',
        timing: 'Seasonal, Evening',
        venue: 'Angamaly Forane Church'
      }
    ],
    fuelStations: [
      {
        name: 'Hindustan Petroleum - Angamaly',
        type: 'Petrol/Diesel',
        description: 'On NH Highway',
        distance: 1.5
      },
      {
        name: 'EV Station - Apollo Adlux',
        type: 'EV',
        description: 'Fast charging hub',
        distance: 4.2
      }
    ],
    emergency: {
      police: '0484-2452222',
      hospital: '0484-2451111',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Mahogany Thottam',
        description: 'Scenic mahogany plantation area',
        price: 'Free',
        distance: 8
      },
      {
        name: 'Ezhattumugham Nature Village',
        description: 'Eco-tourism village on the river',
        price: '50',
        distance: 12
      }
    ]
  },
  {
    district: 'Ernakulam',
    city: 'Kothamangalam',
    village: 'Neriamangalam',
    description: 'Known as the "Gateway to the Highranges," Neriamangalam is famous for its historic bridge and lush green hills.',
    hotels: [
      {
        name: 'Riverview Residency',
        description: 'Stay on the banks of Periyar',
        price: '2500',
        distance: 0.5,
        bookingLink: 'https://www.booking.com/'
      },
      {
        name: 'Green Berg Resort',
        description: 'Eco-friendly stay in the hills',
        price: '5000',
        distance: 8,
        bookingLink: 'https://greenbergresort.com/'
      },
      {
        name: 'Grand Kothamangalam Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 3.0080912406850766
      },
      {
        name: 'Neriamangalam Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 2.9726039535470363
      },
      {
        name: 'Sunrise Neriamangalam Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.444658551936908
      },
      {
        name: 'Kothamangalam Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 0.8677245671325025
      },
      {
        name: 'Blue Lagoon Neriamangalam',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.600109602732393
      },
      {
        name: 'Green Park Kothamangalam',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 2.1677141276339524
      },
      {
        name: 'Neriamangalam Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 2.7903095515564003
      },
      {
        name: 'The Kothamangalam Plaza',
        description: 'Centrally located with easy access to transport',
        price: '3500',
        distance: 0.7843572505061223
      }
    ],
    food: [
      {
        name: 'Hotel Neriamangalam',
        description: 'Famous for fresh river fish curry',
        price: '300',
        distance: 0.3
      },
      {
        name: 'Highlands Cafe',
        description: 'Great spot for tea and snacks on the highway',
        price: '200',
        distance: 0.2
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Kothamangalam Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.393694089110885
      },
      {
        name: 'Neriamangalam Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 1.5735122553189458
      },
      {
        name: 'Green Leaf Kothamangalam',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 0.6042824553904746
      },
      {
        name: 'Neriamangalam Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 0.6646537982223989
      },
      {
        name: 'Malabar Kitchen Kothamangalam',
        description: 'Famous for Biryani and Malabar delicacies',
        price: '450',
        distance: 1.3954658567884672
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'KSRTC / Private Bus',
        route: 'Kothamangalam to Neriamangalam',
        price: '25',
        distance: 15
      },
      {
        type: 'Taxi',
        name: 'Local Taxi',
        route: 'Neriamangalam to Munnar',
        price: '1500',
        distance: 45
      }
    ],
    banks: [
      {
        name: 'SBI Neriamangalam',
        description: 'Near Junction',
        distance: 0.2
      },
      {
        name: 'Federal Bank',
        description: 'Main Road',
        distance: 0.5
      }
    ],
    medical: [
      {
        name: 'Neriamangalam Medicals',
        description: '24/7 Pharmacy',
        distance: 0.1
      }
    ],
    events: [
      {
        name: 'Village Temple Fest',
        description: 'Traditional programs with local art forms.',
        timing: 'Seasonal, Evening',
        venue: 'Neriamangalam Temple Ground'
      }
    ],
    fuelStations: [
      {
        name: 'Indian Oil - Neriamangalam',
        type: 'Petrol/Diesel',
        description: 'On the way to Munnar',
        distance: 0.5
      },
      {
        name: 'KSEB EV Charging Point',
        type: 'EV',
        description: 'Neriamangalam Junction',
        distance: 0.2
      }
    ],
    emergency: {
      police: '0485-2554000',
      hospital: '0485-2554100',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Bhoothathankettu',
        description: 'Dam and nature park',
        price: '20',
        distance: 16
      },
      {
        name: 'Thattekkad Bird Sanctuary',
        description: 'First bird sanctuary in Kerala',
        price: '100',
        distance: 20
      }
    ]
  },
  {
    district: 'Ernakulam',
    city: 'Perumbavoor',
    village: 'Kuruppampady',
    description: 'A bustling town near Perumbavoor, famous for the ancient Iringole Kavu forest temple and wood industries.',
    hotels: [
      {
        name: 'Hotel Woodbine',
        description: 'Premium city hotel in Perumbavoor',
        price: '3500',
        distance: 4,
        bookingLink: 'http://www.hotelwoodbine.in/'
      },
      {
        name: 'Periyar Residency',
        description: 'Comfortable stay near Aluva-Munnar road',
        price: '2800',
        distance: 3,
        bookingLink: 'https://www.periyarresidency.com/'
      },
      {
        name: 'Grand Perumbavoor Residency',
        description: 'Premium luxury stay with modern amenities',
        price: '4500',
        distance: 4.021134060479
      },
      {
        name: 'Kuruppampady Heritage Inn',
        description: 'Experience traditional Kerala hospitality',
        price: '3200',
        distance: 1.687086025707551
      },
      {
        name: 'Sunrise Kuruppampady Resort',
        description: 'Beautiful views and serene environment',
        price: '5500',
        distance: 4.310827241054015
      },
      {
        name: 'Perumbavoor Comfort Stay',
        description: 'Affordable and clean rooms for travelers',
        price: '1500',
        distance: 2.057965211865909
      },
      {
        name: 'Blue Lagoon Kuruppampady',
        description: 'Waterside retreat with great food',
        price: '6000',
        distance: 4.846321971621554
      },
      {
        name: 'Green Park Perumbavoor',
        description: 'Lush green surroundings and quiet ambiance',
        price: '2800',
        distance: 3.4840498344450515
      },
      {
        name: 'Kuruppampady Boutique Hotel',
        description: 'Stylish and cozy boutique stay',
        price: '4000',
        distance: 1.6397149550527892
      },
      {
        name: 'The Perumbavoor Plaza',
        description: 'Centrally located with easy access to transport',
        price: '3500',
        distance: 0.31063458369519265
      }
    ],
    food: [
      {
        name: 'Aramana Restaurant',
        description: 'Traditional Kerala and Arabic cuisine',
        price: '450',
        distance: 1
      },
      {
        name: 'Taste of Kerala',
        description: 'Reliable South Indian meals',
        price: '200',
        distance: 0.5
      },
      {
        name: 'Village Spice Resto',
        description: 'Traditional multi-cuisine restaurant',
        price: '300',
        distance: 1.2
      },
      {
        name: 'Cafe Relax',
        description: 'Great ambiance for coffee and snacks',
        price: '200',
        distance: 0.8
      },
      {
        name: 'Kerala Kitchen',
        description: 'Authentic local flavors with fresh ingredients',
        price: '250',
        distance: 1.5
      },
      {
        name: 'Perumbavoor Spice House',
        description: 'Best local spices and authentic curries',
        price: '350',
        distance: 1.3013163573035418
      },
      {
        name: 'Kuruppampady Seafood Grill',
        description: 'Fresh catch of the day served traditional style',
        price: '600',
        distance: 2.7508768748917163
      },
      {
        name: 'Green Leaf Perumbavoor',
        description: 'Pure vegetarian delights and South Indian meals',
        price: '200',
        distance: 1.1703549290648056
      },
      {
        name: 'Kuruppampady Tiffen Center',
        description: 'Quick bites and famous Kerala snacks',
        price: '100',
        distance: 0.8380022579407087
      },
      {
        name: 'Malabar Kitchen Perumbavoor',
        description: 'Famous for Biryani and Malabar delicacies',
        price: '450',
        distance: 2.0881796244932973
      }
    ],
    transport: [
      {
        type: 'Bus',
        name: 'Local Bus',
        route: 'Perumbavoor to Kuruppampady',
        price: '15',
        distance: 5
      },
      {
        type: 'Auto',
        name: 'Town Auto',
        route: 'Kuruppampady to Iringole Kavu',
        price: '40',
        distance: 2
      }
    ],
    banks: [
      {
        name: 'Federal Bank Kuruppampady',
        description: 'Main Junction',
        distance: 0.2
      },
      {
        name: 'HDFC Bank',
        description: 'Near Bazar',
        distance: 0.4
      }
    ],
    medical: [
      {
        name: 'Kuruppampady Pharmacy',
        description: 'Oldest pharmacy in town',
        distance: 0.1
      }
    ],
    events: [
      {
        name: 'Iringole Kavu Pooram',
        description: 'Grand festival at the forest temple with deity processions.',
        timing: 'Annual (Mar-Apr), All Day',
        venue: 'Iringole Kavu'
      }
    ],
    fuelStations: [
      {
        name: 'Bharat Petroleum - Kuruppampady',
        type: 'Petrol/Diesel',
        description: 'Near Junction',
        distance: 0.3
      },
      {
        name: 'EV Station - Perumbavoor Road',
        type: 'EV',
        description: 'On main highway',
        distance: 2.5
      }
    ],
    emergency: {
      police: '0484-2524400',
      hospital: '0484-2524100',
      fire: '101'
    },
    touristspots: [
      {
        name: 'Iringole Kavu',
        description: 'Ancient temple situated in a thick forest',
        price: 'Free',
        distance: 2
      },
      {
        name: 'Kodanad Elephant Training Centre',
        description: 'Rescued elephants and mini zoo',
        price: '50',
        distance: 15
      }
    ]
  }
];;

async function seedComprehensiveData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        for (const data of comprehensiveData) {
            const query = {
                district: data.district,
                city: data.city,
                village: data.village
            };

            const existing = await Place.findOne(query);
            if (existing) {
                console.log(`Updating existing place: ${data.village} (${data.city}, ${data.district})`);
                await Place.findByIdAndUpdate(existing._id, { ...data, lastUpdated: new Date() }, { new: true });
            } else {
                console.log(`Creating new place: ${data.village} (${data.city}, ${data.district})`);
                const newPlace = new Place(data);
                await newPlace.save();
            }
        }

        console.log('✅ Comprehensive Seeding completed successfully!');
    } catch (err) {
        console.error('❌ Error Seeding:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seedComprehensiveData();
