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
  fetch(`${BASEURL}/api/v1/menu/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res.menu.menu;
    })
    .catch((error) => {
      return error;
    });

const cartMenuItems = async (menuIds) =>
  fetch(`${BASEURL}/api/v1/menu/acrt`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      menuIds,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.menu.menu;
    })
    .catch((error) => {
      return error;
    });

export { getAllMenu, getAMenu, cartMenuItems };
