import AppHeader from "../components/AppHeader";

const AppAbout = () => {
    return (
        <>
            <AppHeader />
            <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
                <h1 className="text-3xl font-bold mb-4">About Recipe4Me</h1>
                <p className="text-gray-700">
                    Welcome to Recipe4Me, your go-to platform for discovering and saving delicious recipes!
                    Recipe4Me was born from my passion for cooking, health and wanting to minimise my impact on the planet.
                </p>

                <h2 className="text-2xl font-bold mt-6 mb-4">Connect with Me</h2>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/StrukovSergei"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sergei-strukov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </>
    );
};

export default AppAbout;
