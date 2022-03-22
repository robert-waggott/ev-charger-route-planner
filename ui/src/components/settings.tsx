import React from "react";
import { Modal, Container, Button, Row, Col, Card } from "react-bootstrap";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";
import { TileOption } from "../classes/config";

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

export const SettingsCog = () => {
    const [showSettings, setShowSettings] = React.useState(false);

    return (
        <>
            <StyledSettingsButton onClick={() => setShowSettings(true)}>
                <FaCog />
            </StyledSettingsButton>

            <Modal
                show={showSettings}
                onHide={() => setShowSettings(false)}
                backdrop="static"
                size="lg"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid className="g-0">
                        <Row>
                            {Object.values(TileOption).map((option) => (
                                <Col sm={4}>
                                    <Card>
                                        <Card.Header>{option}</Card.Header>
                                        <Card.Body>
                                            <Card.Text></Card.Text>
                                            <Card.Link href="#">Choose this route</Card.Link>
                                        </Card.Body>
                                    </Card>
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
