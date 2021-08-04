import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container } from "react-bootstrap";
import { RouteSearchForm } from "./route-search-form";

export interface SidebarProps {}

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

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)}>
                <FaSearch />
            </StyledExpandButton>

            <Offcanvas show={expanded} onHide={() => setExpanded(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <RouteSearchForm />
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
