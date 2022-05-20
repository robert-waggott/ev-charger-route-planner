import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import { Route } from "../../interfaces/route";
import { DurationBadge, RouteDistanceBadge } from "./badges";

const buildRoute = (mins = 0) => {
    const route: Route = {
        summary: "",
        durationInMinutes: mins,
        geometry: {
            type: "LineString",
            coordinates: []
        },
        numberOfSteps: 0,
        distanceInMeters: 0,
        distanceInKm: faker.datatype.number(),
        distanceInMiles: faker.datatype.number(),
        steps: []
    };

    return route;
};

describe("RouteDistanceBadge", () => {
    const route = buildRoute();

    test("Renders the expected distance in miles", () => {
        const { queryByText } = render(<RouteDistanceBadge route={route} />);
        const expected = queryByText(route.distanceInMiles.toFixed(0), { exact: false });

        expect(expected).not.toBeNull();
    });

    test("Renders the expected distance in km", () => {
        const { queryByText } = render(<RouteDistanceBadge route={route} />);
        const expected = queryByText(route.distanceInKm.toFixed(0), { exact: false });

        expect(expected).not.toBeNull();
    });
});

describe("DurationBadge", () => {
    test("Renders the expected time when 0 mins is passed in as length", () => {
        const route = buildRoute(0);
        const { queryByText } = render(<DurationBadge route={route} />);
        const expected = queryByText("0 hours and 0 minutes", { exact: false });

        expect(expected).not.toBeNull();
    });

    test("Renders the expected time when 59 mins is passed in as length", () => {
        const route = buildRoute(59);
        const { queryByText } = render(<DurationBadge route={route} />);
        const expected = queryByText("0 hours and 59 minutes", { exact: false });

        expect(expected).not.toBeNull();
    });

    test("Renders the expected time when 61 mins is passed in as length", () => {
        const route = buildRoute(61);
        const { queryByText } = render(<DurationBadge route={route} />);
        const expected = queryByText("1 hour and 1 minute", { exact: false });

        expect(expected).not.toBeNull();
    });
});
