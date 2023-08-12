const socket = io();

const chatMessages = document.getElementById("chat-messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const message = messageInput.value;

  if (username && message) {
    const fullMessage = `${username}: ${message}`;
    socket.emit("message", fullMessage);
    messageInput.value = "";
  }
});

socket.on("message", (data) => {
  const messageElement = document.createElement("div");

  const name = data.substring(0, data.indexOf(":"));
  const content = data.substring(data.indexOf(":") + 1);

  const nameElement = document.createElement("span");
  nameElement.textContent = name;
  nameElement.classList.add("message-name");

  const contentElement = document.createElement("span");
  contentElement.textContent = content;

  messageElement.appendChild(nameElement);
  messageElement.appendChild(contentElement);

  if (data.startsWith(usernameInput.value)) {
    messageElement.classList.add("chat-message", "user-message");
  } else {
    messageElement.classList.add("chat-message", "other-message");
  }

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
