import React, { useState } from "react";

function MessageInput({ socket }) {
    const [message, setMessage] = useState("");
    const [recipientId, setRecipientId] = useState("");

    const handleMessageSend = () => {
        console.log("Sending message |", message, "| to user with ID", recipientId);

        const messageData = {
            message: message,
            recipient_id: recipientId
        };
        console.log(messageData)
        socket.send(JSON.stringify(messageData))
        // Clear input after sending message
        setMessage("");
        setRecipientId("");
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type the recipient's ID..."
                value={recipientId}
                onChange={(event) => setRecipientId(event.target.value)}
            />
            <input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
        </div>
    );
}

export default MessageInput;