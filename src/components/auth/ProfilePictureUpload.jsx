import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { logUserEvent } from "@/lib/analytics.js";
import { db, storage } from "@/lib/firebase.js";
import { AnonymousIcon } from "@/components/Icons/Icons.jsx";
import { UPLOAD_ICON_LABEL } from "@/components/auth/constants.js";

const ProfileIconUpload = ({ user, setUser }) => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const iconRef = ref(storage, `userIcons/${user.uid}/icon_${Date.now()}`);
            await uploadBytes(iconRef, file);
            const downloadURL = await getDownloadURL(iconRef);
            await updateDoc(doc(db, "users", user.uid), { userIcon: downloadURL });
            logUserEvent("profileImageUpload", { user: user.uid });
            setUser({ ...user, userIcon: downloadURL });
        } catch (err) {
            alert("Error uploading profile icon: " + err.message);
        }
    };

    return (
        <div>
            {user.userIcon ? (
                <img src={user.userIcon} alt="Profile Icon" className="w-12 h-12 rounded-full object-cover" />
            ) : (
                <div className="relative w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer group">
                    <AnonymousIcon />
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="absolute rounded-full inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs">{UPLOAD_ICON_LABEL}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIconUpload;
