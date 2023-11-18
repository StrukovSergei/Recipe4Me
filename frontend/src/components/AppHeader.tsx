import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();

    const handleHeaderClick = () => {
        // Navigate to the root when the header is clicked
        navigate('/');
    };

    return (
        <h1 onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
            App header
        </h1>
    );
};

export default AppHeader;