export const signUpFields = [
    {
        name: "email",
        label: "Email",
        type: "email",
        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        title: "Please enter a valid email address",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        pattern: ".{6,}",
        title: "Password must be at least 6 characters long",
    },
    {
        name: "username",
        label: "Username",
        type: "text",
        pattern: ".{3,}",
        title: "Username must be at least 3 characters long",
    },
]

export const signInFields = [
    {
        name: "email",
        label: "Email",
        type: "email",
        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        title: "Please enter a valid email address",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        pattern: ".{6,}",
        title: "Password must be at least 6 characters long",
    },
]

export const UPLOAD_ICON_LABEL = "Upload";
export const DEFAULT_USER_NAME = 'Anonymous';
export const ANONYMOUS_LABEL = 'Stay Anonymous'
export const SIGN_IN_LABEL = "Sign In";
export const SIGN_UP_LABEL = "Sign Up";