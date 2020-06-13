export const BASEURL = "http://localhost:9000";
export const getLocalStorageItem = (name) => localStorage.getItem(name);
export const setLocalStorageItem = (name, value) => localStorage.setItem(name, value);
export const removeToken = () => localStorage.removeItem("customerToken");
