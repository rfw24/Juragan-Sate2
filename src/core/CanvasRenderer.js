import { store } from './Store.js';
import { particleManager } from '../systems/ParticleSystem.js';

export class CanvasRenderer {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.width = this.canvas.offsetWidth || 480;
        this.ch = this.canvas.height = this.canvas.offsetHeight || 250;
        this.horizon = this.ch * 0.65;
        this.assets = { imgs: {} };

        // Variabel Pelacak Animasi
        this.juraFrame = 0; this.juraTimer = 0;
        this.custFrame = 0; this.custTimer = 0;
        this.custX = this.cw * 0.40;
    }

    init(assets) {
        this.assets = assets;
        // Matikan anti-aliasing agar pixel art tetap tajam
        this.ctx.imageSmoothingEnabled = false; 
    }

    render(dt) {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const state = store.state;

        // 1. Bersihkan Frame
        ctx.clearRect(0, 0, this.cw, this.ch);

        // 2. Gambar Latar Belakang (Langit Malam & Jalanan)
        ctx.fillStyle = "#2b1d15"; 
        ctx.fillRect(0, 0, this.cw, this.horizon);
        
        if (this.assets.imgs.city_far) ctx.drawImage(this.assets.imgs.city_far, 0, this.horizon - (this.ch * 0.55), this.cw, this.ch * 0.55);
        if (this.assets.imgs.sidewalk) ctx.drawImage(this.assets.imgs.sidewalk, 0, this.horizon, this.cw, this.ch * 0.15);
        if (this.assets.imgs.road) ctx.drawImage(this.assets.imgs.road, 0, this.horizon + (this.ch * 0.15), this.cw, this.ch * 0.2);

        // 3. Gambar Pelanggan
        this.drawCustomer(ctx, dt, state);

        // 4. Gambar Juragan & Gerobak
        this.drawJuragan(ctx, dt, state);

        // 5. Gambar Partikel Teks/Koin
        particleManager.updateAndDraw(ctx, dt, this.assets);
    }

    drawJuragan(ctx, dt, state) {
        let jw = 65, jh = 85;
        let jx = this.cw * 0.15, jy = this.horizon - jh + 10;

        if (state.isTranceActive && this.assets.imgs.juragan_fan) {
            let shakeY = Math.sin(Date.now() / 50) * 5;
            ctx.drawImage(this.assets.imgs.juragan_fan, jx, jy + shakeY, jw, jh);
        } else if (this.assets.imgs.juragan_idle) {
            let img = this.assets.imgs.juragan_idle;
            this.juraTimer += dt;
            if (this.juraTimer > 0.15) { this.juraFrame = (this.juraFrame + 1) % 8; this.juraTimer = 0; }
            
            if (img.height > 0) { 
                let frameH = img.height / 8; // Potong gambar secara vertikal
                ctx.drawImage(img, 0, this.juraFrame * frameH, img.width, frameH, jx, jy, jw, jh); 
            }
        }
        if (this.assets.imgs.gerobak) ctx.drawImage(this.assets.imgs.gerobak, jx - 20, jy + 10, 140, 90);
    }

    drawCustomer(ctx, dt, state) {
        // Logika sederhana: Jika transisi, pelanggan berjalan pergi. Jika tidak, pelanggan diam.
        if (state.isTransitioning) {
            this.custX -= dt * 150; // Bergerak ke kiri keluar layar
        } else {
            this.custX = this.cw * 0.40; // Berdiri di depan gerobak
        }

        let img = state.isTransitioning ? this.assets.imgs.cust_walk : this.assets.imgs.cust_idle;
        if (!img || img.width === 0) return;

        let framesCount = state.isTransitioning ? 2 : 8;
        this.custTimer += dt;
        if (this.custTimer > 0.15) { this.custFrame = (this.custFrame + 1) % framesCount; this.custTimer = 0; }

        let frameW = img.width / framesCount; // Potong gambar secara horizontal
        ctx.drawImage(img, this.custFrame * frameW, 0, frameW, img.height, this.custX, this.horizon - 80 + 20, 60, 80);
    }
}

export const canvasRenderer = new CanvasRenderer();
