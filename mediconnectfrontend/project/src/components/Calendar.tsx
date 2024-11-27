import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { PeriodEntry } from '../types';

interface CalendarProps {
  entries: Record<string, PeriodEntry>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  entries,
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 bg-gray-50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEntry = entries[date];
      const isToday = date === today.toISOString().split('T')[0];

      days.push(
        <button
          key={date}
          onClick={() => onSelectDate(date)}
          className={`h-14 relative flex items-center justify-center rounded-md transition-all duration-200 
            ${
              date === selectedDate
                ? 'bg-purple-200 border-2 border-purple-500 text-purple-900 font-semibold'
                : hasEntry
                ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                : 'bg-white hover:bg-gray-100'
            }
            ${isToday ? 'border-2 border-green-500 font-bold' : ''}
          `}
          aria-label={`Select ${date}`}
        >
          <span>{day}</span>
          {hasEntry && (
            <div
              className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-purple-500"
              aria-label="Event indicator"
            />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-purple-500" />
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 uppercase"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};
