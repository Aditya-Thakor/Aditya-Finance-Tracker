export const getLocalData = () => {
  return JSON.parse(localStorage.getItem("value") || "[]");
};
