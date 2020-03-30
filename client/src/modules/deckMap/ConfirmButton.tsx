import * as React from 'react';
import { Card } from './../../shared/components/card';

interface Props {
    onClick: () => void;
}

const ConfirmButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Card className="ConfirmButton" onClick={onClick}>
            {"CONFIRM"}
        </Card>
    );
}

export default ConfirmButton;