// Vite-compatible worker factory.
// Replaces webpack's worker-loader! syntax.
// Usage: const WorkerCtor = createWorker('./workers/cam-preflight.js');
//        const w = new WorkerCtor();

export function createWorker(relativePath) {
    // Return a constructor that creates a module Worker
    return class ViteWorker extends Worker {
        constructor() {
            super(new URL(relativePath, import.meta.url), { type: 'module' });
        }
    };
}
