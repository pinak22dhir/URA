import React from 'react';
import { Calendar } from './components/Calendar';
import { EntryForm } from './components/EntryForm';
import { PeriodEntry, PeriodState } from './types';
import { calculateNextPeriod, formatDate } from './utils/periodUtils';

const STORAGE_KEY = 'period_tracker_data';

const initialState: PeriodState = {
  entries: {},
  lastPeriod: null,
  cycleLength: 28,
};

function App() {
  const [state, setState] = React.useState<PeriodState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split('T')[0]
  );

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleSaveEntry = (entry: PeriodEntry) => {
    setState((prev) => {
      const newState = {
        ...prev,
        entries: {
          ...prev.entries,
          [entry.date]: entry,
        },
        lastPeriod: entry.date,
      };
      return newState;
    });
  };

  const nextPeriod = state.lastPeriod
    ? calculateNextPeriod(state.lastPeriod, state.cycleLength)
    : null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Period Tracker</h1>
          {nextPeriod && (
            <p className="mt-2 text-gray-600">
              Next period expected on {formatDate(nextPeriod)}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Calendar
              entries={state.entries}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {formatDate(selectedDate)}
            </h2>
            <EntryForm
              date={selectedDate}
              entry={state.entries[selectedDate] || null}
              onSave={handleSaveEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;