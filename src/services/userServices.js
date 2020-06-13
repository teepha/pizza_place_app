import { BASEURL } from "../utils/helpers";

const register = async ({ password, username, name }) =>
  fetch(`${BASEURL}/api/v1/sign-up`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      username,
      name,
      role: "user",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });

const login = async ({ password, username }) =>
  fetch(`${BASEURL}/api/v1/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      username,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });

export { register, login };
