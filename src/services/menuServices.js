import { BASEURL } from "../utils/helpers";

const getAllMenu = async () =>
  fetch(`${BASEURL}/api/v1/menu`)
    .then((res) => res.json())
    .then((res) => {
      return res.menus.menus;
    })
    .catch((error) => {
      return error;
    });

const getAMenu = async (id) =>
  fetch(`http://localhost:9000/api/v1/menu/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res.menu.menu;
    })
    .catch((error) => {
      return error;
    });

export { getAllMenu, getAMenu };
