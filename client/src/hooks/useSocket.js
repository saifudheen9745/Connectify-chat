import { io } from "socket.io-client";
import { useRef } from "react";

function useSocket() {
  const socket = useRef();

  const connectToSocketServer = (userId) => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("new-user-added", userId);
    socket.current.on("get-users", (data) => {
      console.log("from sockt", data);
      console.log(socket);
    });
  };

  const sendMessageToSocket = (msgObj) => {
    console.log(socket);
    socket.current.emit("send-message", msgObj);
  };

  return { socket, connectToSocketServer, sendMessageToSocket };
}

export default useSocket;
