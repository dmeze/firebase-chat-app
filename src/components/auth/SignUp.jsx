import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { SIGN_IN_LABEL, SIGN_UP_LABEL, signUpFields } from "./constants.js";
import { HOME_PATH, SIGN_IN_PATH } from "../../lib/constants.js";

const SignUp = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        const { email, password, username } = Object.fromEntries(new FormData(e.target));

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", user.uid), { email: user.email, username, userIcon: "" });
            navigate(HOME_PATH);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow">
            <h2 className="text-2xl font-bold mb-6">{SIGN_UP_LABEL}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignUp} className="space-y-4">
                {signUpFields.map(({ name, label, type, title, pattern }) => (
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
                <button type="submit" className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded transition">
                    {SIGN_UP_LABEL}
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account? <Link to={SIGN_IN_PATH} className="text-blue-500">{SIGN_IN_LABEL}</Link>
            </p>
        </div>
    );
};

export default SignUp;
