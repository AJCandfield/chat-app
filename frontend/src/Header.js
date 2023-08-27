import React from "react";

function Header(props) {
    return (
        <header>
            <h1>Welcome to ChatApp {props.userName}!</h1>
        </header>
    );
}

export default Header;
