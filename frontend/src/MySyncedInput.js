import React, { useState } from "react";

function MySyncedInput() {
    const [message, setMessage] = useState("");

    const updateMessage = (event) => {
        setMessage(event.target.value);
    };

    const deleteMessage = () => {
        setMessage("");
    };

    return (
        <div>
            <input
                placeholder="Type your message here..."
                value={message}
                onChange={updateMessage}
                onFocus={deleteMessage}
            />
            <p>{message}</p>
        </div>
    );
}

export default MySyncedInput;