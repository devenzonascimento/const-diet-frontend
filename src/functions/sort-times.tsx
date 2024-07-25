export const sortTimes = (a: { time: string }, b: { time: string }) => {
  const [aHours, aMinutes] = a.time.split(':').map(Number);
  const [bHours, bMinutes] = b.time.split(':').map(Number);

  if (aHours === bHours) {
    return aMinutes - bMinutes;
  }

  return aHours - bHours;
}
