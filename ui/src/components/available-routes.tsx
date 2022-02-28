import React, { MutableRefObject } from "react";
import { Container, Modal, Row, Col, Card, Badge } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import maplibregl from "maplibre-gl";

import { Route } from "../interfaces/route";
import { PossibleRoutes } from "../interfaces/possible-routes";
import { ConfigContext } from "../App";
import { RouteBuildingService } from "../services/route-building-service";

interface DetailsMapProps {
    route: Route;
}

const MapContainerDiv = styled.div`
    width: 100%;
    height: 300px;
`;

const DetailsMap = (props: DetailsMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    React.useEffect(() => {
        if (config) {
            mapRef.current = new maplibregl.Map({
                container: mapContainerRef.current,
                style: `https://api.maptiler.com/maps/streets/style.json?key=${config?.MapTilerAPIKey}`,
                center: [-1.605333, 52.890665],
                zoom: 5
            });

            mapRef.current.on("load", async () => {
                await new RouteBuildingService(props.route, mapRef.current).mapRoute();
            });
        }
    }, [config, props.route]);

    return <MapContainerDiv ref={mapContainerRef} />;
};

interface PossibleRouteProps {
    route: Route;
    onChooseRoute: (route: Route) => unknown;
}

const StyledBadge = styled(Badge)`
    margin-right: 10px;
`;

const PossibleRouteCard = (props: PossibleRouteProps) => {
    const m = moment(new Date(0, 0, 0, 0, props.route.durationInMinutes));

    const hour = m.format("H");
    const hours = hour === "1" ? "1 hour" : `${hour} hours`;

    const min = m.format("m");
    const mins = min === "1" ? "1 minute" : `${min} minutes`;

    const formattedDuration = `${hours} and ${mins}`;

    return (
        <Col>
            <Card>
                <Card.Header>{props.route.summary}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <DetailsMap route={props.route} />

                        <StyledBadge bg="dark">
                            Distance (miles / km):{" "}
                            <strong>
                                {props.route.distanceInMiles.toFixed(0)} / {props.route.distanceInKm.toFixed(0)}
                            </strong>
                        </StyledBadge>

                        <StyledBadge bg="dark">
                            Duration: <strong>{formattedDuration}</strong>
                        </StyledBadge>
                    </Card.Text>
                    <Card.Link href="#" onClick={() => props.onChooseRoute(props.route)}>
                        Choose this route
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

interface PossibleRoutesModalProps {
    possibleRoutes: PossibleRoutes | null;
    onChooseRoute: (route: Route) => unknown;
}

export const AvailableRoutesModal = (props: PossibleRoutesModalProps) => {
    const [show, setShow] = React.useState(false);

    const onChooseRoute = (route: Route) => {
        props.onChooseRoute(route);
        setShow(false);
    };

    React.useEffect(() => {
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
                            props.possibleRoutes.routes.map((route) => (
                                <PossibleRouteCard route={route} onChooseRoute={onChooseRoute} />
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
