import React from "react";
import styled from "styled-components";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { LocationSearchService } from "../services/location-search-service";
import { LocationSearchResult, NullableLocationSearchResult } from "../interfaces/search-result";
import { Button, InputGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import "react-bootstrap-typeahead/css/Typeahead.css";

export interface SearchInputProps {
    id: string;
    onChange: (locationSearchResult: NullableLocationSearchResult) => unknown;
}

const StyledAddressSpan = styled.span`
    font-size: 12px;
    margin-left: 5px;
    color: grey;
`;

const AttributionPopover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Attribution</Popover.Header>
        <Popover.Body>
            NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox
            Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not
            be retained. POI(s) provided by Foursquare.
        </Popover.Body>
    </Popover>
);

export const AttributedSearchInput = (props: SearchInputProps) => {
    return (
        <InputGroup>
            <SearchInput id={props.id} onChange={props.onChange} />
            <InputGroup.Text id={`${props.id}-addon1`}>
                {/* todo - refactor into a tooltip ? */}
                <OverlayTrigger trigger="click" placement="right" overlay={AttributionPopover}>
                    <Button>
                        <FaInfoCircle />
                    </Button>
                </OverlayTrigger>
            </InputGroup.Text>
        </InputGroup>
    );
};

export const SearchInput = (props: SearchInputProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [searchResults, setSearchResults] = React.useState<LocationSearchResult[]>([]);
    const [attribution, setAttribution] = React.useState<string>("");
    const [selectedItem, setSelectedItem] = React.useState<LocationSearchResult | null>(null);

    const onSearch = async (query: string) => {
        setIsLoading(true);

        const locationSearchResponse = await new LocationSearchService().performSearch(query);

        setIsLoading(false);
        setSearchResults(locationSearchResponse.results);
        setAttribution(locationSearchResponse.attribution);
    };

    const onChange = (selectedItems: LocationSearchResult[]) => {
        if (selectedItems.length === 0) {
            setSelectedItem(null);
            props.onChange(null);
            return;
        }

        setSelectedItem(selectedItems[0]);
        props.onChange(selectedItems[0]);
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
