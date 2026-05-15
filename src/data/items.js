export const itemDatabase = {
    besek: { title: "Besek Misterius", icon: "assets/img/icons/item_besek.png", lore: "Paket misterius bikin deg-degan mampus.", source: "Muncul tiba-tiba dari pelanggan misterius", usage: "Buka sekarang! Bisa dapat Koin, Serpihan, bahkan Berlian asli!" },
    besekDaurUlang: { title: "Besek Daur Ulang", icon: "assets/img/icons/item_daur.png", lore: "Hasil mulung berbuah cuan dadakan.", source: "Tukar 100 Tusuk Sate — jangan dibuang ke got!", usage: "Isinya Berlian murni! Lebih bersih dari sumur tetangga." },
    serpihan: { title: "Serpihan Gacha", icon: "assets/img/icons/item_serpihan.png", lore: "Sobekan gacha pelipur lara bos.", source: "Robekan dari Besek Misterius yang dibuka", usage: "Kumpulkan 10 → tukar 1 Kupon Undian. Tabungan receh itu nyata!" },
    kupon: { title: "Kupon Undian", icon: "assets/img/icons/item_kupon.png", lore: "Jalur ordal buat gacha elit.", source: "Gabungkan 10 Serpihan atau menang Jackpot", usage: "1 Kupon = 1 putaran Roda Sate Hoki. Semoga hoki, Juragan!" },
    petiKayu: { title: "Peti Pusaka Biasa", icon: "assets/img/icons/item_peti_kayu.png", lore: "Peti loak tapi isinya lumayan.", source: "Roda Undian Sate Hoki atau beli di Sha-Tee", usage: "Isinya Pusaka Biasa atau Langka. Dapat duplikat? Auto jadi Bijih!" },
    petiEmas: { title: "Peti Pusaka Emas", icon: "assets/img/icons/item_peti_emas.png", lore: "Peti silau idaman warga +62.", source: "Hadiah Sultan atau dari Roda Undian", usage: "PASTI berisi Pusaka Epik atau Legenda. Buka aja, Juragan!" },
    bijih: { title: "Bijih Besi Murni", icon: "assets/img/icons/item_bijih.png", lore: "Rongsokan besi peningkat kasta pusaka.", source: "Otomatis dapat saat Pusaka dobel masuk peti", usage: "Tempa Pusaka yang udah punya jadi makin kuat! Nabung bijih itu bijak." },
    jamu: { title: "Voucher Jamu", icon: "assets/img/icons/item_voucher_jamu.png", lore: "Voucher diskon doping legal.", source: "Beli di Toko Sha-Tee atau Gacha", usage: "Ditukar di aplikasi Go-Jamu jadi Jamu siap minum (+2 EXP Go-Jamu)." },
    jamuKonsumsi: { title: "Jamu Gendong", icon: "assets/img/icons/item_jamu.png", lore: "Doping legal rasa pait mampus.", source: "Beli dari aplikasi Go-Jamu", usage: "Diminum langsung buat naikin Power x2 & Crit x5!" },
    mysteryBox: { title: "Mystery Box", icon: "assets/img/icons/item_mystery_box.png", lore: "Gacha sultan anti ampas club.", source: "Beli pakai Berlian di Toko Sha-Tee", usage: "Buka 1 kotak, dapat 2-3 item mewah sekaligus! Ini namanya sultan move." },
    koin: { title: "Koin Emas", icon: "assets/img/icons/icon_coin.png", lore: "Cuan receh hasil keringat sendiri.", source: "Dapat setiap kali pelanggan selesai dilayani", usage: "Belanjakan untuk Alat, Resep, dan Pegawai baru. Putar terus!" },
    berlian: { title: "Berlian Murni", icon: "assets/img/icons/icon_diamond.png", lore: "Permata sultan idaman emak-emak arisan.", source: "Dari Besek / Sultan / Jackpot Undian", usage: "Belanja di Sha-Tee: Jamu stamina, Mystery Box, atau Peti Emas!" },
    tusuk: { title: "Tusuk Sate Bekas", icon: "assets/img/icons/icon_tusuk.png", lore: "Sampah sate pembawa berkah terselubung.", source: "Jatuh sendiri saat pelanggan pergi — pungut!", usage: "Kumpul 100 batang, tukar jadi 1 Besek Daur Ulang yang penuh berkah." },
    jempol: { title: "Jempol Pelanggan", icon: "assets/img/icons/icon_jempol.png", lore: "Jempol netizen penentu nasib warung.", source: "Diberikan pelanggan yang berhasil Juragan layani", usage: "Kumpulkan buat naikin Rating Warung. Makin bintang, makin sultan!" }
};

export const gachaPrizes = [
    { name: "20 Bijih", type: "bijih", val: 20, chance: 30 },
    { name: "15 Besek", type: "besek", val: 15, chance: 24 },
    { name: "30 Berlian", type: "diamonds", val: 30, chance: 15 },
    { name: "3 Besek Daur Ulang", type: "besekDaurUlang", val: 3, chance: 10 },
    { name: "3 Jamu", type: "jamu", val: 3, chance: 10 },
    { name: "3 Peti Pusaka Biasa", type: "petiKayu", val: 3, chance: 8 },
    { name: "1 Peti Pusaka Emas", type: "petiEmas", val: 1, chance: 2 },
    { name: "3000 Berlian!", type: "diamonds", val: 3000, chance: 1 }
];

export const reviewNames = ["Budi", "Siti", "Agus", "Ayu", "Joko", "Rina", "Hendro", "Maya"];
export const reviewTexts = ["Satenya mantap!", "Bumbu kacangnya kental.", "Dagingnya empuk banget.", "Pasti balik lagi kesini.", "Porsinya bikin kenyang.", "Juara satu di kota ini!", "Harganya murah tapi rasa bintang lima.", "Gak pelit bumbu!"];
