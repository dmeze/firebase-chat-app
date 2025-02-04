import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics";

import { analytics, auth } from "@/lib/firebase.js";
import { HOME_PATH, SIGN_UP_PATH } from "@/lib/constants.js";
import { logUserError } from "@/lib/analytics.js";

import { SIGN_IN_LABEL, SIGN_UP_LABEL, signInFields } from "./constants.js";

const SignIn = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        const { email, password } = Object.fromEntries(new FormData(e.target));

        try {
            await signInWithEmailAndPassword(auth, email, password);
            logEvent(analytics, "login", { method: "email", email: email });
            navigate(HOME_PATH);
        } catch (err) {
            logUserError("sign_in", { email, error: err });
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow">
            <h2 className="text-2xl font-bold mb-6">{SIGN_IN_LABEL}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignIn} className="space-y-4">
                {signInFields.map(({ name, label, type, pattern, title }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block text-sm font-medium mb-1">
                            {`${label}:`}
                        </label>
                        <input
                            id={name}
                            name={name}
                            type={type}
                            pattern={pattern}
                            title={title}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 transition"
                >
                    {SIGN_IN_LABEL}
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to={SIGN_UP_PATH} className="text-blue-500">
                    {SIGN_UP_LABEL}
                </Link>
            </p>
        </div>
    );
};

export default SignIn;
