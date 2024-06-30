import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import '../App.css';

const fetcher = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

const ListItems = ({url, itemsName, handleBackClick}) => {
    const {
        data: foods,
        error,
        isValidating,
    } = useSWR(url, fetcher);

    if (error) {
        console.error('Failed to fetch data:', error);
        return <div className='failed'>Failed to load: {error.message}</div>;
    }
    if (!foods && isValidating) return <div className="Loading">Loading...</div>;

    return (
        <div>
            <h2 className="h2">List of {itemsName}</h2>
            <ul className="list-items">
                {foods.map((item, index) => (
                    <li className="list" key={index}>
                        <strong>{item.name}</strong> - Type: {item.type}, Price: ${item.price}
                        {item.volume && `, Volume: ${item.volume}`}
                    </li>
                ))}
            </ul>
            <button className="Diet-Button" onClick={handleBackClick}>Back to main page</button>
        </div>
    );
};

export default ListItems;
