import { addDays, isBefore } from 'date-fns';

// Return an array of all days of an entire year, up to today. For exemple Today 11/08/2023 to 11/08/2024
export function getAllDaysOfYearFromToday(): Date[] {
    const today = new Date();
    const nextYear = addDays(today, 365);
    const daysOfYear: Date[] = [];

    for (let date = today; isBefore(date, nextYear); date = addDays(date, 1)) {
        daysOfYear.push(date);
    }

    return daysOfYear;
}

// Return an array of all possible combinations of a given group size. For exemple, if group size is 3, return all combinations of 3 days.
export function getAllSlidingDayCombinations(groupSize: number): Date[][] {
  if (groupSize < 2) {
    throw new Error('Group size must be at least 2');
  }

  const daysOfYear = getAllDaysOfYearFromToday();
  const combinations: Date[][] = [];

  for (let i = 0; i <= daysOfYear.length - groupSize; i++) {
    const group = daysOfYear.slice(i, i + groupSize);
    combinations.push(group);
  }

  return combinations;
}

// Generate a function that group all combinations by month.
export function groupAllCombinationsByMonth(groupSize: number): (combinations: Date[][]) => Record<string, Date[][]> {
  return (combinations: Date[][]) => {
    const result: Record<string, Date[][]> = {};

    for (const combination of combinations) {
      const month = combination[0].toLocaleString('en-US', { month: 'long' });
      if (!result[month]) {
        result[month] = [];
      }
      result[month].push(combination);
    }

    return result;
  };
}