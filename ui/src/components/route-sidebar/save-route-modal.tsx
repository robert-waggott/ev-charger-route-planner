import React from "react";
import styled from "styled-components";
import { Button, Col, Container, Row, Modal, Form, Table } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import moment from "moment";

import { SavedRoutesReducer } from "../saved-routes-reducer";
import { getLocalStorageValue, setLocalStorageValue } from "../../hooks/use-local-storage";
import { SavedRoute } from "../../interfaces/saved-route";
import { ErrorContainer } from "../error-container";
import { savedRoutesKey } from "../../constants";

interface SaveRouteModalProps {
    savedRoute: SavedRoute | null;
}

const StyledSaveButtonContainer = styled(Col)`
    text-align: right;
`;

export const SaveRouteModal = (props: SaveRouteModalProps) => {
    const [savedRoutes, dispatchSavedRoutes] = React.useReducer(
        SavedRoutesReducer,
        getLocalStorageValue<SavedRoute[] | null>(savedRoutesKey, null)
    );
    const [show, setShow] = React.useState(false);

    React.useMemo(() => {
        if (props.savedRoute) {
            setShow(true);
        }
    }, [props.savedRoute]);

    React.useEffect(() => {
        setLocalStorageValue(savedRoutesKey, savedRoutes);
    }, [savedRoutes]);

    const validate = (values: SavedRoute) => {
        const errors: {
            [key: string]: string;
        } = {};

        if (!values.name) {
            errors.name = "Please enter a Name";
        }

        return errors;
    };

    const onSubmit = (namedSavedRoute: SavedRoute, { setSubmitting }: FormikHelpers<SavedRoute>) => {
        dispatchSavedRoutes({
            type: "add",
            routeToAddOrReplace: namedSavedRoute
        });
        toast.success("Route saved");

        setSubmitting(false);
        setShow(false);
    };

    const onReplaceRoute = (index: number) => {
        dispatchSavedRoutes({
            type: "replace",
            routeToAddOrReplace: props.savedRoute!,
            indexToReplace: index
        });
        toast.success("Route replaced");

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

                    <Formik initialValues={props.savedRoute!} validate={validate} onSubmit={onSubmit}>
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

                    {savedRoutes ? (
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Saved On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedRoutes.map((route, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{route.name}</td>
                                            <td>{moment(route.savedOn).format("dddd Do MMM YYYY HH:mm")}</td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    type="button"
                                                    onClick={() => onReplaceRoute(index)}
                                                >
                                                    Replace
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <></>
                    )}
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
