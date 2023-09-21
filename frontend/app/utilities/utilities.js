import { useSelector } from "react-redux";
import { usePostRefreshTokenMutation } from "@/features/apiSlice";
import { userSelector } from "@/features/user/userSlice";

const passwordErrors = (password) => {
    const errors = [];
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const numberRegex = /[0-9]/;
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long. ");
        errors.push(<br/>)
    }
    if (!symbolRegex.test(password)) {
        errors.push("Password must contain at least one symbol. ");
        errors.push(<br/>)
    }
    if (!numberRegex.test(password)) {
        errors.push("Password must contain at least one number. ");
        errors.push(<br/>)
    }
    if (errors.length > 0) {
        return errors;
    }
}

export const userValidation = (validatePassword = true) => {
    return {
        initialValues: {
            email: '',
                password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => {
                return validatePassword ? passwordErrors(value) : null
            },
        },
        validateInputOnChange: true
    }
}

export const todoValidation = (setDateError, task="", date="") =>(
    {
        initialValues: {
            task,
            date
        },

        validate: {
            date: (value) => {
                const now = new Date();
                if (now > value && value !== "") {
                    setDateError(true)
                    return "This date is in the past"
                }
                setDateError(false)
                return null
            },
        },
        validateInputOnChange: true,
    }
)

export  const isSmallScreen = (viewPortSize) => {
    return viewPortSize.height <= 900 && viewPortSize.width <= 420;
}


async function checkValidKey() {
    const refresh = localStorage.getItem('refresh_key');
    const tokenNotValid = "token_not_valid";
    const userLoggedIn = useSelector(userSelector);
    const finalResponse = {
        validKey: true,
        errorMessage: ''
    }
    try {
        if (userLoggedIn) {
            const response = await usePostRefreshTokenMutation({ refresh });
            if (response.code === tokenNotValid) {
                finalResponse.validKey = false;
                finalResponse.errorMessage = tokenNotValid;
                return Promise.resolve({ finalResponse });
            }
            return Promise.resolve({ finalResponse });
        } else {
            finalResponse.validKey = false;
            finalResponse.errorMessage = "User not logged in.";
            return Promise.resolve({ finalResponse });
        }
    } catch(e) {
        return Promise.reject(`Error ${e}`);
    }
}

export function addQueryParam(paramName, paramValue) {
    const searchParams = new URLSearchParams();
    searchParams.set(paramName, paramValue);
    return searchParams.toString() ? `?${searchParams.toString()}` : '';
}
