import type { GithubStats } from "./github-types";

export function getCurrentStreak(
  contributions: GithubStats["contributions"],
  now: Date,
) {
  const activeDates = new Set(
    contributions.filter(({ count }) => count > 0).map(({ date }) => date),
  );
  const day = new Date(now);

  // Today can still receive contributions, so start at yesterday if it is empty.
  if (!activeDates.has(day.toISOString().slice(0, 10))) {
    day.setUTCDate(day.getUTCDate() - 1);
  }

  let streak = 0;
  while (activeDates.has(day.toISOString().slice(0, 10))) {
    streak += 1;
    day.setUTCDate(day.getUTCDate() - 1);
  }
  return streak;
}
