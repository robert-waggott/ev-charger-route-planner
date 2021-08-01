import React from "react";
import styled from "styled-components";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { SearchService } from "../services/search-service";
import { LocationSearchResult } from "../interfaces/search-result";

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
    const [searchResults, setSearchResults] = React.useState<LocationSearchResult[]>([]);
    const [attribution, setAttribution] = React.useState<string>("");
    const [selectedItem, setSelectedItem] = React.useState<LocationSearchResult | null>(null);

    const onSearch = async (query: string) => {
        setIsLoading(true);

        const locationSearchResponse = await new SearchService().performSearch(query);

        setIsLoading(false);
        setSearchResults(locationSearchResponse.results);
        setAttribution(locationSearchResponse.attribution);
    };

    const onChange = (selectedItems: LocationSearchResult[]) => {
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
            labelKey={(option: LocationSearchResult) => option.name}
            onSearch={onSearch}
            options={searchResults}
            onChange={onChange}
            renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                    {results.map((result, index) => (
                        <MenuItem option={result} position={index}>
                            {result.name}
                            {result.description ? <StyledAddressSpan>{result.description}</StyledAddressSpan> : ""}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        />
    );
};
