import { io } from "socket.io-client";
import { SOCKET_URL } from "../util/Constants";

export const socket = io(SOCKET_URL, {
  extraHeaders: {
    Authorization: localStorage.getItem("token")!!,
  },
});
