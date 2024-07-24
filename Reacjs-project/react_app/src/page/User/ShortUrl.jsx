import React, { useState, useEffect } from 'react';
import urlService from '../../services/UrlService';
import Loading from '../../components/Loading';
import { useParams } from "react-router-dom";
const ShortUrl = () => {
    const { code } = useParams();
    const {shortUrl} = urlService();
    const [status, setStatus] = useState(false);
    const [error, setError] = useState('');
    const handleShorten = async () => {
        const result = await shortUrl(code);
        if (result && result.error) {
            setError(result.message);
            setStatus(true);
        }
    };
    useEffect(() => {
        handleShorten();
    }, []);

    return (
        <div className="m-6">
        {(status) ? (
            <div className='flex justify-center items-center min-h-screen z-10'>
                <h3>{error}</h3>
            </div>
            ) : (
                <div className='flex justify-center items-center min-h-screen z-10'>
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default ShortUrl