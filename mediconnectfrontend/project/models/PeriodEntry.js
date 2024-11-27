import mongoose from 'mongoose';

// Define the schema
const periodEntrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: String, required: true },
  symptoms: { type: [String], required: true },
  flow: { type: String, required: true },
  notes: { type: String },
});

// Create and export the model
const PeriodEntry = mongoose.model('PeriodEntry', periodEntrySchema);
export default PeriodEntry;
