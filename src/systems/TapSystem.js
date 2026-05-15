import { store } from '../core/Store.js';
import { MathService } from '../services/MathService.js'; // PERBAIKAN PATH DI SINI
import { particleManager } from './ParticleSystem.js';
import { gameLogic } from './GameLogic.js';

export class TapSystem {
    constructor() {
        this.expectedSide = 'LEFT';
    }

    process(side, x, y, upgradesDataCache = { alat: [] }) {
        const state = store.state;
        store.commit('SET_TAP_TIME', Date.now() / 1000);

        if (side === this.expectedSide) {
            store.commit('SET_HEAT', state.heat + 0.7);
            state.critChance = Math.min(0.60, (state.critChance || 0) + 0.003);
            
            this.expectedSide = side === 'LEFT' ? 'RIGHT' : 'LEFT';
            store.commit('INCREMENT_COMBO');
        } else {
            store.commit('SET_HEAT', Math.max(0, state.heat - 10));
            state.critChance = 0;
            store.commit('RESET_COMBO');
            if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
        }

        let isCrit = Math.random() < state.critChance;
        let basePower = MathService.getClickPower(state, upgradesDataCache);
        let finalDamage = basePower * (isCrit ? 3.0 : 1.0);

        particleManager.spawn(x, y, `+${Math.floor(finalDamage)}`, isCrit ? "#ffea00" : "#fff", isCrit);
        gameLogic.addSatay(finalDamage, x, y);
    }
}

export const tapSystem = new TapSystem();
