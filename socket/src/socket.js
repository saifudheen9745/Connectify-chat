const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["*", "http://localhost:5001"],
  },
});

httpServer.listen(3000, () => {
  console.log("Socket.IO server started and listening on port 3000");
});

let activeUsers = [];

io.on("connection", (socket) => {
  try {
    // add new user
    socket.on("new-user-added", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
      }
      console.log("new user added", newUserId);
    });

    socket.on("send-message", (data) => {
      const { receiverId, message } = data;
      console.log(message);
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        const sid = user.socketId;
        io.to(sid).emit("receive-message", message);
      }
    });

    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("after disconnect", activeUsers);
    });
  } catch (error) {
    console.error("An error occurred in the Socket.IO connection:", error);
  }
});
