import dotenv from "dotenv";
import { BASEURL } from "../utils/helpers";
dotenv.config();

const register = async ({ password, username, name }) => {
  return fetch(`${BASEURL}/api/v1/sign-up`, {
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
};

export { register };
