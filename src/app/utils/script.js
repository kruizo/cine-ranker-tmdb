const normalizeRating = (rating) => {
  const scaledToFive = (rating / 10) * 5;
  const normalized = parseFloat(scaledToFive.toFixed(1));

  return normalized;
};
const extractYearFromDate = (date) => {
  const year = date.split("-")[0];
  return year;
};

export { normalizeRating, extractYearFromDate };
