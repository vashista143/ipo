import mongoose from 'mongoose';

const ipoSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
  },
  priceBand: {
    type: String,
    required: true,
  },
  openDate: {
    type: Date,
    required: true,
  },
  closeDate: {
    type: Date,
    required: true,
  },
  issueSize: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    enum: ['Book Built', 'Fixed Price'],
    required: true,
  },
  listingDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Closed', 'New Listed'],
    required: true,
  },
  ipoPrice: {
    type: String,
  },
  listingPrice: {
    type: String,
  },
  listingGain: {
    type: String,
  },
  listingDateListed: {
    type: Date,
  },
  cmp: {
    type: String,
  },
  currentReturn: {
    type: String,
  },
  rhp: {
    type: String, // It's a URL
  },
  drhp: {
    type: String, // It's a URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const IPO = mongoose.model('IPO', ipoSchema, 'ipo');
export default IPO;
