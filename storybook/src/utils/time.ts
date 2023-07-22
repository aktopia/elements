export const randomTimestamp = () => {
  const maxDate = Date.now();
  return Math.floor(Math.random() * maxDate);
};
