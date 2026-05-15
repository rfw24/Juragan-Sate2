import { equipDatabase } from '../data/equips.js';

export const MathService = {
    getTargetHP(stage, customerIndex) {
        const absIndex = ((stage - 1) * 20) + customerIndex;
        if (stage <= 50) return Math.floor(10 + (absIndex * 2.5));
        
        const baseHP = 10 + (50 * 20 * 2.5); 
        const stageDiff = stage - 50;
        return Math.floor(baseHP + Math.pow(stageDiff * 20 + customerIndex, 1.6));
    },

    getClickPower(state, upgradesData) {
        let p = 1;
        
        // 1. Hitung Dasar dari Alat (Warung)
        if (upgradesData && upgradesData.alat) {
            upgradesData.alat.forEach((u, i) => {
                let lvl = state.upgrades[u.id] || 0;
                let mastery = lvl >= 300 ? (i === 0 ? 1.1 : i === 1 ? 1.3 : 1.6) : 1;
                p += lvl * u.val * mastery;
            });
        }
        
        // 2. Multiplier dari Level & Review
        let mult = 1 + ((state.stats ? state.stats.power : 0) * 0.01) + ((state.reviewLevel || 0) * 0.01);
        
        // 3. Injeksi Kekuatan Pusaka Aktif (Contoh: Keris Keadilan 'e8')
        state.activeEquips.forEach(eqId => {
            if(!eqId) return;
            let eq = equipDatabase.find(e => e.id === eqId);
            if(eq && eq.id === 'e8') {
                let lvl = state.upgrades[eqId] || 1;
                // Efek Keris: Sate per klik flat + persenan
                p += (eq.base + (lvl * eq.step)); 
            }
        });

        // 4. Bonus Trance
        if (state.isTranceActive) mult *= 1.1; 
        
        return p * mult;
    }
};
