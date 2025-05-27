import { useState } from "react"

const useInputState = () => {

    const [ value, setValue ] = useState("")

    const [ validation, setValidation ] = useState({
        hasUpper: false,
        hasLower: false,
        hasSpecial: false,
        hasNum: false,
        hasMinLen: false
    })

    const onChange = e => {
        const input = e.target.value
        setValue(input);
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
        // regex.test(input)
        setValidation({
            hasUpper: /[A-Z]/.test(input),
            hasLower: /[a-z]/.test(input),
            hasSpecial: /[\W_]/.test(input),
            hasNum: /\d/.test(input),
            hasMinLen: input.length >=7,
        })
    }

    return { value, onChange, validation}
}

export default useInputState;