import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../../firebase.js";
import { useAuthContext } from "./AuthContext.jsx";
import { LOGOUT_LABEL, SIGN_IN_LABEL, SIGN_UP_LABEL } from "./constants.js";
import { SIGN_IN_PATH, SIGN_UP_PATH } from "../../lib/constants.js";

const UserField = () => {
    const { user, loading } = useAuthContext();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="p-4 border-t mt-auto">
            {user ? (
                <div className="flex justify-between items-center">
                    <p className="text-sm">Welcome, {user.username}</p>
                    <button
                        onClick={handleSignOut}
                        className="cursor-pointer w-[35%] text-center px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                        {LOGOUT_LABEL}
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center pt-4">
                    {loading
                        ? <p>Loading...</p>
                        : (
                            <>
                                <Link
                                    to={SIGN_IN_PATH}
                                    className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
                                >
                                    {SIGN_IN_LABEL}
                                </Link>
                                <Link
                                    to={SIGN_UP_PATH}
                                    className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg shadow"
                                >
                                    {SIGN_UP_LABEL}
                                </Link>
                            </>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default UserField;
