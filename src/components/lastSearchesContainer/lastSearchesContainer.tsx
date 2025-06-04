import "./lastSearchesContainer.css";
import React from 'react';

interface LastSearchesContainerProps {
    className?: string;
    searches: string[];
    onSearchClick: (search: string) => void;
}

const LastSearchesContainer = (props :LastSearchesContainerProps ) => {
    const { className, searches, onSearchClick } = props;
    
    return (
        <div className={`${className} last-searches-container`}>
            <h2>Last Searches</h2>
            <div className="last-searches-list">
                {searches.map((search, index) => (
                    <div key={index}>
                        <a onClick={() => onSearchClick(search)}>{search}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastSearchesContainer;