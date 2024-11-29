export const calculateNextPeriod = (lastPeriod: string, cycleLength: number): string => {
  const date = new Date(lastPeriod);
  date.setDate(date.getDate() + cycleLength);
  return date.toISOString().split('T')[0];
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};