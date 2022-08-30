import { ChangeEvent, useState } from "react";

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return [value, setValue, changeHandler];
}

export default useInput;
