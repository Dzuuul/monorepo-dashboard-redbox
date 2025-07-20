import { APP_PROVIDER } from "./app";

// Metadata per halaman
export const METADATA = {
    TITLE: (page: string) => {
        // Fungsi untuk mengubah string menjadi Title Case
        const toTitleCase = (str: string) => {
            return str
                .split(/[-_\s]+/) // Split berdasarkan dash, underscore, atau space
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
        }
        
        return `${toTitleCase(page)} | ${APP_PROVIDER}`
    },
    
    // Metadata untuk halaman Dashboard
    DASHBOARD: {
        title: "Dashboard",
        description: "Halaman dashboard Redbox. Lihat ringkasan data, performa, dan statistik penting dalam satu tampilan.",
        keywords: ["overview", "dashboard", "redbox", "statistik", "performa", "ringkasan"],
        openGraph: {
            title: "Dashboard",
            description: "Halaman dashboard Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman User
    USER: {
        title: "User",
        description: "Kelola data pengguna dan profil akun dalam sistem Redbox.",
        keywords: ["user", "profile", "account", "pengguna", "akun"],
        openGraph: {
            title: "User",
            description: "Kelola data pengguna Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Projects
    PROJECTS: {
        title: "Projects",
        description: "Kelola dan pantau proyek-proyek dalam sistem Redbox.",
        keywords: ["projects", "proyek", "management", "kelola"],
        openGraph: {
            title: "Projects",
            description: "Kelola proyek Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Documents
    DOCUMENTS: {
        title: "Documents",
        description: "Akses dan kelola dokumen penting dalam sistem Redbox.",
        keywords: ["documents", "dokumen", "files", "file"],
        openGraph: {
            title: "Documents",
            description: "Kelola dokumen Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Settings
    SETTINGS: {
        title: "Settings",
        description: "Konfigurasi pengaturan sistem dan preferensi pengguna.",
        keywords: ["settings", "pengaturan", "config", "konfigurasi"],
        openGraph: {
            title: "Settings",
            description: "Pengaturan sistem Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Help
    HELP: {
        title: "Help",
        description: "Pusat bantuan dan panduan penggunaan sistem Redbox.",
        keywords: ["help", "bantuan", "guide", "panduan"],
        openGraph: {
            title: "Help",
            description: "Pusat bantuan Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Search
    SEARCH: {
        title: "Search",
        description: "Cari dan temukan informasi dalam sistem Redbox.",
        keywords: ["search", "cari", "find", "temukan"],
        openGraph: {
            title: "Search",
            description: "Pencarian Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Entries
    ENTRIES: {
        title: "Entries",
        description: "Kelola entri data dan informasi dalam sistem Redbox.",
        keywords: ["entries", "entri", "data", "input"],
        openGraph: {
            title: "Entries",
            description: "Kelola entri Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Consumer Data
    CONSUMER_DATA: {
        title: "Consumer Data",
        description: "Kelola dan analisis data konsumen dalam sistem Redbox.",
        keywords: ["consumer", "data", "konsumen", "analisis"],
        openGraph: {
            title: "Consumer Data",
            description: "Data konsumen Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Whitelist
    WHITELIST: {
        title: "Whitelist",
        description: "Kelola daftar putih dan izin akses dalam sistem Redbox.",
        keywords: ["whitelist", "daftar putih", "izin", "access"],
        openGraph: {
            title: "Whitelist",
            description: "Daftar putih Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Blacklist
    BLACKLIST: {
        title: "Blacklist",
        description: "Kelola daftar hitam dan pembatasan akses dalam sistem Redbox.",
        keywords: ["blacklist", "daftar hitam", "block", "blokir"],
        openGraph: {
            title: "Blacklist",
            description: "Daftar hitam Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Data Library
    DATA_LIBRARY: {
        title: "Data Library",
        description: "Perpustakaan data dan referensi dalam sistem Redbox.",
        keywords: ["data library", "perpustakaan", "referensi", "library"],
        openGraph: {
            title: "Data Library",
            description: "Perpustakaan data Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Reports
    REPORTS: {
        title: "Reports",
        description: "Laporan dan analisis data dalam sistem Redbox.",
        keywords: ["reports", "laporan", "analisis", "report"],
        openGraph: {
            title: "Reports",
            description: "Laporan Redbox",
            type: "website",
        }
    },
    
    // Metadata untuk halaman Word Assistant
    WORD_ASSISTANT: {
        title: "Word Assistant",
        description: "Asisten kata dan bantuan penulisan dalam sistem Redbox.",
        keywords: ["word assistant", "asisten", "penulisan", "writing"],
        openGraph: {
            title: "Word Assistant",
            description: "Asisten kata Redbox",
            type: "website",
        }
    }
} 