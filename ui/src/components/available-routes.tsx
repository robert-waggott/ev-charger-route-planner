import React, { MutableRefObject } from "react";
import { Modal } from "react-bootstrap";
import { Route } from "../interfaces/route";

interface PossibleRoutesModalProps {
    possibleRoutes: Route[] | null;
}

export const AvailableRoutesModal = (props: PossibleRoutesModalProps) => {
    const [show, setShow] = React.useState(false);

    // const { config } = React.useContext(ConfigContext);
    // const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    // const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    // React.useEffect(() => {
    //     if (config) {
    //         mapRef.current = new maplibregl.Map({
    //             container: mapContainerRef.current,
    //             style: `https://api.maptiler.com/maps/streets/style.json?key=${config?.MapTilerAPIKey}`,
    //             center: [-1.631291, 52.48278],
    //             zoom: 4
    //         });
    //     }
    // }, [config]);

    React.useEffect(() => {
        setShow(props.possibleRoutes ? true : false);
    }, [props.possibleRoutes]);

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Available Routes</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
        </Modal>
    );
};
