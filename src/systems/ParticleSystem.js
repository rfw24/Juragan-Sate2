export class Particle {
    constructor(x, y, text, color, isCrit, iconId = null) {
        this.x = x; this.y = y;
        this.text = text; this.color = color;
        this.isCrit = isCrit; this.iconId = iconId;
        this.life = 1.0; 
        this.vy = -80; // Kecepatan naik
        this.vx = (Math.random() * 40 - 20); // Sedikit miring
    }

    update(dt) {
        this.y += this.vy * dt;
        this.x += this.vx * dt;
        this.life -= dt * 1.5; // Hilang dalam ~0.6 detik
    }

    draw(ctx, assets) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.font = this.isCrit ? 'bold 24px Bangers' : '18px Bangers';
        ctx.textAlign = 'center';
        
        // Render Ikon jika ada (misal koin/besek)
        if (this.iconId && assets.imgs[this.iconId]) {
            ctx.drawImage(assets.imgs[this.iconId], this.x - 40, this.y - 20, 20, 20);
        }
        
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

export class ParticleManager {
    constructor() {
        this.particles = [];
    }

    spawn(x, y, text, color, isCrit, iconId) {
        if (this.particles.length > 50) this.particles.shift(); // Batasi maksimal partikel
        this.particles.push(new Particle(x, y, text, color, isCrit, iconId));
    }

    updateAndDraw(ctx, dt, assets) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(dt);
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            } else {
                this.particles[i].draw(ctx, assets);
            }
        }
    }
}

export const particleManager = new ParticleManager();
