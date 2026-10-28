// G-code travel optimizer for OpenLaser
// 1. Merges consecutive G0 moves
// 2. Simple nearest-neighbor reordering of independent G0 travel segments (low-RAM safe)

export function optimizeGcodeTravel(gcode, onProgress) {
    try {
    if (!gcode || typeof gcode !== 'string') return gcode;

    const lines = gcode.split(/\r?\n/);
    const total = lines.length || 1;
    const result = [];
    let lastG0 = null;
    const CHUNK = 2000;

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

        if (onProgress && i % CHUNK === 0) {
            onProgress(Math.round((i / total) * 50));
        }
    }
    if (lastG0) result.push(lastG0);

    const optimized = nearestNeighborPass(result);
    if (onProgress) onProgress(100);
    return optimized.join('\n');
    } catch (e) {
        console.error('Optimizer error:', e);
        if (onProgress) onProgress(100);
        return gcode;
    }
}

function nearestNeighborPass(lines) {
    const out = [];
    let group = [];
    for (const line of lines) {
        const t = line.trim().toUpperCase();
        if (t.startsWith('G0') || t.startsWith('G00')) {
            group.push(line);
        } else {
            if (group.length > 1 && group.length < 20) {
                out.push(...orderNearest(group));
            } else {
                out.push(...group);
            }
            group = [];
            out.push(line);
        }
    }
    if (group.length) out.push(...group);
    return out;
}

function orderNearest(g0Lines) {
    if (g0Lines.length < 2) return g0Lines;
    const points = g0Lines.map(l => {
        const m = l.match(/X([-\d.]+).*Y([-\d.]+)/i);
        return m ? { line: l, x: parseFloat(m[1]), y: parseFloat(m[2]) } : null;
    }).filter(Boolean);
    if (points.length < 2) return g0Lines;

    const used = new Array(points.length).fill(false);
    const ordered = [points[0]];
    used[0] = true;
    let cx = points[0].x, cy = points[0].y;

    for (let n = 1; n < points.length; n++) {
        let best = -1, bestD = Infinity;
        for (let i = 0; i < points.length; i++) {
            if (used[i]) continue;
            const d = (points[i].x - cx) ** 2 + (points[i].y - cy) ** 2;
            if (d < bestD) { bestD = d; best = i; }
        }
        if (best < 0) break;
        used[best] = true;
        ordered.push(points[best]);
        cx = points[best].x;
        cy = points[best].y;
    }
    return ordered.map(p => p.line);
}

export function smartBurnWhiteCleanup(gcode, maxWhiteLength = 5) {
    if (!gcode || typeof gcode !== 'string') return gcode;
    const lines = gcode.split(/\r?\n/);
    const result = [];
    let whiteRun = [];

    function flushWhite() {
        if (whiteRun.length === 0) return;
        if (whiteRun.length > maxWhiteLength) {
            const last = whiteRun[whiteRun.length - 1];
            const m = last.match(/X([-\d.]+).*Y([-\d.]+)/i);
            if (m) {
                result.push(`G0 X${m[1]} Y${m[2]}`);
            } else {
                result.push(...whiteRun);
            }
        } else {
            result.push(...whiteRun);
        }
        whiteRun = [];
    }

    for (const line of lines) {
        const t = line.trim().toUpperCase();
        const isWhite = t.startsWith('G1') && /S0(\D|$)/.test(t);
        if (isWhite) {
            whiteRun.push(line);
        } else {
            flushWhite();
            result.push(line);
        }
    }
    flushWhite();
    return result.join('\n');
}

export function isOptimizerAvailable() {
    return true;
}
