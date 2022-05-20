import { render, fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import { SavedRoutesTable } from "./save-route-modal";
import { SavedRoute } from "../../interfaces/saved-route";

describe("SavedRoutesTable", () => {
    test("renders nothing when null is passed in against `savedRoutes`", () => {
        const { container } = render(<SavedRoutesTable savedRoutes={null} onReplaceRoute={jest.fn()} />);

        expect(container.childElementCount).toEqual(0);
    });

    test("renders nothing when empty array is passed in against `savedRoutes`", () => {
        const { container } = render(<SavedRoutesTable savedRoutes={[]} onReplaceRoute={jest.fn()} />);

        expect(container.childElementCount).toEqual(0);
    });

    test("renders a <tr /> per passed in savedRoute", () => {
        const savedRoutes: SavedRoute[] = [
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            },
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            },
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            }
        ];
        const { queryAllByRole } = render(<SavedRoutesTable savedRoutes={savedRoutes} onReplaceRoute={jest.fn()} />);

        expect(queryAllByRole("row").length).toEqual(4); // 1 for the header
    });

    test("triggers the onReplaceRoute callback when the replace button is clicked upon", () => {
        const savedRoutes: SavedRoute[] = [
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            },
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            },
            {
                name: faker.datatype.string(),
                savedOn: faker.date.recent(),
                route: {
                    summary: "",
                    durationInMinutes: 0,
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    numberOfSteps: 0,
                    distanceInMeters: 0,
                    distanceInKm: 0,
                    distanceInMiles: 0,
                    steps: []
                }
            }
        ];

        const onReplaceRoute = jest.fn();

        const { queryAllByRole } = render(
            <SavedRoutesTable savedRoutes={savedRoutes} onReplaceRoute={onReplaceRoute} />
        );

        fireEvent.click(queryAllByRole("button")[0]);

        expect(onReplaceRoute).toHaveBeenCalledWith(0);
    });
});
