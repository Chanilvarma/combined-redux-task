const day = new Date();
// Today
export const today =
  day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();

// Yesterday
export let yesterday =
  day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + (day.getDate() - 1);

// maxdate
export const maxDate = today;

// Calculating Previous Months FIRST AND LAST Dates
// First date
day.setDate(1);
day.setMonth(day.getMonth() - 1);
export const firstDate =
  day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + 0 + day.getDate();

// Last Date
day.setDate(0);
day.setMonth(day.getMonth() + 1);
export const lastDate =
  day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + (day.getDate() + 1);
