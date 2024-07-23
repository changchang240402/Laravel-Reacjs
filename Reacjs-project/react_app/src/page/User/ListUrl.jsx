import React, { useState } from 'react';
const ListUrl = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const shortenUrl = async (url) => {
        // Replace this with your URL shortening logic
        // For demonstration purposes, we'll mock the shortened URL
        return `https://short.url/${btoa(url).substring(0, 8)}`;
    };

    const handleShorten = async () => {
        const shortUrl = await shortenUrl(longUrl);
        setShortUrl(shortUrl);
        setIsCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
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
                        value={shortUrl}
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

export default ListUrl