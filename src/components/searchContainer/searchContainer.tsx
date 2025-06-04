import './searchContainer.css';
import SearchBar from '../searchBar/searchBar';
import Button from '../button/button';


interface SearchContainerProps {
    className?: string;
    setSelectedItem: (item: any) => void;
    onSearch: (term: string,url?:string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    data:any[];
    nextUrl?: string;
}


const SearchContainer = (props: SearchContainerProps) => {
    const { className, setSelectedItem,onSearch ,searchTerm
            ,setSearchTerm ,data, nextUrl} = props;


   
    return (
        <div className={`${className} container`}>
            <SearchBar onSearch={onSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {data && data.length > 0 && data.map((item, index) => (
                <div className='search-item' key={item.key} onClick={() => setSelectedItem(item)}>
                    <img className='thumbnail-image' src={item.pictures.thumbnail} alt={item.name} />
                    <h4 className='search-item-name'>{item.name}</h4>
                </div>
            ))}
            <div className='search-footer'>
                <div>{nextUrl && <Button className='next-btn' onClick={() => onSearch('', nextUrl)} label='next'/>}</div>
                {/* {data && data.length > 0 && <div className='search-footer-toggles-container'><div>List Button</div>
                    <div>Tile Button</div></div>} */}
            </div>
        </div>
    );
};

export default SearchContainer;