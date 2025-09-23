import Review from '../models/Review.js';
import Listing from '../models/Listing.js';
import mongoose from 'mongoose';

// Helper to recalculate listing rating
const recalcListingRating = async (listingId) => {
  const stats = await Review.aggregate([
    { $match: { listing: new mongoose.Types.ObjectId(listingId) } },
    { $group: { _id: '$listing', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  const listing = await Listing.findById(listingId);
  if (listing) {
    if (stats.length > 0) {
      listing.rating.average = Number(stats[0].avg.toFixed(2));
      listing.rating.count = stats[0].count;
    } else {
      listing.rating.average = 0;
      listing.rating.count = 0;
    }
    await listing.save();
  }
};

// GET /api/listings/:id/reviews
export const getReviewsForListing = async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.id })
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

// POST /api/listings/:id/reviews
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const listingId = req.params.id;

    // Prevent reviewing own listing
    // Fetch listing to compare landlord
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    if (listing.landlord.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot review your own listing' });
    }

    const review = await Review.create({
      listing: listingId,
      user: req.user._id,
      rating,
      comment
    });

    await recalcListingRating(listingId);
    await review.populate('user', 'name email avatar');
    res.status(201).json({ success: true, message: 'Review added', data: review });
  } catch (error) {
    // Handle duplicate review (unique index user+listing)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this listing' });
    }
    console.error('Create review error:', error);
    res.status(500).json({ success: false, message: 'Error adding review', error: error.message });
  }
};

// PUT /api/listings/:listingId/reviews/:reviewId
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: listingId, reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this review' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    await recalcListingRating(listingId);
    await review.populate('user', 'name email avatar');
    res.json({ success: true, message: 'Review updated', data: review });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ success: false, message: 'Error updating review', error: error.message });
  }
};

// DELETE /api/listings/:listingId/reviews/:reviewId
export const deleteReview = async (req, res) => {
  try {
    const { id: listingId, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }
    await review.deleteOne();
    await recalcListingRating(listingId);
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Error deleting review', error: error.message });
  }
};
