import React from "react";
import styled from "styled-components";
import { FaChevronRight, FaRegSave } from "react-icons/fa";
import { Offcanvas, Col, Container, Row, Accordion } from "react-bootstrap";
import moment from "moment";

import { Route } from "../../interfaces/route";
import { SavedRoute } from "../../interfaces/saved-route";
import { DurationBadge, RouteDistanceBadge } from "../route-card/badges";
import { SaveRouteModal } from "./save-route-modal";
import { AccordionItem } from "./accordion-item";

interface RouteDetailsProps {
    selectedRoute: Route | null;
}

const StyledExpandButton = styled.button`
    border: none;
    z-index: 999;
    position: absolute;
    bottom: 20px;
    left: 20px;
    height: 42px;
    width: 42px;
    font-size: 19px;
    background: none;
    cursor: pointer;
`;

const MetadataRow = styled(Row)`
    margin-bottom: 10px;
    border-bottom: solid 1px #40404073;
    padding-bottom: 10px;
`;

const StyledSaveButton = styled.button`
    border: none;
    height: 42px;
    width: 42px;
    font-size: 23px;
    background: none;
    cursor: pointer;
    float: right;
    margin-top: -5px;
`;

export const RouteDetailsSidebar = (props: RouteDetailsProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const [savedRoute, setSavedRoute] = React.useState<SavedRoute | null>(null);

    if (!props.selectedRoute) {
        return <></>;
    }

    const saveRoute = () => {
        setSavedRoute({
            name: props.selectedRoute!.summary,
            savedOn: moment(),
            route: props.selectedRoute!
        });
    };

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)} title="Expand the route details">
                <FaChevronRight />
            </StyledExpandButton>

            <Offcanvas
                show={expanded}
                placement="start"
                scroll={true}
                backdrop={false}
                onHide={() => setExpanded(false)}
            >
                <Offcanvas.Header closeButton>
                    <Container fluid className="g-0">
                        <Row>
                            <Col>
                                <Offcanvas.Title>{props.selectedRoute.summary}</Offcanvas.Title>
                            </Col>
                        </Row>
                        <MetadataRow className="g-0">
                            <Col sm={8}>
                                <RouteDistanceBadge route={props.selectedRoute} />
                                <DurationBadge route={props.selectedRoute} />
                            </Col>
                            <Col sm={4}>
                                <StyledSaveButton onClick={saveRoute}>
                                    <FaRegSave />
                                </StyledSaveButton>
                            </Col>
                        </MetadataRow>
                    </Container>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid className="g-0">
                        <Accordion defaultActiveKey="0">
                            {props.selectedRoute.steps.map((step, index) => {
                                return <AccordionItem index={index} step={step} />;
                            })}
                        </Accordion>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <SaveRouteModal savedRoute={savedRoute} />
        </>
    );
};
