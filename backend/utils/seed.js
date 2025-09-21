import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import RoommateRequest from '../models/RoommateRequest.js';

dotenv.config();

// Sample data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+44 7123 456789',
    bio: 'Software developer looking for a quiet flatmate',
    preferences: {
      budget: { min: 500, max: 1200 },
      location: 'London',
      roomType: 'private'
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+44 7987 654321',
    bio: 'Marketing professional, love cooking and yoga',
    preferences: {
      budget: { min: 700, max: 1500 },
      location: 'Mumbai',
      roomType: 'private'
    }
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '+44 7000 000000',
    role: 'admin',
    bio: 'Platform administrator'
  }
];

const listings = [
  {
    title: 'Modern 2-Bed Apartment in Bandra West',
    description: 'Beautiful modern apartment with sea view and all amenities. Perfect for young professionals.',
    location: 'Bandra West, Mumbai',
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    roommates: { current: 1, max: 2 },
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwaW5kaWF8ZW58MXx8fHwxNzkzNTY3Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    amenities: ['wifi', 'parking', 'furnished', 'gym'],
    roomType: 'Private Room',
    availableFrom: new Date('2024-10-01')
  },
  {
    title: 'Cozy Room in Andheri East',
    description: 'Friendly flatshare with young professionals in a bustling part of Andheri, close to cafes and nightlife.',
    location: 'Andheri East, Mumbai',
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    roommates: { current: 2, max: 3 },
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwaW5kaWF8ZW58MXx8fHwxNzkzNTY3Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    amenities: ['wifi', 'furnished', 'kitchen'],
    roomType: 'Private Room',
    availableFrom: new Date('2024-10-01')
  },
  {
    title: 'Modern Flat with Sea View',
    description: 'Luxury high-rise apartment with amazing sea view in Navi Mumbai.',
    location: 'Seawoods, Navi Mumbai',
    price: 55000,
    bedrooms: 2,
    bathrooms: 2,
    roommates: { current: 1, max: 2 },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiYWxjb255JTIwbXVtYmFpfGVufDF8fHx8MTc5MzU2NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080'],
    amenities: ['wifi', 'parking', 'furnished', 'gym', 'balcony'],
    roomType: 'Private Room',
    availableFrom: new Date('2024-09-10')
  }
];

const roommateRequests = [
  {
    title: 'Looking for a flatmate in South Mumbai',
    bio: 'Hi! I\'m a 25-year-old software engineer working in Bandra. I\'m clean, respectful, and looking for someone similar to share a nice apartment with.',
    location: 'South Mumbai',
    preferredAreas: ['Bandra', 'Khar', 'Santa Cruz'],
    budget: { min: 40000, max: 60000 },
    roomType: 'Private Room',
    moveInDate: new Date('2024-10-15'),
    lifestyle: {
      cleanliness: 4,
      socialLevel: 3,
      smoking: false,
      pets: false,
      workSchedule: '9-5',
      sleepSchedule: 'early-bird'
    },
    interests: ['reading', 'cooking', 'movies', 'fitness'],
    idealRoommate: 'Someone who is clean, respectful, and has similar interests',
    dealBreakers: 'Smoking, loud parties, pets',
    contactPreference: 'both'
  }
];

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flatmate_finder';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    await RoommateRequest.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create listings (assign to first user as landlord)
    console.log('🏠 Creating listings...');
    const listingsWithLandlord = listings.map(listing => ({
      ...listing,
      landlord: createdUsers[1]._id // Jane Smith as landlord
    }));
    const createdListings = await Listing.create(listingsWithLandlord);
    console.log(`✅ Created ${createdListings.length} listings`);

    // Create roommate requests (assign to first user)
    console.log('🤝 Creating roommate requests...');
    const requestsWithUser = roommateRequests.map(request => ({
      ...request,
      user: createdUsers[0]._id // John Doe
    }));
    const createdRequests = await RoommateRequest.create(requestsWithUser);
    console.log(`✅ Created ${createdRequests.length} roommate requests`);

    // Create sample bookings
    console.log('📅 Creating sample bookings...');
    const sampleBookings = [
      {
        user: createdUsers[0]._id,
        listing: createdListings[0]._id,
        viewingDate: new Date('2024-09-25'),
        viewingTime: '14:00',
        moveInDate: new Date('2024-10-01'),
        message: 'I am very interested in this property. Would love to schedule a viewing.',
        phoneNumber: createdUsers[0].phone,
        status: 'pending'
      }
    ];
    const createdBookings = await Booking.create(sampleBookings);
    console.log(`✅ Created ${createdBookings.length} bookings`);

    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('Sample login credentials:');
    console.log('👤 User: john@example.com / password123');
    console.log('👤 User: jane@example.com / password123');
    console.log('👑 Admin: admin@example.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();