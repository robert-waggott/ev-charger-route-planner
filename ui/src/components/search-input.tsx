import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export interface SearchInputProps {
    className?: string;
    placeholder: string;
    onSearch: (searchTerm: string) => unknown;
}

const StyledInput = styled.input`
    width: 250px;
    height: 36px;
    border: none;
    padding-left: 10px;
`;

const StyledButton = styled.button`
    border: none;
    width: 50px;
    height: 37px;
    color: white;
    background: navy;
`;

export const SearchInput = (props: SearchInputProps) => {
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    return (
        <div className={props.className}>
            <StyledInput
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledButton onClick={() => props.onSearch(searchTerm)}>
                <FaSearch />
            </StyledButton>
        </div>
    );
};
