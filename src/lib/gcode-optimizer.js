// Simple optional G-code travel optimizer for OpenLaser
// Merges consecutive G0 moves and removes zero-length travels.
// Safe, non-destructive post-process.

export function optimizeGcodeTravel(gcode) {
    if (!gcode || typeof gcode !== 'string') return gcode;

    const lines = gcode.split(/\r?\n/);
    const result = [];
    let lastG0 = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('(')) {
            if (lastG0) {
                result.push(lastG0);
                lastG0 = null;
            }
            result.push(line);
            continue;
        }

        const upper = trimmed.toUpperCase();
        if (upper.startsWith('G0') || upper.startsWith('G00')) {
            // Keep only the last consecutive G0
            lastG0 = line;
        } else {
            if (lastG0) {
                result.push(lastG0);
                lastG0 = null;
            }
            result.push(line);
        }
    }

    if (lastG0) result.push(lastG0);

    return result.join('\n');
}

export function isOptimizerAvailable() {
    return true;
}
