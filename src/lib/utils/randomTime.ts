export const randomTime = (min: number, max: number) => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};
