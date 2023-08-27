import { useState } from "react";

function useValidatedInput(initialValue = '') {
    const [inputValue, setInputValue] = useState(initialValue);

    const isValid = inputValue.trim() !== '';

    return {
        inputValue,
        setInputValue,
        isValid
    };
}

export default useValidatedInput;