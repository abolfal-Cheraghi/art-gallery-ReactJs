export function dateDifference(otherDate) {
  const currentDate = new Date();

  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();
  const currentDay = currentDate.getUTCDate();

  const otherYear = otherDate.getUTCFullYear();
  const otherMonth = otherDate.getUTCMonth();
  const otherDay = otherDate.getUTCDate();

  let diffInYears = currentYear - otherYear;
  let diffInMonths = currentMonth - otherMonth;
  let diffInDays = currentDay - otherDay;

  if (diffInDays < 0) {
    diffInDays += 30; // فرض می کنیم هر ماه ۳۰ روز دارد
    diffInMonths--;
  }

  if (diffInMonths < 0) {
    diffInMonths += 12;
    diffInYears--;
  }

  return `${diffInYears !== 0 ? diffInYears + "سال،" : ""}${
    diffInMonths !== 0 ? diffInMonths + " ماه،" : ""
  } ${diffInDays} روز `;
}
