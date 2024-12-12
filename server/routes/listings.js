import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
  getAllListings,
  getAuctionListings,
  createListing,
  updateListing,
  deleteListing,
  getUserListings,
  placeBid,
} from '../controllers/listingController.js';

const router = express.Router();

// Public routes
router.get('/all', getAllListings);
router.get('/auctions', getAuctionListings);

// Protected routes
router.use(verifyToken);
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);
router.get('/user', getUserListings);
router.post('/:id/bid', placeBid);

export default router;