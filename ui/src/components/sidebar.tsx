import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { SearchInput } from "./search-input";

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

const StyledButtonContainer = styled(Form.Group)`
    text-align: right;
    margin-top: 20px;
`;

export const Sidebar = (props: SidebarProps) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    // todo: use react-bootstrap-typeahead for from and to
    // todo: use formik
    return (
        <>
            <StyledExpandButton onClick={() => setExpanded(true)}>
                <FaSearch />
            </StyledExpandButton>

            <Offcanvas show={expanded} onHide={() => setExpanded(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="from">
                                <Form.Label>From</Form.Label>
                                <SearchInput id="from" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="to">
                                <Form.Label>To</Form.Label>
                                <SearchInput id="to" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    <strong>Advanced Options</strong>
                                </Form.Label>
                            </Form.Group>

                            <Form.Check
                                id="exclude-tolls"
                                label="Exclude Tolls?"
                            />

                            <Form.Check
                                id="exclude-motorways"
                                label="Exclude Motorways?"
                            />

                            <Form.Check
                                id="exclude-ferrys"
                                label="Exclude Ferrys?"
                            />

                            <StyledButtonContainer>
                                <Button variant="primary" type="submit">
                                    Search
                                </Button>
                            </StyledButtonContainer>
                        </Form>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};