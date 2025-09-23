import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5']
  },
  comment: {
    type: String,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
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

reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

reviewSchema.index({ listing: 1, createdAt: -1 });
reviewSchema.index({ user: 1, listing: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
