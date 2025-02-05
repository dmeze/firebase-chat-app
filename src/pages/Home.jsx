import { DESCRIPTION_TEXT, WELCOME_TEXT } from "@/pages/constants.js";

const Home = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-bold mb-4">{WELCOME_TEXT}</h2>
        <p className="text-lg text-gray-600">
            {DESCRIPTION_TEXT}
        </p>
    </div>
);

export default Home;
