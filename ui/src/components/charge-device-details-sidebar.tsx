import React, { MutableRefObject } from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Container, Row } from "react-bootstrap";
import maplibregl from "maplibre-gl";

import { ChargeDevice } from "../interfaces/charge-points-response";
import { ConfigContext } from "../App";

const MapContainerDiv = styled.div`
    width: 100%;
    height: 300px;
`;

interface ChargeDeviceDetailsSidebarProps {
    chargeDevice: ChargeDevice | null;
}

interface ChargeDeviceDetailsMapProps {
    chargeDevice: ChargeDevice | null;
}

export const ChargeDeviceDetailsMap = (props: ChargeDeviceDetailsMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;

    const chargeDeviceLocation = props.chargeDevice?.ChargeDeviceLocation;

    React.useEffect(() => {
        if (config && chargeDeviceLocation) {
            const map = new maplibregl.Map({
                container: mapContainerRef.current,
                style: config.mapTilerURL,
                center: [chargeDeviceLocation!.Longitude, chargeDeviceLocation!.Latitude],
                zoom: 15
            });

            new maplibregl.Marker()
                .setLngLat([chargeDeviceLocation!.Longitude, chargeDeviceLocation!.Latitude])
                .addTo(map);
        }
    }, [config, chargeDeviceLocation]);

    if (!chargeDeviceLocation || !chargeDeviceLocation.Latitude || !chargeDeviceLocation.Longitude) {
        return <></>;
    }

    return (
        <Row className="g-0">
            <Col>
                <MapContainerDiv ref={mapContainerRef} />
            </Col>
        </Row>
    );
};

export const ChargeDeviceDetailsSidebar = (props: ChargeDeviceDetailsSidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    React.useMemo(() => {
        if (props.chargeDevice) {
            setExpanded(true);
        }
    }, [props.chargeDevice]);

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
                        <Col>{props.chargeDevice?.ChargeDeviceName}</Col>
                    </Row>
                    {props.chargeDevice?.ChargeDeviceLocation?.Address ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Address</strong>
                            </Col>
                            <Col style={{ whiteSpace: "pre-wrap" }}>
                                {props.chargeDevice?.ChargeDeviceLocation?.Address?.fullAddress}
                            </Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {props.chargeDevice?.PaymentDetails ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Payment details</strong>
                            </Col>
                            <Col>{props.chargeDevice?.PaymentDetails}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {props.chargeDevice?.LocationType ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Type of location</strong>
                            </Col>
                            <Col>{props.chargeDevice?.LocationType}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    <Row className="g-0">
                        <Col>
                            <strong>Parking fees apply?</strong>
                        </Col>
                        <Col>{props.chargeDevice?.ParkingFeesFlag ? "Yes" : "No"}</Col>
                    </Row>
                    {props.chargeDevice?.ParkingFeesDetails ? (
                        <Row className="g-0">
                            <Col>
                                <strong>Parking fee details</strong>
                            </Col>
                            <Col>{props.chargeDevice?.ParkingFeesDetails}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    <Row className="g-0">
                        <Col>
                            <strong>Accessible 24 hours a day?</strong>
                        </Col>
                        <Col>{props.chargeDevice?.Accessible24Hours ? "Yes" : "No"}</Col>
                    </Row>

                    <ChargeDeviceDetailsMap chargeDevice={props.chargeDevice} />
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
