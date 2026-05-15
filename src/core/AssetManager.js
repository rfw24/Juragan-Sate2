export const ASSETS = {
    imgs: {}, loaded: false,
    list: [
        { id: 'city_far', src: 'assets/img/city_far.png' }, 
        { id: 'b_mid_1', src: 'assets/img/building_mid_1.png' },
        { id: 'b_mid_2', src: 'assets/img/building_mid_2.png' }, 
        { id: 'b_near', src: 'assets/img/building_near.png' },
        { id: 'b_toko_1', src: 'assets/img/b_toko_1.png' },
        { id: 'b_toko_2', src: 'assets/img/b_toko_2.png' },
        { id: 'b_toko_3', src: 'assets/img/b_toko_3.png' },
        { id: 'b_toko_4', src: 'assets/img/b_toko_4.png' },
        { id: 'sidewalk', src: 'assets/img/bg_sidewalk.png' }, 
        { id: 'road', src: 'assets/img/bg_road.png' },
        { id: 'gerobak', src: 'assets/img/prop_gerobak.png' }, 
        { id: 'prop_lampu', src: 'assets/img/prop_lampu.png' }, 
        { id: 'prop_sun', src: 'assets/img/prop_sun.svg' },   
        { id: 'prop_moon', src: 'assets/img/prop_moon.svg' }, 
        { id: 'juragan_idle', src: 'assets/img/char_juragan_idle_sheet.png' },
        { id: 'juragan_fan', src: 'assets/img/char_juragan_fan.png' }, 
        { id: 'cust_walk', src: 'assets/img/customer_walk.png' },
        { id: 'cust_idle', src: 'assets/img/customer_idle.png' },
        { id: 'icon_coin', src: 'assets/img/icons/icon_coin.png' },
        { id: 'icon_tusuk', src: 'assets/img/icons/icon_tusuk.png' },
        { id: 'icon_jempol', src: 'assets/img/icons/icon_jempol.png' },
        { id: 'item_besek', src: 'assets/img/icons/item_besek.png' }
    ],
    load(onComplete, onProgress) {
        let count = 0; let total = this.list.length;
        if(total === 0) { this.loaded = true; onComplete(); return; }
        this.list.forEach(item => {
            const img = new Image();
            const onloadend = () => { 
                count++; 
                if(onProgress) onProgress(count, total); 
                if(count === total) { this.loaded = true; onComplete(); } 
            };
            img.onload = () => { this.imgs[item.id] = img; onloadend(); };
            img.onerror = () => { 
                console.warn("Aset tidak ditemukan, dilewati:", item.src); 
                this.imgs[item.id] = img; 
                onloadend(); 
            };
            img.src = item.src;
        });
    }
};
