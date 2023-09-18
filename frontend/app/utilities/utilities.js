import { useDispatch } from "react-redux";
import { useGetTodosMutation, usePostLoginUserMutation, usePostRefreshTokenMutation } from "@/features/apiSlice";

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
    const access = localStorage.getItem('access_key');
    const refresh = localStorage.getItem('refresh_key');
    try {
        const response = await usePostRefreshTokenMutation({ refresh });
    } catch(e) {
        
    }
}
export const addAuthToBody = async (body) => {
    const accessKey = localStorage.getItem("access_key");
    if (accessKey) {
        try {
            
             const payload = await useGetTodosMutation({ ...body, authToken: localStorage.getItem('access_key') });
             await Promise.resolve(payload);
        } catch (e) {
            console.log('There was an error', e);
        }
    }
    return body;
}
