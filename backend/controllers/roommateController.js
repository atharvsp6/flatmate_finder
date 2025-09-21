import RoommateRequest from '../models/RoommateRequest.js';

// @desc    Get all roommate requests
// @route   GET /api/roommates
// @access  Public
export const getRoommateRequests = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      location, 
      minBudget, 
      maxBudget, 
      roomType,
      moveInDate,
      search 
    } = req.query;

    const query = { isActive: true };
    
    // Add filters
    if (location) {
      query.$or = [
        { location: { $regex: location, $options: 'i' } },
        { preferredAreas: { $elemMatch: { $regex: location, $options: 'i' } } }
      ];
    }
    
    if (minBudget || maxBudget) {
      if (minBudget) query['budget.min'] = { $gte: Number(minBudget) };
      if (maxBudget) query['budget.max'] = { $lte: Number(maxBudget) };
    }
    
    if (roomType) {
      query.roomType = roomType;
    }
    
    if (moveInDate) {
      query.moveInDate = { $gte: new Date(moveInDate) };
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const requests = await RoommateRequest.find(query)
      .populate('user', 'name email phone avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await RoommateRequest.countDocuments(query);

    res.json({
      success: true,
      data: requests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get roommate requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching roommate requests',
      error: error.message
    });
  }
};

// @desc    Get single roommate request
// @route   GET /api/roommates/:id
// @access  Public
export const getRoommateRequest = async (req, res) => {
  try {
    const request = await RoommateRequest.findById(req.params.id)
      .populate('user', 'name email phone avatar bio');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Roommate request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Get roommate request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching roommate request',
      error: error.message
    });
  }
};

// @desc    Create new roommate request
// @route   POST /api/roommates
// @access  Private
export const createRoommateRequest = async (req, res) => {
  try {
    const {
      title,
      bio,
      location,
      preferredAreas,
      budget,
      roomType,
      moveInDate,
      lifestyle,
      interests,
      idealRoommate,
      dealBreakers,
      contactPreference,
      profileImage
    } = req.body;

    // Check if user already has an active request
    const existingRequest = await RoommateRequest.findOne({
      user: req.user._id,
      isActive: true
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active roommate request. Please update or deactivate it first.'
      });
    }

    const request = await RoommateRequest.create({
      user: req.user._id,
      title,
      bio,
      location,
      preferredAreas,
      budget,
      roomType,
      moveInDate,
      lifestyle,
      interests,
      idealRoommate,
      dealBreakers,
      contactPreference,
      profileImage
    });

    await request.populate('user', 'name email phone avatar');

    res.status(201).json({
      success: true,
      message: 'Roommate request created successfully',
      data: request
    });
  } catch (error) {
    console.error('Create roommate request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating roommate request',
      error: error.message
    });
  }
};

// @desc    Update roommate request
// @route   PUT /api/roommates/:id
// @access  Private
export const updateRoommateRequest = async (req, res) => {
  try {
    const request = await RoommateRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Roommate request not found'
      });
    }

    // Check if user owns the request or is admin
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this roommate request'
      });
    }

    const updatedRequest = await RoommateRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone avatar');

    res.json({
      success: true,
      message: 'Roommate request updated successfully',
      data: updatedRequest
    });
  } catch (error) {
    console.error('Update roommate request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating roommate request',
      error: error.message
    });
  }
};

// @desc    Delete roommate request
// @route   DELETE /api/roommates/:id
// @access  Private
export const deleteRoommateRequest = async (req, res) => {
  try {
    const request = await RoommateRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Roommate request not found'
      });
    }

    // Check if user owns the request or is admin
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this roommate request'
      });
    }

    await request.deleteOne();

    res.json({
      success: true,
      message: 'Roommate request deleted successfully'
    });
  } catch (error) {
    console.error('Delete roommate request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting roommate request',
      error: error.message
    });
  }
};

// @desc    Get user's own roommate requests
// @route   GET /api/roommates/my-requests
// @access  Private
export const getMyRoommateRequests = async (req, res) => {
  try {
    const requests = await RoommateRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Get my roommate requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your roommate requests',
      error: error.message
    });
  }
};