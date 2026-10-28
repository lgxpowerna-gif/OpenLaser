// G-code travel optimizer for OpenLaser
// Merges consecutive G0 moves. Reports real progress via optional callback.

export function optimizeGcodeTravel(gcode, onProgress) {
    if (!gcode || typeof gcode !== 'string') return gcode;

    const lines = gcode.split(/\r?\n/);
    const total = lines.length || 1;
    const result = [];
    let lastG0 = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('(')) {
            if (lastG0) {
                result.push(lastG0);
                lastG0 = null;
            }
            result.push(line);
        } else {
            const upper = trimmed.toUpperCase();
            if (upper.startsWith('G0') || upper.startsWith('G00')) {
                lastG0 = line;
            } else {
                if (lastG0) {
                    result.push(lastG0);
                    lastG0 = null;
                }
                result.push(line);
            }
        }

        // Report real progress every ~2% or on last line
        if (onProgress && (i % Math.max(1, Math.floor(total / 50)) === 0 || i === total - 1)) {
            onProgress(Math.round(((i + 1) / total) * 100));
        }
    }

    if (lastG0) result.push(lastG0);

    if (onProgress) onProgress(100);
    return result.join('\n');
}

export function isOptimizerAvailable() {
    return true;
}
