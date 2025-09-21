import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: [1, 'Must have at least 1 bedroom']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: [1, 'Must have at least 1 bathroom']
  },
  roommates: {
    current: {
      type: Number,
      default: 0,
      min: [0, 'Current roommates cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Maximum roommates is required'],
      min: [1, 'Must allow at least 1 roommate']
    }
  },
  images: [{
    type: String, // URLs to images
    required: true
  }],
  amenities: [{
    type: String,
    enum: ['wifi', 'parking', 'furnished', 'gym', 'balcony', 'kitchen', 'mess', 'laundry', 'security', 'pool']
  }],
  roomType: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Private Room', 'Shared Room', 'Studio', 'Entire Place']
  },
  availableFrom: {
    type: Date,
    required: [true, 'Available from date is required']
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search functionality
listingSchema.index({ title: 'text', description: 'text', location: 'text' });
listingSchema.index({ location: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ availableFrom: 1 });
listingSchema.index({ isActive: 1 });

export default mongoose.model('Listing', listingSchema);