import { Badge } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";

import { Route } from "../../interfaces/route";

const StyledBadge = styled(Badge)`
    margin-right: 10px;
`;

interface RouteBadgeProps {
    route: Route;
}

export const RouteDistanceBadge = (props: RouteBadgeProps) => {
    return (
        <StyledBadge bg="dark">
            Distance (miles / km):{" "}
            <strong>
                {props.route.distanceInMiles.toFixed(0)} / {props.route.distanceInKm.toFixed(0)}
            </strong>
        </StyledBadge>
    );
};

export const DurationBadge = (props: RouteBadgeProps) => {
    const m = moment(new Date(0, 0, 0, 0, props.route.durationInMinutes));

    const hour = m.format("H");
    const hours = hour === "1" ? "1 hour" : `${hour} hours`;

    const min = m.format("m");
    const mins = min === "1" ? "1 minute" : `${min} minutes`;

    const formattedDuration = `${hours} and ${mins}`;

    return (
        <StyledBadge bg="dark">
            Duration: <strong>{formattedDuration}</strong>
        </StyledBadge>
    );
};
