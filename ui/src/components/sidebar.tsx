import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";

import { RouteSearchForm } from "./route-search-form";
import { Route } from "../interfaces/route";
import { PossibleRoutes } from "../interfaces/possible-routes";

export interface SidebarProps {
    selectedRoute: Route | null;
    onSearchSubmitted: (possibleRoutes: PossibleRoutes) => unknown;
}

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

export const SearchSidebar = (props: SidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const onSearchSubmitted = (possibleRoutes: PossibleRoutes) => {
        props.onSearchSubmitted(possibleRoutes);
    };

    React.useEffect(() => {
        if (props.selectedRoute) {
            setExpanded(false);
        }
    }, [props.selectedRoute]);

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)}>
                <FaSearch />
            </StyledExpandButton>

            <Offcanvas show={expanded} placement="start" onHide={() => setExpanded(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <RouteSearchForm onSearchSubmitted={onSearchSubmitted} />
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
