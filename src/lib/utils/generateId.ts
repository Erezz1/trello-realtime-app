export const generateId = (id: string, email: string) => {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 10000);
  const result = `${timestamp}-${email}-${id}-${random}`;

  return result;
};
