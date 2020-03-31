import * as React from 'react';
import { Card } from '../../../shared/components/card';
import './ConfirmButton.scss';

interface Props {
    onClick: () => void;
}

export const ConfirmButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Card className="ConfirmButton" onClick={onClick}>
            {"CONFIRM"}
        </Card>
    );
}

export default ConfirmButton;