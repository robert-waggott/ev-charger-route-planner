import { Badge, Card, Col } from "react-bootstrap";
import moment from "moment";
import styled from "styled-components";

import { Route } from "../interfaces/route";
import { RouteDetailMap } from "./route-detail-map";

interface PossibleRouteProps {
    route: Route;
    onRouteChosen: (route: Route) => unknown;
}

const StyledBadge = styled(Badge)`
    margin-right: 10px;
`;

export const PossibleRouteCard = (props: PossibleRouteProps) => {
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
                        <RouteDetailMap route={props.route} />

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
                    <Card.Link href="#" onClick={() => props.onRouteChosen(props.route)}>
                        Choose this route
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};
