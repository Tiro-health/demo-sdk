import type { Patient } from '@/types/common';

// Shared name pools
export const FIRST_NAMES_M = [
  'James', 'Robert', 'John', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald',
];

export const FIRST_NAMES_F = [
  'Mary', 'Jennifer', 'Linda', 'Patricia', 'Elizabeth', 'Barbara', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra',
];

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
];

// Helper functions
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatNumber(num: number, length: number): string {
  return num.toString().padStart(length, '0');
}

export function generateDateInRange(daysBack: number): string {
  const today = new Date();
  const randomDaysBack = Math.floor(Math.random() * daysBack);
  const date = new Date(today);
  date.setDate(date.getDate() - randomDaysBack);

  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1, 2);
  const day = formatNumber(date.getDate(), 2);

  return `${year}-${month}-${day}`;
}

export function generateTime(): string {
  const hour = randomInt(8, 19);
  const minute = randomInt(0, 59);
  return `${formatNumber(hour, 2)}:${formatNumber(minute, 2)}`;
}

export function generateDOB(): string {
  const year = randomInt(1940, 2010);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return `${year}-${formatNumber(month, 2)}-${formatNumber(day, 2)}`;
}

export function generatePatient(): Patient {
  const gender: 'M' | 'F' = Math.random() < 0.5 ? 'M' : 'F';
  const firstNames = gender === 'M' ? FIRST_NAMES_M : FIRST_NAMES_F;

  return {
    firstName: randomChoice(firstNames),
    lastName: randomChoice(LAST_NAMES),
    gender,
    dateOfBirth: generateDOB(),
  };
}
