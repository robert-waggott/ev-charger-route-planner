import React, { MutableRefObject } from "react";
import { Container, Modal, Row, Col, Card, Badge } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";

import { Route } from "../interfaces/route";

interface PossibleRouteProps {
    route: Route;
}

interface PossibleRoutesModalProps {
    possibleRoutes: Route[] | null;
}

const StyledBadge = styled(Badge)`
    margin-right: 10px;
`;

const PossibleRouteCard = (props: PossibleRouteProps) => {
    console.log(props.route.durationInMinutes);

    const m = moment(new Date(0, 0, 0, 0, props.route.durationInMinutes));
    const formattedDuration = `${m.format("H")} hours and ${m.format("mm")} minutes`;

    return (
        <Col>
            <Card>
                <Card.Header>{props.route.summary}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <StyledBadge bg="dark">
                            Distance in miles: <strong>{props.route.distanceInMiles.toFixed(0)}</strong>
                        </StyledBadge>

                        <StyledBadge bg="dark">
                            Duration: <strong>{formattedDuration}</strong>
                        </StyledBadge>
                    </Card.Text>
                    <Card.Link href="#">Choose this route</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export const AvailableRoutesModal = (props: PossibleRoutesModalProps) => {
    const [show, setShow] = React.useState(false);

    // const { config } = React.useContext(ConfigContext);
    // const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    // const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    // React.useEffect(() => {
    //     if (config) {
    //         mapRef.current = new maplibregl.Map({
    //             container: mapContainerRef.current,
    //             style: `https://api.maptiler.com/maps/streets/style.json?key=${config?.MapTilerAPIKey}`,
    //             center: [-1.631291, 52.48278],
    //             zoom: 4
    //         });
    //     }
    // }, [config]);

    React.useEffect(() => {
        setShow(props.possibleRoutes ? true : false);
    }, [props.possibleRoutes]);

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" size="xl" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Available Routes for x to y</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        {props.possibleRoutes ? (
                            props.possibleRoutes.map((route) => <PossibleRouteCard route={route} />)
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};
