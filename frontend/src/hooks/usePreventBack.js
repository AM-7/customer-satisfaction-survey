import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usePreventBack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = (event) => {
            event.preventDefault();
            navigate('/'); // Redirect to dashboard or any safe page
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);
};

export default usePreventBack;
