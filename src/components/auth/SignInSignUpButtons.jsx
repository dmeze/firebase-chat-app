import { Link } from "react-router-dom";

import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/constants.js";
import { SIGN_IN_LABEL, SIGN_UP_LABEL } from "@/components/auth/constants.js";

const SignInSignUpButtons = () => (
    <div className="flex justify-between items-center w-full">
        <Link to={SIGN_IN_PATH} className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow">
            {SIGN_IN_LABEL}
        </Link>
        <Link to={SIGN_UP_PATH} className="cursor-pointer w-[45%] text-center px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
            {SIGN_UP_LABEL}
        </Link>
    </div>
);

export default SignInSignUpButtons;
