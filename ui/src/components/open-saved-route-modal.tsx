import React from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import { useLocalStorage } from "../hooks/use-local-storage";
import { Route } from "../interfaces/route";
import { savedRoutesKey } from "../constants";
import { SavedRoute } from "../interfaces/saved-route";
import { PossibleRouteCard } from "./route-card/possible-route-card";
import { RouteSearchForm } from "./search-sidebar/route-search-form";
import { PossibleRoutes } from "../interfaces/possible-routes";

interface OpenSavedRouteModalProps {
    onRouteChosen: (route: Route) => unknown;
    onSearchSubmitted: (possibleRoutes: PossibleRoutes) => unknown;
}

const MapANewRouteHeader = styled.h5`
    margin-top: 20px;
    padding-top: 5px;
    border-top: 1px solid #dee2e6;
`;

export const OpenSavedRouteModal = (props: OpenSavedRouteModalProps) => {
    const [savedRoutes] = useLocalStorage<SavedRoute[]>(savedRoutesKey);
    const [show, setShow] = React.useState(true);

    const onRouteChosen = (route: Route) => {
        setShow(false);
        props.onRouteChosen(route);
    };

    const onSearchSubmitted = (possibleRoutes: PossibleRoutes) => {
        setShow(false);
        props.onSearchSubmitted(possibleRoutes);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="xl" keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title>Open a saved route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid className="g-0">
                    {savedRoutes ? (
                        <Row>
                            {savedRoutes.map((savedRoute, index) => (
                                <PossibleRouteCard key={index} route={savedRoute.route} onRouteChosen={onRouteChosen} />
                            ))}
                        </Row>
                    ) : (
                        <Row>
                            <Col>There are no saved routes to open</Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <MapANewRouteHeader>Or map a new route</MapANewRouteHeader>
                        </Col>
                    </Row>

                    <RouteSearchForm onSearchSubmitted={onSearchSubmitted} />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
