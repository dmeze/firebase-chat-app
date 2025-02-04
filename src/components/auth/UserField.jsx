import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase.js";
import { LogoutIcon } from "@/components/Icons/Icons.jsx";

import { useAuthContext } from "./AuthContext.jsx";
import { DEFAULT_USER_NAME } from "./constants.js";
import AnonymousSignInButton from "@/components/auth/AnonymousSignInButton.jsx";
import SignInSignUpButtons from "@/components/auth/SignInSignUpButtons.jsx";
import ProfileIconUpload from "@/components/auth/ProfilePictureUpload.jsx";

const UserField = () => {
    const { user, setUser } = useAuthContext();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="pt-2 px-2 border-t mt-auto flex items-center gap-5">
            {user ? (
                <>
                    <ProfileIconUpload user={user} setUser={setUser} />
                    <div className="flex items-center space-x-5">
                        <p className="text-sm">Welcome, {user.username || DEFAULT_USER_NAME}</p>
                        <button onClick={handleSignOut} className="cursor-pointer">
                            <LogoutIcon />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col w-full">
                    <SignInSignUpButtons />
                    <AnonymousSignInButton />
                </div>
            )}
        </div>
    );
};

export default UserField;
