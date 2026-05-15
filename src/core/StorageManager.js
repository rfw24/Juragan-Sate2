const SAVE_KEY = 'juragan_sate_pro_save';
const VERSION = '2.0.0';

export const StorageManager = {
    // Menyimpan data dengan format terbungkus Base64
    save(state) {
        const data = {
            v: VERSION,
            ts: Date.now(),
            payload: state
        };
        try {
            // Encode ke Base64 sebagai proteksi dasar
            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            localStorage.setItem(SAVE_KEY, encoded);
        } catch (e) {
            console.error("Gagal menyimpan data:", e);
        }
    },

    // Memuat data dan membedah format Base64
    load() {
        const saved = localStorage.getItem(SAVE_KEY);
        if (!saved) return null;

        try {
            const decoded = JSON.parse(decodeURIComponent(escape(atob(saved))));
            console.log(`Memuat Save Data v${decoded.v} - Terakhir dimainkan: ${new Date(decoded.ts).toLocaleString()}`);
            return decoded.payload;
        } catch (e) {
            console.warn("Format save data tidak dikenali atau korup.", e);
            return null;
        }
    },

    // Menghapus data jika diperlukan reset total
    clear() {
        localStorage.removeItem(SAVE_KEY);
    }
};
