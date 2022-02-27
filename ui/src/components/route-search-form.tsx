import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";

import { AttributedSearchInput } from "./search-input";
import { ChargeDistanceType, RouteSearch } from "../interfaces/route-search";
import { RouteSearchService } from "../services/route-search-service";
import { Route } from "../interfaces/route";

interface RouteSearchFormProps {
    onSearchSubmitted: (route: Route) => unknown;
}

interface ErrorContainerProps {
    error?: string;
}

const StyledButtonContainer = styled(Form.Group)`
    text-align: right;
    margin-top: 20px;
`;

const StyledErrorMessageContainer = styled.div`
    margin-top: 5px;
    color: red;
`;

const ErrorContainer = (props: ErrorContainerProps) => {
    if (props.error) {
        return <StyledErrorMessageContainer>{props.error}</StyledErrorMessageContainer>;
    }

    return <></>;
};

export const RouteSearchForm = (props: RouteSearchFormProps) => {
    const [routeSearch, setRouteSearch] = React.useState<RouteSearch>({
        from: null,
        to: null,
        chargeDistance: undefined,
        chargeDistanceType: ChargeDistanceType.Miles,
        includeTraffic: true,
        excludeTolls: false,
        excludeMotorways: false,
        excludeFerries: false
    });

    const validate = (values: RouteSearch) => {
        const errors: {
            [key: string]: string;
        } = {};

        if (!values.from) {
            errors.from = "Please select a From value";
        }

        if (!values.to) {
            errors.to = "Please select a To value";
        }

        if (!values.chargeDistance) {
            errors.chargeDistance = "Please enter a Distance";
        }

        return errors;
    };
    const onSubmit = async (values: RouteSearch, { setSubmitting }: FormikHelpers<RouteSearch>) => {
        setRouteSearch(values);

        const route = await new RouteSearchService().performSearch(values);

        props.onSearchSubmitted(route);

        // todo: perform the search or use a reducer to do so?
        setSubmitting(false);
    };

    return (
        <Formik initialValues={routeSearch} validate={validate} onSubmit={onSubmit}>
            {({ values, errors, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                <Form onSubmit={handleSubmit} spellCheck="false">
                    <Form.Group className="mb-3" controlId="from">
                        <Form.Label>From</Form.Label>

                        <AttributedSearchInput
                            id="from"
                            onChange={(locationSearchResult) => setFieldValue("from", locationSearchResult, true)}
                        />
                        <ErrorContainer error={errors.from} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="to">
                        <Form.Label>To</Form.Label>

                        <AttributedSearchInput
                            id="to"
                            onChange={(locationSearchResult) => setFieldValue("to", locationSearchResult, true)}
                        />
                        <ErrorContainer error={errors.to} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <strong>Your Vehicle</strong>
                        </Form.Label>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col xs={8}>
                            <Form.Control
                                id="chargeDistance"
                                name="chargeDistance"
                                type="number"
                                placeholder="Charge Distance / Range"
                                value={values.chargeDistance}
                                onChange={handleChange}
                            />
                            <ErrorContainer error={errors.chargeDistance} />
                        </Col>
                        <Col>
                            <Form.Select
                                id="chargeDistanceType"
                                name="chargeDistanceType"
                                value={values.chargeDistanceType}
                                onChange={handleChange}
                            >
                                <option value={ChargeDistanceType.Miles}>Miles</option>
                                <option value={ChargeDistanceType.Km}>Km</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label>
                            <strong>Advanced Options</strong>
                        </Form.Label>
                    </Form.Group>

                    <Form.Check
                        id="includeTraffic"
                        name="includeTraffic"
                        label="Include Traffic?"
                        checked={values.includeTraffic}
                        onChange={handleChange}
                    />

                    <Form.Check
                        id="excludeTolls"
                        name="excludeTolls"
                        label="Exclude Tolls?"
                        checked={values.excludeTolls}
                        onChange={handleChange}
                    />

                    <Form.Check
                        id="excludeMotorways"
                        name="excludeMotorways"
                        label="Exclude Motorways?"
                        checked={values.excludeMotorways}
                        onChange={handleChange}
                    />

                    <Form.Check
                        id="excludeFerries"
                        name="excludeFerries"
                        label="Exclude Ferries?"
                        checked={values.excludeFerries}
                        onChange={handleChange}
                    />

                    <StyledButtonContainer>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Search
                        </Button>
                    </StyledButtonContainer>
                </Form>
            )}
        </Formik>
    );
};
