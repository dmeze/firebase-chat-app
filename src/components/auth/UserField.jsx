import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase.js";
import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/constants.js";

import { useAuthContext } from "./AuthContext.jsx";
import { SIGN_IN_LABEL, SIGN_UP_LABEL } from "./constants.js";

const UserField = () => {
    const { user, loading, setUser } = useAuthContext();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const iconRef = ref(storage, `userIcons/${user.uid}/icon_${Date.now()}`);
            await uploadBytes(iconRef, file);
            const downloadURL = await getDownloadURL(iconRef);
            await updateDoc(doc(db, "users", user.uid), { userIcon: downloadURL });

            setUser({ ...user, userIcon: downloadURL });
        } catch (err) {
            alert("Error uploading profile icon: " + err.message);
        }
    };

    return (
        <div className="pt-2 px-2 border-t mt-auto flex items-center gap-5">
            {user ? (
                <>
                    <div>
                        {user.userIcon ? (
                            <img
                                src={user.userIcon}
                                alt="Profile Icon"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="relative w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="absolute rounded-full inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs">Upload</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-5">
                        <p className="text-sm">Welcome, {user.username}</p>
                        <button onClick={handleSignOut} className="cursor-pointer">
                            <svg viewBox="0 0 512 512" className="w-5 h-5">
                                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex justify-between items-center w-full">
                    {loading ? <p>Loading...</p> : (
                        <>
                            <Link to={SIGN_IN_PATH} className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow">
                                {SIGN_IN_LABEL}
                            </Link>
                            <Link to={SIGN_UP_PATH} className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
                                {SIGN_UP_LABEL}
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserField;
