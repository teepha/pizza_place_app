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

export { getAllMenu };
