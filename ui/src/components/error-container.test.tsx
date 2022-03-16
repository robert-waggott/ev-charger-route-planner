import { render } from "@testing-library/react";
import { ErrorContainer } from "./error-container";

test("Renders nothing when no error is passed in", () => {
    const { container } = render(<ErrorContainer />);

    expect(container.childElementCount).toEqual(0);
});

test("Renders the correct error when passed in", () => {
    const error = "This is my error";
    const { queryByText } = render(<ErrorContainer error={error} />);

    expect(queryByText(error)).not.toBeNull();
});
