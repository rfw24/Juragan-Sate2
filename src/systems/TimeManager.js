import { store } from '../core/Store.js';
import { upgradesData } from '../data/upgrades.js';
import { eventBus } from '../core/EventBus.js';

export class TimeManager {
    constructor() {
        this.lastTime = performance.now();
        this.accumulatedTime = 0;
        this.offlineProcessed = false;
    }

    update(currentTime) {
        if (!this.offlineProcessed) {
            this.processOffline();
            this.offlineProcessed = true;
        }

        let dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        if (dt > 0.1) dt = 0.1;

        this.accumulatedTime += dt;
        if (this.accumulatedTime >= 0.1) {
            this.processTick(0.1);
            this.accumulatedTime -= 0.1;
        }
    }

    processOffline() {
        const state = store.state;
        const now = Date.now();
        let offlineSecs = Math.floor((now - state.lastSeen) / 1000);
        
        if (offlineSecs > 86400) offlineSecs = 86400;

        let sps = this.getSatayPerSecond(state);
        eventBus.emit('SPS_CHANGED', sps);

        if (offlineSecs > 60 && sps > 0) {
            let earned = sps * offlineSecs;
            let moneyEarned = earned * 2; 
            let expEarned = Math.floor(earned * 0.5);
            
            store.commit('ADD_MONEY', moneyEarned);
            eventBus.emit('SHOW_OFFLINE', { time: offlineSecs, money: moneyEarned, exp: expEarned });
        }
        store.commit('SAVE_GAME');
    }

    getSatayPerSecond(state) {
        let sps = 0;
        if (upgradesData && upgradesData.sdm) {
            upgradesData.sdm.forEach(u => {
                let lvl = state.upgrades[u.id] || 0;
                sps += lvl * u.val;
            });
        }
        return sps;
    }

    processTick(tickDelta) {
        const state = store.state;

        let sps = this.getSatayPerSecond(state);
        if (sps > 0) {
            store.commit('ADD_MONEY', sps * 2 * tickDelta); 
        }

        if (state.heat > 0) {
            let heatDecay = 0.1;
            let minHeat = state.activeEquips.includes('e9') ? 80 : 0; 
            if (state.heat > minHeat) {
                store.commit('SET_HEAT', Math.max(minHeat, state.heat - heatDecay));
            }
        }

        if (state.buffs.cat777 > 0) store.commit('UPDATE_BUFF', { id: 'cat777', val: state.buffs.cat777 - 1 });
        if (state.buffs.fly100x > 0) store.commit('UPDATE_BUFF', { id: 'fly100x', val: state.buffs.fly100x - 1 });
        if (state.buffs.jamu > 0) store.commit('UPDATE_BUFF', { id: 'jamu', val: state.buffs.jamu - 1 });
        
        let nowSec = Date.now() / 1000;
        if (nowSec - state.lastTapTime > 1.0 && state.combo > 0) {
            store.commit('RESET_COMBO');
        }
    }
}

export const timeManager = new TimeManager();
