export interface PeriodEntry {
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'irritated' | 'anxious';
  symptoms: string[];
  flow: 'light' | 'medium' | 'heavy';
  notes?: string;
}

export interface PeriodState {
  entries: Record<string, PeriodEntry>;
  lastPeriod: string | null;
  cycleLength: number;
}