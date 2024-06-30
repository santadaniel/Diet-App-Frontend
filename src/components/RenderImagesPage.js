import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import '../App.css';

const fetcher = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

const RenderImagesPage = ({url, itemsName, handleBackClick}) => {
    const {
        data: items,
        error,
        isValidating,
    } = useSWR(url, fetcher);

    if (error) {
        console.error('Failed to fetch data:', error);
        return <div className='failed'>Failed to load: {error.message}</div>;
    }
    if (!items && isValidating) return <div className="Loading">Loading...</div>;

    return (
        <div>
            <h2 className="h2">List of {itemsName} items</h2>
            <ul className="list-items">
                {items.map((item, index) => (
                    <li className="list" key={index}>
                        <p className="p">{item}</p>
                        <img src={require(`../res/${itemsName}/${item}.jpeg`)}
                             alt={`${itemsName} ${item}`}
                             className="list-image"
                        />
                    </li>
                ))}
            </ul>
            <button className="Diet-Button" onClick={handleBackClick}>Back to main page</button>
        </div>
    );
};

export default RenderImagesPage;
