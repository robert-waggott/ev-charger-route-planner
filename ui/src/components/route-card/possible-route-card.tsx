import { Card, Col } from "react-bootstrap";

import { Route } from "../../interfaces/route";
import { RouteDetailMap } from "../maps/route-detail-map";
import { DurationBadge, RouteDistanceBadge } from "./badges";

interface PossibleRouteProps {
    route: Route;
    onRouteChosen: (route: Route) => unknown;
}

export const PossibleRouteCard = (props: PossibleRouteProps) => {
    return (
        <Col>
            <Card>
                <Card.Header>{props.route.summary}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <RouteDetailMap route={props.route} />

                        <RouteDistanceBadge route={props.route} />

                        <DurationBadge route={props.route} />
                    </Card.Text>
                    <Card.Link href="#" onClick={() => props.onRouteChosen(props.route)}>
                        Choose this route
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};
