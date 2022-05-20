import React from "react";
import { Container, Modal, Row } from "react-bootstrap";

import { Route } from "../interfaces/route";
import { PossibleRoutes } from "../interfaces/possible-routes";
import { PossibleRouteCard } from "./route-card/possible-route-card";

interface PossibleRoutesModalProps {
    possibleRoutes: PossibleRoutes | null;
    onRouteChosen: (route: Route) => unknown;
}

export const AvailableRoutesModal = (props: PossibleRoutesModalProps) => {
    const [show, setShow] = React.useState(false);

    const onChooseRoute = (route: Route) => {
        props.onRouteChosen(route);
        setShow(false);
    };

    React.useMemo(() => {
        setShow(props.possibleRoutes ? true : false);
    }, [props.possibleRoutes]);

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="xl" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Available Routes for&nbsp;
                    {props.possibleRoutes ? props.possibleRoutes.from : ""} to&nbsp;
                    {props.possibleRoutes ? props.possibleRoutes.to : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        {props.possibleRoutes && props.possibleRoutes.routes ? (
                            props.possibleRoutes.routes.map((route, index) => (
                                <PossibleRouteCard key={index} route={route} onRouteChosen={onChooseRoute} />
                            ))
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};
