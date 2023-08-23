export const getFormattedDate = (date: string): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  const hour = newDate.getHours().toString().padStart(2, "0");
  const minute = newDate.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const printState = (createdAt: string, modifiedAt: string): string => {
  return createdAt === modifiedAt ? "asked" : "modified";
};

export const printDate = (createdAt: string, modifiedAt: string): string => {
  const date = new Date(createdAt === modifiedAt ? createdAt : modifiedAt).toString();
  return getFormattedDate(date);
};
