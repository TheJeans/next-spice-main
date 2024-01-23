import React, { useState, useEffect } from 'react';

interface ListItem {
    name: string;
}

const SearchComponent = <T extends ListItem>({ data, onSearchResult }: { data: T[], onSearchResult: (results: T[]) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = data.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        onSearchResult(results);
    }, [searchTerm, data]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchComponent;
