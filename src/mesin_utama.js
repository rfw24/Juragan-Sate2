import { store } from './core/Store.js';
import { gameEngine } from './core/Engine.js';
import { canvasRenderer } from './core/CanvasRenderer.js';
import { uiManager } from './ui/UIManager.js';
import { inputHandler } from './ui/InputHandler.js';
import { ASSETS } from './core/AssetManager.js'; 

const initGame = () => {
    const loadingText = document.getElementById('loading-text');
    const loadingBar = document.getElementById('loading-bar-fill');

    console.log("Inisialisasi Game Dimulai...");

    ASSETS.load(
        () => {
            console.log("Aset siap, menyalakan mesin...");
            canvasRenderer.init(ASSETS);

            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.style.opacity = '0';
                setTimeout(() => splash.remove(), 500);
            }

            gameEngine.start();
            store.commit('SAVE_GAME'); 
        },
        (loaded, total) => {
            let pct = Math.floor((loaded / total) * 100);
            if (loadingBar) loadingBar.style.width = pct + '%';
            if (loadingText) loadingText.innerText = `Memanaskan Arang... ${pct}%`;
        }
    );
};

// ==========================================
// FIX: SMART BOOTSTRAPPER (ANTI STUCK)
// ==========================================
if (document.readyState === 'loading') {
    // Jika HTML masih diproses, tunggu.
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    // Jika HTML sudah terlanjur selesai (karena module delay), eksekusi instan!
    initGame();
}

// Penanganan Background (Agar baterai hemat & tidak ngelag saat dibuka lagi)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        store.commit('SAVE_GAME');
    }
});
