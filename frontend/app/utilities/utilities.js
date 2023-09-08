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
