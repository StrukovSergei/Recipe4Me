import { Link } from 'react-router-dom';

const AppHeader = () => {


    return (
        <>
            <Link to={`/`}>
                <div className="header">
                    <div className="title">Recipe4Me</div>
                </div>
            </Link>
            <Link to={`/search`}>
                <a>Search</a>
            </Link>
            <Link to={`/favourites`}>
                <a>Favourites</a>
            </Link>
            <Link to={`/about`}>
                <a>About</a>
            </Link>
        </>
    );
};

export default AppHeader;