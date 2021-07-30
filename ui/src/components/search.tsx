import styled from "styled-components";
import { SearchInput } from "./search-input";

export interface SearchProps {}

const StyledDiv = styled.div`
    z-index: 999;
    position: absolute;
    top: 30px;
    left: 30px;
`;

const StyledSearchInput = styled(SearchInput)`
    display: inline-block;
`;

const StyledFromSearchInput = styled(StyledSearchInput)`
    margin-right: 20px;
`;

export const Search = (props: SearchProps) => {
    return (
        <StyledDiv>
            <StyledFromSearchInput
                placeholder="From"
                onSearch={(searchTerm) => {}}
            />

            <StyledSearchInput placeholder="To" onSearch={(searchTerm) => {}} />
        </StyledDiv>
    );
};
