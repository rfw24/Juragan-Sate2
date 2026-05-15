import { store } from '../core/Store.js';
import { gachaPrizes, equipDatabase } from '../data/items.js'; // Pastikan gachaPrizes di-export dari items.js

export const gachaSystem = {
    rollSateHoki(isTenTimes) {
        const cost = isTenTimes ? 10 : 1;
        const state = store.state;
        
        if ((state.inventory['kupon'] || 0) < cost) return null;
        store.commit('CONSUME_ITEM', { id: 'kupon', qty: cost });
        
        let results = [];
        for(let i = 0; i < cost; i++) {
            let rand = Math.random() * 100;
            let cumulative = 0;
            for (let prize of gachaPrizes) {
                cumulative += prize.chance;
                if (rand <= cumulative) {
                    results.push(prize);
                    store.commit('ADD_ITEM', { id: prize.type, qty: prize.val });
                    break;
                }
            }
        }
        store.commit('SAVE_GAME');
        return results;
    },

    openChest(chestType) {
        const state = store.state;
        if (!store.commit('CONSUME_ITEM', { id: chestType, qty: 1 })) return null;

        // Simulasi logika drop pusaka (Akan diperluas di patch selanjutnya)
        // Saat ini memberikan random drop statis untuk memastikan data flow berjalan
        const isGold = chestType === 'petiEmas';
        const dropChance = isGold ? 100 : 30; // 100% dari Emas, 30% dari Kayu
        
        if (Math.random() * 100 <= dropChance) {
            // Berikan pusaka 'e1' (Peci) sebagai hadiah uji coba
            if (!state.upgrades['e1']) store.commit('ADD_ITEM', { id: 'e1', qty: 1 });
            return { type: 'equip', name: 'Peci Keberuntungan' };
        } else {
            store.commit('ADD_ITEM', { id: 'bijih', qty: 10 });
            return { type: 'item', name: '10 Bijih Besi' };
        }
    }
};
