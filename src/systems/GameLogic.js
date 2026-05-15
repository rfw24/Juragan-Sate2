import { store } from '../core/Store.js';
import { MathService } from '../services/MathService.js';
import { particleManager } from './ParticleSystem.js';

export const gameLogic = {
    addSatay(amount, tapX, tapY) {
        const state = store.state;
        if (state.isTransitioning) return;

        store.commit('ADD_SATAY', amount);

        let targetHP = MathService.getTargetHP(state.stage, state.customerIndex);
        
        if (state.currentSatay >= targetHP) {
            this.processCustomerSuccess(targetHP, x, y);
        }
    },

    processCustomerSuccess(targetHP, x, y) {
        const state = store.state;
        state.isTransitioning = true; 

        state.currentSatay = targetHP; 

        let moneyReward = targetHP * 2; 
        if (state.customerIndex === 20) moneyReward *= 5; // Bonus Koin VIP
        
        let expReward = Math.floor(500 * Math.pow(1.05, state.stage - 1));
        
        store.commit('ADD_MONEY', moneyReward);
        
        particleManager.spawn(x, y - 50, `+${moneyReward}`, "#00e676", false, 'icon_coin');
        particleManager.spawn(x, y - 80, `+${expReward} EXP`, "#42a5f5", false);

        if (Math.random() < 0.05) {
            store.commit('ADD_ITEM', { id: 'besek', qty: 1 });
            particleManager.spawn(x + 30, y - 60, "+1", "#ffca28", true, 'item_besek');
        }

        setTimeout(() => {
            state.currentSatay = 0;
            
            const isAutoVip = document.getElementById('chk-auto-vip')?.checked;
            
            if (state.customerIndex < 19) {
                // Pelanggan Biasa
                state.customerIndex++;
                state.isTransitioning = false;
                store.flags.add('STAGE_CHANGED');
            } else if (state.customerIndex === 19) {
                // Menunggu VIP
                if (isAutoVip) {
                    state.customerIndex = 20;
                    state.isTransitioning = false;
                    store.flags.add('STAGE_CHANGED');
                } else {
                    store.flags.add('SHOW_VIP_BTN');
                }
            } else {
                // VIP Dikalahkan, Lanjut Stage
                state.stage++;
                state.customerIndex = 1;
                state.isTransitioning = false;
                store.flags.add('STAGE_CHANGED');
            }
        }, 200);
    },

    summonVip() {
        const state = store.state;
        state.customerIndex = 20;
        state.isTransitioning = false;
        store.flags.add('STAGE_CHANGED');
    }
};
