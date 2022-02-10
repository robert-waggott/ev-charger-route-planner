import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Container, Row } from "react-bootstrap";
import { RouteSearchForm } from "./route-search-form";
import { SelectedChargeDeviceContext } from "../App";

export interface SidebarProps {}

const StyledExpandButton = styled.button`
    border: none;
    z-index: 999;
    position: absolute;
    top: 20px;
    left: 20px;
    height: 42px;
    width: 42px;
    font-size: 19px;
    background: none;
    cursor: pointer;
`;

export const SearchSidebar = (props: SidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)}>
                <FaSearch />
            </StyledExpandButton>

            <Offcanvas show={expanded} placement="start" onHide={() => setExpanded(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <RouteSearchForm onSearchSubmitted={() => setExpanded(false)} />
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export const ChargeDeviceDetailsSidebar = (props: SidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const { chargeDevice } = React.useContext(SelectedChargeDeviceContext);

    React.useEffect(() => {
        if (chargeDevice) {
            setExpanded(true);

            console.log(chargeDevice);
        }
    }, [chargeDevice]);

    return (
        <Offcanvas show={expanded} placement="end" onHide={() => setExpanded(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Charge Device Details</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container fluid className="g-0">
                    <Row className="g-0">
                        <Col>
                            <strong>Name</strong>
                        </Col>
                        <Col>{chargeDevice?.ChargeDeviceName}</Col>
                    </Row>
                    {chargeDevice?.ChargeDeviceLocation?.Address ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Address</strong>
                            </Col>
                            <Col style={{ whiteSpace: "pre-wrap" }}>
                                {chargeDevice?.ChargeDeviceLocation?.Address?.fullAddress}
                            </Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {chargeDevice?.PaymentDetails ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Payment details</strong>
                            </Col>
                            <Col>{chargeDevice?.PaymentDetails}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {chargeDevice?.LocationType ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Type of location</strong>
                            </Col>
                            <Col>{chargeDevice?.LocationType}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    <Row className="g-0">
                        <Col>
                            <strong>Parking fees apply?</strong>
                        </Col>
                        <Col>{chargeDevice?.ParkingFeesFlag ? "Yes" : "No"}</Col>
                    </Row>
                    {chargeDevice?.ParkingFeesDetails ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Parking fee details</strong>
                            </Col>
                            <Col>{chargeDevice?.ParkingFeesDetails}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    <Row className="g-0">
                        <Col>
                            <strong>Accessible 24 hours a day?</strong>
                        </Col>
                        <Col>{chargeDevice?.Accessible24Hours ? "Yes" : "No"}</Col>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
