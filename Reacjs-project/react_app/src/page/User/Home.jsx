import React, { useState, useEffect } from 'react';
import urlService from '../../services/UrlService';
const Home = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const {createUrl} = urlService();
    const shortenUrl = `http://localhost:3000/${shortUrl}`;
    const handleShorten = async () => {
        try {
            const data = await createUrl(longUrl);
            setShortUrl(data.data);
            console.log('abc', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsCopied(false);
    };
    console.log(shortenUrl)
    const handleCopy = () => {
        navigator.clipboard.writeText(shortenUrl);
        setIsCopied(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter long URL"
                    className="border p-2 w-full rounded"
                />
            </div>
            <button
                onClick={handleShorten}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Shorten URL
            </button>
            {shortUrl && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={shortenUrl}
                        readOnly
                        className="border p-2 w-full rounded"
                    />
                    <button
                        onClick={handleCopy}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home