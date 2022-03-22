import React, { MutableRefObject } from "react";
import { Modal, Container, Button, Row, Col, Card } from "react-bootstrap";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";

import { Config, TileOption } from "../classes/config";
import { ConfigContext } from "../App";
import maplibregl from "maplibre-gl";

const StyledSettingsButton = styled.button`
    border: none;
    z-index: 999;
    position: absolute;
    top: 20px;
    right: 20px;
    height: 42px;
    width: 42px;
    font-size: 19px;
    background: none;
    cursor: pointer;
`;

const StyledCard = styled(Card)`
    margin-bottom: 20px;
`;

const MapContainerDiv = styled.div`
    width: 100%;
    height: 150px;
`;

interface TileOptionMapProps {
    tileOption: string;
}

const TileOptionMap = (props: TileOptionMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;

    React.useEffect(() => {
        new maplibregl.Map({
            container: mapContainerRef.current,
            style: config!.buildMapTilerURL(props.tileOption),
            center: [-1.605333, 52.890665],
            zoom: 5
        });
    });

    return <MapContainerDiv ref={mapContainerRef} />;
};

export const SettingsCog = () => {
    const { config, setConfig } = React.useContext(ConfigContext);
    const [showSettings, setShowSettings] = React.useState(false);
    const options = Object.keys(TileOption)
        .map((option) => TileOption[parseInt(option)])
        .filter((option) => option !== undefined);

    const onTileChosen = (option: string) => {
        const tileOption: TileOption = TileOption[option as keyof typeof TileOption];
        const newConfig = new Config();

        newConfig.MapTilerAPIKey = config!.MapTilerAPIKey;
        newConfig.TileOption = tileOption;

        setConfig(newConfig);
        setShowSettings(false);
    };

    return (
        <>
            <StyledSettingsButton onClick={() => setShowSettings(true)}>
                <FaCog />
            </StyledSettingsButton>

            <Modal
                show={showSettings}
                onHide={() => setShowSettings(false)}
                backdrop="static"
                size="xl"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid className="g-0">
                        <Row>
                            {options.map((option, index) => (
                                <Col sm={4}>
                                    <StyledCard>
                                        <Card.Header>{option}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <TileOptionMap key={index} tileOption={option} />
                                            </Card.Text>
                                            <Card.Link href="#" onClick={() => onTileChosen(option)}>
                                                Choose this tile
                                            </Card.Link>
                                        </Card.Body>
                                    </StyledCard>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
