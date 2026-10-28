import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const PRESETS = [
    { name: 'Plywood 3mm', laserPower: 70, cutRate: 1000 },
    { name: 'Acrylic 3mm', laserPower: 50, cutRate: 750 },
    { name: 'Cardboard', laserPower: 30, cutRate: 2000 },
    { name: 'Leather', laserPower: 40, cutRate: 1000 },
    { name: 'Baltic Birch 3mm', laserPower: 80, cutRate: 800 },
    { name: 'MDF 3mm', laserPower: 60, cutRate: 900 },
];

export function MaterialPresets({ onApply }) {
    return (
        <div style={{ margin: '6px 0' }}>
            <DropdownButton
                bsSize="xs"
                bsStyle="default"
                title="Material Preset"
                id="material-preset-dropdown"
            >
                {PRESETS.map(p => (
                    <MenuItem
                        key={p.name}
                        onClick={() => onApply(p)}
                    >
                        {p.name} ({p.laserPower}% @ {p.cutRate} mm/min)
                    </MenuItem>
                ))}
            </DropdownButton>
        </div>
    );
}

export default MaterialPresets;
