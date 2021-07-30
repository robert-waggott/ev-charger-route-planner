import React from "react";
import styled from "styled-components";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { SearchService } from "../services/search-service";
import { SearchResult } from "../interfaces/search-result";

export interface SearchInputProps {
    id: string;
}

const StyledAddressSpan = styled.span`
    font-size: 12px;
    margin-left: 5px;
    color: grey;
`;

export const SearchInput = (props: SearchInputProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>(
        []
    );
    const [selectedItem, setSelectedItem] = React.useState<SearchResult | null>(
        null
    );

    const onSearch = async (query: string) => {
        setIsLoading(true);

        const searchResults = await new SearchService().performSearch(query);

        setIsLoading(false);
        setSearchResults(searchResults);
    };

    const onChange = (selectedItems: SearchResult[]) => {
        if (selectedItems.length === 0) {
            setSelectedItem(null);
            return;
        }

        setSelectedItem(selectedItems[0]);

        // todo: raise an event at this point...
    };

    return (
        <AsyncTypeahead
            id={props.id}
            useCache={false}
            isLoading={isLoading}
            labelKey={(option: SearchResult) => option.name}
            onSearch={onSearch}
            options={searchResults}
            onChange={onChange}
            renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                    {results.map((result, index) => (
                        <MenuItem option={result} position={index}>
                            {result.name}
                            {result.address ? (
                                <StyledAddressSpan>
                                    {result.address}
                                </StyledAddressSpan>
                            ) : (
                                ""
                            )}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        />
    );
};
