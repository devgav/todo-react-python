export const passwordErrors = (password) => {
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

export const todoForm = (setDateError, task="", date="") =>(
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
