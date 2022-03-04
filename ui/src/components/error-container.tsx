import styled from "styled-components";

interface ErrorContainerProps {
    error?: string;
}

const StyledErrorMessageContainer = styled.div`
    margin-top: 5px;
    color: red;
`;

export const ErrorContainer = (props: ErrorContainerProps) => {
    if (props.error) {
        return <StyledErrorMessageContainer>{props.error}</StyledErrorMessageContainer>;
    }

    return <></>;
};
