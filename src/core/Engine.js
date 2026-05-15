import { store } from './Store.js';
import { timeManager } from '../systems/TimeManager.js';
import { canvasRenderer } from './CanvasRenderer.js';

export class GameEngine {
    constructor() {
        this.isRunning = false;
        this.saveTimer = 0;
    }

    start() {
        this.isRunning = true;
        this.loop(performance.now());
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        const dt = (currentTime - timeManager.lastTime) / 1000;
        
        // Update Logika Waktu
        timeManager.update(currentTime);

        // Update Visual Render
        canvasRenderer.render(dt);

        // Sinkronisasi Store ke UI
        store.tick();

        // Sistem Auto-Save setiap 60 detik
        this.saveTimer += dt;
        if (this.saveTimer >= 60) {
            store.commit('SAVE_GAME');
            this.saveTimer = 0;
        }

        requestAnimationFrame((t) => this.loop(t));
    }
}

export const gameEngine = new GameEngine();
