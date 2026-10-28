import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const PRESETS = [
    {
        name: 'Fine Detail',
        laserDiameter: 0.1,
        shadesOfGray: 16,
        overScan: 2,
        dithering: true,
    },
    {
        name: 'Standard',
        laserDiameter: 0.2,
        shadesOfGray: 8,
        overScan: 1,
        dithering: false,
    },
    {
        name: 'Fast Draft',
        laserDiameter: 0.3,
        shadesOfGray: 4,
        overScan: 0,
        dithering: false,
    },
];

export function EngravingPresets({ onApply }) {
    return (
        <div style={{ margin: '4px 0' }}>
            <DropdownButton
                bsSize="xs"
                bsStyle="info"
                title="Engraving Quality"
                id="engraving-preset-dropdown"
            >
                {PRESETS.map(p => (
                    <MenuItem key={p.name} onClick={() => onApply(p)}>
                        {p.name}
                    </MenuItem>
                ))}
            </DropdownButton>
        </div>
    );
}

export default EngravingPresets;
