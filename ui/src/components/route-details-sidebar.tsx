import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import moment from "moment";

import { Route } from "../interfaces/route";
import { useLocalStorage } from "../hooks/use-local-storage";
import { SavedRoute } from "../interfaces/saved-route";

interface SavedRouteModalProps {
    savedRoute: SavedRoute | null;
}

const SavedRouteModal = (props: SavedRouteModalProps) => {
    const [savedRoutes, setSavedRoutes] = useLocalStorage<SavedRoute[]>("savedRoutes");
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (props.savedRoute) {
            setShow(true);
        }
    }, [props.savedRoute]);

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="lg" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Save Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row></Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

interface RouteDetailsProps {
    selectedRoute: Route | null;
}

const StyledExpandButton = styled.button`
    border: none;
    z-index: 999;
    position: absolute;
    bottom: 20px;
    left: 20px;
    height: 42px;
    width: 42px;
    font-size: 19px;
    background: none;
    cursor: pointer;
`;

export const RouteDetailsSidebar = (props: RouteDetailsProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const [savedRoute, setSavedRoute] = React.useState<SavedRoute | null>(null);

    if (!props.selectedRoute) {
        return <></>;
    }

    const saveRoute = () => {
        setSavedRoute({
            name: "",
            savedOn: moment(),
            route: props.selectedRoute!
        });
    };

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)} title="Expand the route details">
                <FaChevronRight />
            </StyledExpandButton>

            <Offcanvas show={expanded} placement="start" onHide={() => setExpanded(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.selectedRoute.summary}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid className="g-0">
                        <Row className="g-0">
                            <Col>
                                <Button variant="secondary" onClick={saveRoute}>
                                    Save this Route
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <SavedRouteModal savedRoute={savedRoute} />
        </>
    );
};
