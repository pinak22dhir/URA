import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.get('/',(req,res) => {
  res.send('API WORKING GREAT')
})
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection with error handling
mongoose.connect('mongodb://localhost:27017/period_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  });

// Define Mongoose schema and model
const periodEntrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: String, required: true },
  symptoms: { type: [String], required: true },
  flow: { type: String, required: true },
  notes: { type: String },
});

const PeriodEntry = mongoose.model('PeriodEntry', periodEntrySchema);

// API endpoint to handle form submissions (POST)
app.post('/api/entries', async (req, res) => {
  try {
    const newEntry = new PeriodEntry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry); // Send back the saved entry
  } catch (error) {
    console.error('Error saving entry:', error);
    res.status(500).json({ error: 'Error saving entry' });
  }
});

// API endpoint to fetch all entries (GET)
app.get('/api/entries', async (req, res) => {
  try {
    const entries = await PeriodEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Error fetching entries' });
  }
});

// Start the server
const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
