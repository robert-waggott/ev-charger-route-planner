import styled from "styled-components";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { FaDirections } from "react-icons/fa";

import { Step } from "../../interfaces/route";

interface AccordionItemProps {
    index: number;
    step: Step;
    onNavigateToStep: (step: Step) => unknown;
}

const StyledNavigateToButton = styled.button`
    border: none;
    height: 42px;
    width: 42px;
    font-size: 23px;
    background: none;
    cursor: pointer;
    float: right;
    margin-top: -15px;
`;

export const AccordionItem = (props: AccordionItemProps) => {
    let name = props.step.title;

    if (!name) {
        if (props.step.summary.length > 25) {
            name = props.step.summary.substring(0, 25) + "...";
        } else {
            name = props.step.summary;
        }
    }

    return (
        <Accordion.Item eventKey={props.index.toString()}>
            <Accordion.Header title={props.step.summary}>
                {props.index + 1}. {name}
            </Accordion.Header>
            <Accordion.Body>
                <Container fluid className="g-0">
                    <Row>
                        <Col sm={10}>{props.step.summary}</Col>
                        <Col sm={2}>
                            <StyledNavigateToButton onClick={() => props.onNavigateToStep(props.step)}>
                                <FaDirections />
                            </StyledNavigateToButton>
                        </Col>
                    </Row>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    );
};
