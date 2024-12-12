import Listing from '../models/Listing.js';
import { createError } from '../utils/error.js';

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find()
      .populate('seller', 'name email rating reviewCount')
      .sort('-createdAt');
    res.json(listings);
  } catch (error) {
    next(error);
  }
};

export const getAuctionListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ 'auction': { $exists: true } })
      .populate('seller', 'name email rating reviewCount')
      .sort('-createdAt');
    res.json(listings);
  } catch (error) {
    next(error);
  }
};

export const placeBid = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return next(createError(404, 'Listing not found'));
    }

    if (!listing.auction) {
      return next(createError(400, 'This listing is not an auction'));
    }

    if (new Date(listing.auction.endTime) < new Date()) {
      return next(createError(400, 'This auction has ended'));
    }

    if (amount <= listing.auction.currentBid) {
      return next(createError(400, 'Bid must be higher than current bid'));
    }

    listing.auction.currentBid = amount;
    listing.auction.bidHistory.push({
      userId: req.user.userId,
      amount,
    });

    await listing.save();
    res.json(listing);
  } catch (error) {
    next(error);
  }
};

// ... (keep existing controller methods)