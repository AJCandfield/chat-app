import React, { useState } from "react";
import useValidatedInput from "./hooks/useValidatedInput";

function MyDynamicList() {

    const [itemList, setItemList] = useState([]);
    const { inputValue: item, setInputValue: setItem, isValid } = useValidatedInput();

    // Handle updates to the input field
    const handleItem = (event) => {
        setItem(event.target.value);
    };

    const addItem = () => {
        if (isValid) {
            setItemList([...itemList, item]);
        }
        setItem('');
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addItem();
        }
    };

    const handleClearButton = () => {
        setItemList([]);
    };

    return (
        <div>
            <input
                placeholder="Add item..."
                value={item}
                onChange={handleItem}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleClearButton}>
                Clear
            </button>
            <ol>
                {itemList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        </div>
    );
};

export default MyDynamicList;