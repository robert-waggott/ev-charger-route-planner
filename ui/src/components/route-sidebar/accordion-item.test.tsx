import { render, fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import { AccordionItem, AccordionItemProps } from "./accordion-item";
import { Step } from "../../interfaces/route";

const buildAccordionItemProps = (summary: string, index = 0) => {
    const step: Step = {
        title: null,
        summary: summary,
        location: {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        },
        geometry: {
            type: "LineString",
            coordinates: []
        },
        durationInMinutes: 0,
        distanceInKm: 0,
        distanceInMile: 0
    };

    const props: AccordionItemProps = {
        index: index,
        step: step,
        onNavigateToStep: jest.fn()
    };

    return props;
};

describe("AccordionItem", () => {
    test("renders the expected header when the step summary is less than 25 chars long", () => {
        const { index, step, onNavigateToStep } = buildAccordionItemProps(faker.datatype.string(24));
        const { queryByText } = render(<AccordionItem index={index} step={step} onNavigateToStep={onNavigateToStep} />);

        const expected = queryByText(`1. ${step.summary}`, { exact: false });

        expect(expected).not.toBeNull();
    });

    test("renders the expected header when the step summary is longer than 24 chars", () => {
        const { index, step, onNavigateToStep } = buildAccordionItemProps(faker.datatype.string(28), 2);
        const { queryByText } = render(<AccordionItem index={index} step={step} onNavigateToStep={onNavigateToStep} />);

        const expected = queryByText(`3. ${step.summary.substring(0, 25) + "..."}`, { exact: false });

        expect(expected).not.toBeNull();
    });

    test("renders the full summary within the expanded accordion item", () => {
        const { index, step, onNavigateToStep } = buildAccordionItemProps(faker.datatype.string(30), 2);
        const { getAllByRole } = render(
            <AccordionItem index={index} step={step} onNavigateToStep={onNavigateToStep} />
        );

        fireEvent.click(getAllByRole("button")[1]);

        expect(onNavigateToStep).toHaveBeenCalled();
    });
});
