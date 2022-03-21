import React from "react";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";

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
        <StyledSettingsButton onClick={() => setShowSettings(true)}>
            <FaCog />
        </StyledSettingsButton>
    );
};

interface SettingsModalProps {
    show: boolean;
}

const SettingsModal = (props: SettingsModalProps) => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setShow(props.show);
    }, [props.show]);
};
