import React, { useState } from "react";
import Header from "./Header";
import MessageWebSocket from "./MessageWebSocket";

function generateRandomUserId() {
  return "user_" + Math.floor(Math.random() * 1000);
}

function App() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);

  const handleLogin = () => {
    const generatedUserId = generateRandomUserId();
    setUserId(generatedUserId);
    console.log(`Logged in with user ID: ${generatedUserId}`)
    setSocket(new WebSocket(`ws://localhost:8000/ws/${generatedUserId}`));
  }

  return (
    <div className="App">
      <Header userName={userName} />
      {
        socket ? (
          <MessageWebSocket socket={socket} />
        ) : (
          <div>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Enter your username..."
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
