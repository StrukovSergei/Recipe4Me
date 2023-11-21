import { Link } from 'react-router-dom';

const AppHeader = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
            {/* Logo on the left */}
            <Link to={`/`} className="text-lg font-bold">
                Recipe4Me
            </Link>

            {/* Tabs in the middle */}
            <div className="flex space-x-4">
                <Link to={`/search`} className="hover:text-gray-300">
                    Search
                </Link>
                <Link to={`/favourites`} className="hover:text-gray-300">
                    Favourites
                </Link>
                <Link to={`/about`} className="hover:text-gray-300">
                    About
                </Link>
            </div>

            {/* Social links on the right */}
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                    {/* Replace with your social icon (e.g., Twitter, Facebook, etc.) */}
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                    {/* Replace with your social icon */}
                    <i className="fab fa-facebook"></i>
                </a>
            </div>
        </div>
    );
};
export default AppHeader;