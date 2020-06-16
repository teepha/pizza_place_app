export const BASEURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:9000"
    : "https://pizzaplace-api.herokuapp.com";

export const getLocalStorageItem = (name) => localStorage.getItem(name);
export const setLocalStorageItem = (name, value) =>
  localStorage.setItem(name, value);
export const removeToken = () => localStorage.removeItem("customerToken");
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const dollarsToEuros = (amount) => `€${parseInt(amount) * 0.88}`;
