import React, { useEffect } from "react";
import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";

function WebSocketMessaging({ socket }) {
    // useEffect(() => {
    //     return () => {
    //         if (socket.readyState === 1) {
    //             socket.close();
    //         }
    //     };
    // }, [socket]);

    return (
        <div>
            <MessageDisplay socket={socket} />
            <MessageInput socket={socket} />
        </div>
    );
}

export default WebSocketMessaging;
