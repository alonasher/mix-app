import Button from "../button/button";
import "./searchBar.css";
import React from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const { placeholder = 'Search...' ,onSearch,searchTerm,setSearchTerm} = props;

 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return; // Do not search if the input is empty
        }
        onSearch(searchTerm);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                style={{ padding: '8px', flex: 1 }}
            />
            <Button className='go-btn' onClick={handleSearch} label="Go" />
        
        </div>
    );
};

export default SearchBar;