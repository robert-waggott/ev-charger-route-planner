import React from "react";
import styled from "styled-components";
import { FaBars, FaSearch } from "react-icons/fa";

export interface SidebarProps {}

const StyledContainerDiv = styled.div`
    z-index: 999;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 350px;
    background: #f5f5f5;
`;

const StyledExpandButton = styled.button`
    border: none;
    z-index: 999;
    position: absolute;
    top: 20px;
    left: 20px;
    height: 42px;
    width: 42px;
    font-size: 19px;
    background: none;
    cursor: pointer;
`;

export const Sidebar = (props: SidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    if (expanded) {
        // todo: use bootstrap off canvas instead -
        return <StyledContainerDiv>Sidebar</StyledContainerDiv>;
    }

    return (
        <StyledExpandButton onClick={() => setExpanded(true)}>
            <FaSearch />
        </StyledExpandButton>
    );
};
