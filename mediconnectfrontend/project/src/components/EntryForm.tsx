import React from 'react';
import { PeriodEntry } from '../types';

interface EntryFormProps {
  date: string;
  entry: PeriodEntry | null;
  onSave: (entry: PeriodEntry) => void;
}

const symptoms = [
  'Cramps',
  'Headache',
  'Bloating',
  'Fatigue',
  'Breast Tenderness',
  'Acne',
  'Back Pain',
  'Mood Swings',
];

export const EntryForm: React.FC<EntryFormProps> = ({ date, entry, onSave }) => {
  const [mood, setMood] = React.useState<PeriodEntry['mood']>(entry?.mood || 'neutral');
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>(entry?.symptoms || []);
  const [flow, setFlow] = React.useState<PeriodEntry['flow']>(entry?.flow || 'medium');
  const [notes, setNotes] = React.useState(entry?.notes || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data
    const entryData: PeriodEntry = {
      date,
      mood,
      symptoms: selectedSymptoms,
      flow,
      notes,
    };

    // Call the onSave function passed as prop (optional)
    onSave(entryData);

    // Send data to the backend API
    try {
      const response = await fetch('http://localhost:5000/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        alert('Entry saved successfully!');
      } else {
        alert('Error saving entry');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  // Toggle symptoms selection
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Mood</label>
        <div className="mt-2 flex gap-4">
          {(['happy', 'sad', 'neutral', 'irritated', 'anxious'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`p-2 rounded ${mood === m ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Flow */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Flow</label>
        <div className="mt-2 flex gap-4">
          {(['light', 'medium', 'heavy'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFlow(f)}
              className={`p-2 rounded ${flow === f ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Symptoms</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {symptoms.map((symptom) => (
            <button
              key={symptom}
              type="button"
              onClick={() => toggleSymptom(symptom)}
              className={`p-2 rounded text-left ${selectedSymptoms.includes(symptom) ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={3}
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Save Entry
      </button>
    </form>
  );
};
