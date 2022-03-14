import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import moment from "moment";

import { Route } from "../interfaces/route";
import { useLocalStorage } from "../hooks/use-local-storage";
import { SavedRoute } from "../interfaces/saved-route";
import { Formik, FormikHelpers } from "formik";
import { ErrorContainer } from "./error-container";

interface SavedRouteModalProps {
    savedRoute: SavedRoute | null;
}

const StyledSaveButtonContainer = styled(Col)`
    text-align: right;
`;

const SavedRouteModal = (props: SavedRouteModalProps) => {
    const [savedRoute, setSavedRoute] = React.useState<SavedRoute | null>(null);
    const [savedRoutes, setSavedRoutes] = useLocalStorage<SavedRoute[]>("savedRoutes");
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (props.savedRoute) {
            setSavedRoute(props.savedRoute);
            setShow(true);
        }
    }, [props.savedRoute]);

    const validate = (values: SavedRoute) => {
        const errors: {
            [key: string]: string;
        } = {};

        if (!values.name) {
            errors.name = "Please enter a Name";
        }

        return errors;
    };
    const onSubmit = async (namedSavedRoute: SavedRoute, { setSubmitting }: FormikHelpers<SavedRoute>) => {
        setSavedRoute(namedSavedRoute);

        if (!savedRoutes) {
            setSavedRoutes([namedSavedRoute!]);
        }
        else {
            savedRoutes.push(namedSavedRoute!);
            setSavedRoutes(savedRoutes);
        }

        setSubmitting(false);
        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="lg" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Save Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid className="g-0">
                    <Row className="g-0">
                        <Col>
                            <strong>Create a new route...</strong>
                        </Col>
                    </Row>

                    <Formik initialValues={savedRoute!} validate={validate} onSubmit={onSubmit}>
                        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit} spellCheck="false">
                                <Row>
                                    <Col xs={10}>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Control type="text" value={values.name} onChange={handleChange} />

                                            <ErrorContainer error={errors.name} />
                                        </Form.Group>
                                    </Col>
                                    <StyledSaveButtonContainer>
                                        <Form.Group>
                                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                                Save
                                            </Button>
                                        </Form.Group>
                                    </StyledSaveButtonContainer>
                                </Row>
                            </Form>
                        )}
                    </Formik>

                    <Row className="g-0">
                        <Col>
                            <strong>Or overwrite an existing route...</strong>
                        </Col>
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
            name: props.selectedRoute!.summary,
            savedOn: moment(),
            route: props.selectedRoute!
        });
    };

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)} title="Expand the route details">
                <FaChevronRight />
            </StyledExpandButton>

            <Offcanvas
                show={expanded}
                placement="start"
                scroll={true}
                backdrop={false}
                onHide={() => setExpanded(false)}
            >
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
