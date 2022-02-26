import React from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Container, Row } from "react-bootstrap";

import { SelectedChargeDeviceContext } from "../App";
import { ChargeDevice } from "../interfaces/charge-points-response";

const MapContainerDiv = styled.div`
    width: 100%;
    height: 300px;
`;

interface ChargeDeviceDetailsMapProps {
    ChargeDevice: ChargeDevice | null;
}

export const ChargeDeviceDetailsMap = (props: ChargeDeviceDetailsMapProps) => {
    const chargeDeviceLocation = props.ChargeDevice?.ChargeDeviceLocation;

    if (!chargeDeviceLocation || !chargeDeviceLocation.Latitude || !chargeDeviceLocation.Longitude) {
        return <></>;
    }

    return (
        <Row className="g-0">
            <Col>
                <MapContainerDiv />
            </Col>
        </Row>
    );
};

export const ChargeDeviceDetailsSidebar = () => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const { chargeDevice } = React.useContext(SelectedChargeDeviceContext);

    React.useEffect(() => {
        if (chargeDevice) {
            setExpanded(true);
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

                    <ChargeDeviceDetailsMap ChargeDevice={chargeDevice} />
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
