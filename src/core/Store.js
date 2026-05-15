import { eventBus } from './EventBus.js';
import { StorageManager } from './StorageManager.js';

const initialState = {
    money: 0, diamonds: 0, currentSatay: 0, customerIndex: 1, stage: 1,
    heat: 0, combo: 0, lastTapTime: 0, isTranceActive: false,
    lastSeen: Date.now(),
    inventory: { besek: 0, tusuk: 0, kupon: 0, jempol: 0 },
    upgrades: {}, stats: { power: 0, price: 0, viral: 0 },
    activeEquips: [null, null],
    buffs: { jamu: 0, cat777: 0, fly100x: 0 },
    reviewLevel: 0,
    settings: { bgm: 0.5, sfx: 0.8, bgmOn: true } // Fitur Baru: Pengaturan
};

export class Store {
    constructor() {
        const savedData = StorageManager.load();
        this.state = savedData ? { ...initialState, ...savedData } : { ...initialState };
        if (savedData && savedData.inventory) this.state.inventory = { ...initialState.inventory, ...savedData.inventory };
        if (savedData && savedData.upgrades) this.state.upgrades = { ...savedData.upgrades };
        if (savedData && savedData.activeEquips) this.state.activeEquips = [...savedData.activeEquips];
        if (savedData && savedData.buffs) this.state.buffs = { ...initialState.buffs, ...savedData.buffs };
        if (savedData && savedData.settings) this.state.settings = { ...initialState.settings, ...savedData.settings };

        this.flags = new Set();
    }

    commit(action, payload) {
        switch(action) {
            case 'ADD_MONEY':
                this.state.money += payload;
                this.flags.add('MONEY_CHANGED');
                break;
            case 'ADD_DIAMOND':
                this.state.diamonds += payload;
                this.flags.add('DIAMOND_CHANGED');
                break;
            case 'ADD_SATAY':
                this.state.currentSatay += payload;
                this.flags.add('SATAY_CHANGED');
                break;
            case 'SET_HEAT':
                this.state.heat = Math.max(0, Math.min(100, payload));
                this.flags.add('HEAT_CHANGED');
                break;
            case 'INCREMENT_COMBO':
                this.state.combo++;
                this.state.lastTapTime = Date.now() / 1000;
                if (this.state.combo >= 100) this.state.isTranceActive = true;
                this.flags.add('COMBO_CHANGED');
                break;
            case 'RESET_COMBO':
                this.state.combo = 0;
                this.state.isTranceActive = false;
                this.flags.add('COMBO_CHANGED');
                break;
            case 'UPGRADE_ITEM':
                if (this.state.money >= payload.cost) {
                    this.state.money -= payload.cost;
                    this.state.upgrades[payload.id] = (this.state.upgrades[payload.id] || 0) + 1;
                    this.flags.add('MONEY_CHANGED');
                    this.flags.add('UPGRADE_CHANGED');
                }
                break;
            case 'TOGGLE_EQUIP':
                const activeIdx = this.state.activeEquips.indexOf(payload);
                if (activeIdx > -1) {
                    this.state.activeEquips[activeIdx] = null; 
                } else {
                    const emptyIdx = this.state.activeEquips.indexOf(null);
                    if (emptyIdx > -1) this.state.activeEquips[emptyIdx] = payload; 
                    else this.state.activeEquips[0] = payload; 
                }
                this.flags.add('EQUIP_CHANGED');
                break;
            case 'ADD_ITEM':
                this.state.inventory[payload.id] = (this.state.inventory[payload.id] || 0) + payload.qty;
                this.flags.add('INVENTORY_CHANGED');
                break;
            case 'CONSUME_ITEM':
                if (this.state.inventory[payload.id] >= payload.qty) {
                    this.state.inventory[payload.id] -= payload.qty;
                    this.flags.add('INVENTORY_CHANGED');
                    return true;
                }
                return false;
            case 'UPGRADE_REVIEW':
                if (this.state.inventory['jempol'] >= payload) {
                    this.state.inventory['jempol'] -= payload;
                    this.state.reviewLevel += 1;
                    this.flags.add('INVENTORY_CHANGED');
                    this.flags.add('REVIEW_CHANGED');
                }
                break;
            case 'UPDATE_SETTINGS':
                this.state.settings = { ...this.state.settings, ...payload };
                this.flags.add('SETTINGS_CHANGED');
                break;
            case 'SET_STAGE':
                this.state.stage = payload;
                this.state.customerIndex = 1;
                this.state.currentSatay = 0;
                this.state.isTransitioning = false;
                this.flags.add('STAGE_CHANGED');
                break;
            case 'SAVE_GAME':
                this.state.lastSeen = Date.now();
                StorageManager.save(this.state);
                break;
        }
    }

    tick() {
        if (this.flags.size === 0) return;
        this.flags.forEach(flag => eventBus.emit(flag, this.state));
        this.flags.clear();
    }
}

export const store = new Store();
