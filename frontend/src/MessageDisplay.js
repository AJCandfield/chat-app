import React, { useState, useEffect } from "react";

function MessageDisplay({ socket }) {
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.onmessage = (event) => {
            const receivedMessage = event.data;
            setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
    }, [socket]);

    return (
        <div>
            <h2>Received Messages:</h2>
            <ul>
                {receivedMessages.map((message, index) => (
                    <li key={index}>
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessageDisplay;