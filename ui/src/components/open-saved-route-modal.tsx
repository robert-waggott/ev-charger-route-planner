import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";

import { useLocalStorage } from "../hooks/use-local-storage";
import { Route } from "../interfaces/route";
import { savedRoutesKey } from "../constants";
import { SavedRoute } from "../interfaces/saved-route";
import { PossibleRouteCard } from "./possible-route-card";

interface OpenSavedRouteModalProps {
    onRouteChosen: (route: Route) => unknown;
}

export const OpenSavedRouteModal = (props: OpenSavedRouteModalProps) => {
    const [savedRoutes] = useLocalStorage<SavedRoute[]>(savedRoutesKey);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setShow(savedRoutes ? true : false);
    }, [savedRoutes]);

    if (!savedRoutes) {
        return <></>;
    }

    const onRouteChosen = (route: Route) => {
        setShow(false);
        props.onRouteChosen(route);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="xl" keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title>Open a saved route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        {savedRoutes.map((savedRoute) => (
                            <PossibleRouteCard route={savedRoute.route} onRouteChosen={onRouteChosen} />
                        ))}
                    </Row>
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
