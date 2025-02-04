import { signInAnonymously } from "firebase/auth";

import { auth } from "@/lib/firebase.js";
import { ANONYMOUS_LABEL } from "@/components/auth/constants.js";
import { logUserError } from "@/lib/analytics.js";
import { useAuthContext } from "@/components/auth/AuthContext.jsx";

const AnonymousSignInButton = () => {
    const { setUser } = useAuthContext();

    const handleSignInAnonymously = async () => {
        try {
            const { user } = await signInAnonymously(auth);
            setUser(user);
        } catch (err) {
            logUserError({ type: 'signInAnonymously', message: err.message });
        }
    };

    return (
        <div className="flex justify-center items-center w-full mt-4">
            <button onClick={handleSignInAnonymously} className="cursor-pointer w-full text-center px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
                {ANONYMOUS_LABEL}
            </button>
        </div>
    )
}

export default AnonymousSignInButton
