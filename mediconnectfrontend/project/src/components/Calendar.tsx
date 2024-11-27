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
      days.push(<div key={`empty-${i}`} className="h-14" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEntry = entries[date];
      
      days.push(
        <button
          key={date}
          onClick={() => onSelectDate(date)}
          className={`h-14 relative ${
            date === selectedDate
              ? 'bg-purple-100 border-2 border-purple-500'
              : hasEntry
              ? 'bg-purple-50'
              : 'hover:bg-gray-50'
          } ${
            date === today.toISOString().split('T')[0]
              ? 'font-bold'
              : ''
          }`}
        >
          <span className="absolute top-1 left-1">{day}</span>
          {hasEntry && (
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-purple-500" />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="p-2 hover:bg-gray-100 rounded"
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
            className="p-2 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-gray-500 text-sm py-2">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};