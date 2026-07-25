/* =========================================================================
   TRIWULANCELL — app.js
   Semua JavaScript website dipisah dari HTML (modular & mudah dirawat).
   Struktur file ini:
   1.  Data Produk (semua varian iPhone & Samsung)
   2.  Util kecil (escape HTML, WA link, dsb)
   3.  Render Katalog Produk
   4.  Navbar (shrink, hide/show, progress bar, menu mobile)
   5.  Reveal on Scroll
   6.  Cursor Glow & Tilt 3D (desktop only)
   7.  Search (autocomplete, recent search, highlight)
   8.  Filter (brand + kondisi) & Wishlist
   9.  Modal helper + Quick View
   10. Bandingkan Produk (maks 3)
   11. Wizard Tukar Tambah
   12. FAB Speed-Dial & Sticky CTA Mobile
   13. Rekomendasi HP sesuai Kebutuhan/Profesi
   14. Testimoni Slider
   15. Init
   ========================================================================= */

(() => {
    'use strict';

    /* ============================================================
       1. DATA PRODUK
       Catatan jujur: kami TIDAK mencantumkan harga pasti, IMEI, atau
       battery health per unit di sini karena itu data riil per barang
       yang cuma toko yang tahu (dan bisa berubah tiap hari). Field
       "tier" dipakai untuk kasih gambaran umum performa/kamera/baterai
       secara wajar, bukan angka spek yang dikarang.
       ============================================================ */
    const WA_NUMBER = '628119804789';

    // [nama, kondisi('new'|'second'), tier('flagship'|'mid'|'entry'), file gambar]
    const IPHONE_RAW = [
        ['iPhone SE', 'second', 'entry', 'iphone-se.png'],
        ['iPhone XR', 'second', 'entry', 'iphone-xr.png'],
        ['iPhone XS', 'second', 'mid', 'iphone-xs.png'],
        ['iPhone XS Max', 'second', 'mid', 'iphone-xs-max.png'],
        ['iPhone 11', 'second', 'mid', 'iphone-11.png'],
        ['iPhone 11 Pro', 'second', 'flagship', 'iphone-11-pro.png'],
        ['iPhone 11 Pro Max', 'second', 'flagship', 'iphone-11-pro-max.png'],
        ['iPhone 12 mini', 'second', 'mid', 'iphone-12-mini.png'],
        ['iPhone 12', 'second', 'mid', 'iphone-12.png'],
        ['iPhone 12 Pro', 'second', 'flagship', 'iphone-12-pro.png'],
        ['iPhone 12 Pro Max', 'second', 'flagship', 'iphone-12-pro-max.png'],
        ['iPhone 13 mini', 'second', 'mid', 'iphone-13-mini.png'],
        ['iPhone 13', 'second', 'mid', 'iphone-13.png'],
        ['iPhone 13 Pro', 'second', 'flagship', 'iphone-13-pro.png'],
        ['iPhone 13 Pro Max', 'second', 'flagship', 'iphone-13-pro-max.png'],
        ['iPhone 14', 'second', 'mid', 'iphone-14.png'],
        ['iPhone 14 Plus', 'second', 'mid', 'iphone-14-plus.png'],
        ['iPhone 14 Pro', 'second', 'flagship', 'iphone-14-pro.png'],
        ['iPhone 14 Pro Max', 'second', 'flagship', 'iphone-14-pro-max.png'],
        ['iPhone 15', 'second', 'mid', 'iphone-15.png'],
        ['iPhone 15 Plus', 'second', 'mid', 'iphone-15-plus.png'],
        ['iPhone 15 Pro', 'second', 'flagship', 'iphone-15-pro.png'],
        ['iPhone 15 Pro Max', 'second', 'flagship', 'iphone-15-pro-max.png'],
        ['iPhone 16', 'new', 'mid', 'iphone-16.png'],
        ['iPhone 16 Plus', 'new', 'mid', 'iphone-16-plus.png'],
        ['iPhone 16 Pro', 'new', 'flagship', 'iphone-16-pro.png'],
        ['iPhone 16 Pro Max', 'new', 'flagship', 'iphone-16-pro-max.png'],
        ['iPhone 16e', 'new', 'mid', 'iphone-16e.png'],
        ['iPhone 17', 'new', 'mid', 'iphone-17.png'],
        ['iPhone 17 Air', 'new', 'mid', 'iphone-17-air.png'],
        ['iPhone 17 Pro', 'new', 'flagship', 'iphone-17-pro.png'],
        ['iPhone 17 Pro Max', 'new', 'flagship', 'iphone-17-pro-max.png'],
        ['iPhone 17e', 'new', 'mid', 'iphone-17e.png']
    ];

    const SAMSUNG_RAW = [
        // Galaxy S Series
        ['Samsung Galaxy S21', 'second', 'flagship', 'samsung-s21.png'],
        ['Samsung Galaxy S21+', 'second', 'flagship', 'samsung-s21-plus.png'],
        ['Samsung Galaxy S21 Ultra', 'second', 'flagship', 'samsung-s21-ultra.png'],
        ['Samsung Galaxy S22', 'second', 'flagship', 'samsung-s22.png'],
        ['Samsung Galaxy S22+', 'second', 'flagship', 'samsung-s22-plus.png'],
        ['Samsung Galaxy S22 Ultra', 'second', 'flagship', 'samsung-s22-ultra.png'],
        ['Samsung Galaxy S23', 'second', 'flagship', 'samsung-s23.png'],
        ['Samsung Galaxy S23+', 'second', 'flagship', 'samsung-s23-plus.png'],
        ['Samsung Galaxy S23 Ultra', 'second', 'flagship', 'samsung-s23-ultra.png'],
        ['Samsung Galaxy S24', 'second', 'flagship', 'samsung-s24.png'],
        ['Samsung Galaxy S24+', 'second', 'flagship', 'samsung-s24-plus.png'],
        ['Samsung Galaxy S24 Ultra', 'second', 'flagship', 'samsung-s24-ultra.png'],
        ['Samsung Galaxy S25', 'new', 'flagship', 'samsung-s25.png'],
        ['Samsung Galaxy S25+', 'new', 'flagship', 'samsung-s25-plus.png'],
        ['Samsung Galaxy S25 Ultra', 'new', 'flagship', 'samsung-s25-ultra.png'],
        ['Samsung Galaxy S25 Edge', 'new', 'flagship', 'samsung-s25-edge.png'],
        ['Samsung Galaxy S26', 'new', 'flagship', 'samsung-s26.png'],
        ['Samsung Galaxy S26+', 'new', 'flagship', 'samsung-s26-plus.png'],
        ['Samsung Galaxy S26 Ultra', 'new', 'flagship', 'samsung-s26-ultra.png'],
        // Galaxy Z Series (foldable)
        ['Samsung Galaxy Z Fold3', 'second', 'flagship', 'samsung-z-fold3.png'],
        ['Samsung Galaxy Z Fold4', 'second', 'flagship', 'samsung-z-fold4.png'],
        ['Samsung Galaxy Z Fold5', 'second', 'flagship', 'samsung-z-fold5.png'],
        ['Samsung Galaxy Z Fold6', 'second', 'flagship', 'samsung-z-fold6.png'],
        ['Samsung Galaxy Z Fold7', 'new', 'flagship', 'samsung-z-fold7.png'],
        ['Samsung Galaxy Z Flip3', 'second', 'flagship', 'samsung-z-flip3.png'],
        ['Samsung Galaxy Z Flip4', 'second', 'flagship', 'samsung-z-flip4.png'],
        ['Samsung Galaxy Z Flip5', 'second', 'flagship', 'samsung-z-flip5.png'],
        ['Samsung Galaxy Z Flip6', 'second', 'flagship', 'samsung-z-flip6.png'],
        ['Samsung Galaxy Z Flip7', 'new', 'flagship', 'samsung-z-flip7.png'],
        // Galaxy A Series
        ['Samsung Galaxy A07', 'new', 'entry', 'samsung-a07.png'],
        ['Samsung Galaxy A15', 'second', 'entry', 'samsung-a15.png'],
        ['Samsung Galaxy A16', 'second', 'entry', 'samsung-a16.png'],
        ['Samsung Galaxy A17', 'new', 'entry', 'samsung-a17.png'],
        ['Samsung Galaxy A24', 'second', 'entry', 'samsung-a24.png'],
        ['Samsung Galaxy A25', 'second', 'mid', 'samsung-a25.png'],
        ['Samsung Galaxy A26', 'second', 'mid', 'samsung-a26.png'],
        ['Samsung Galaxy A27', 'new', 'mid', 'samsung-a27.png'],
        ['Samsung Galaxy A34', 'second', 'mid', 'samsung-a34.png'],
        ['Samsung Galaxy A35', 'second', 'mid', 'samsung-a35.png'],
        ['Samsung Galaxy A36', 'second', 'mid', 'samsung-a36.png'],
        ['Samsung Galaxy A37', 'new', 'mid', 'samsung-a37.png'],
        ['Samsung Galaxy A54', 'second', 'mid', 'samsung-a54.png'],
        ['Samsung Galaxy A55', 'second', 'mid', 'samsung-a55.png'],
        ['Samsung Galaxy A56', 'second', 'mid', 'samsung-a56.png'],
        ['Samsung Galaxy A57', 'new', 'mid', 'samsung-a57.png']
    ];

    const OTHER_RAW = [
        ['iPad Air', 'second', 'mid', 'ipad-air.png']
    ];

    function toProduct([name, condition, tier, img], category) {
        return { name, condition, tier, img, category };
    }

    const PRODUCTS = [
        ...IPHONE_RAW.map(p => toProduct(p, 'iphone')),
        ...SAMSUNG_RAW.map(p => toProduct(p, 'samsung')),
        ...OTHER_RAW.map(p => toProduct(p, 'lainnya'))
    ];

    // Gambaran umum per tier — bukan spek pasti, cuma panduan kasar.
    const TIER_SPECS = {
        flagship: {
            label: 'Flagship',
            chip: 'Chipset kelas atas, performa sangat kencang',
            camera: 'Kamera multi-lensa, hasil foto/video premium',
            display: 'Layar premium, refresh rate tinggi',
            battery: 'Baterai besar & mendukung fast charging',
            storage: '256GB / 512GB / 1TB (tergantung unit)'
        },
        mid: {
            label: 'Menengah',
            chip: 'Chipset kelas menengah, lancar dipakai harian',
            camera: 'Kamera ganda, hasil bagus untuk sehari-hari',
            display: 'Layar tajam, nyaman dipakai harian',
            battery: 'Baterai awet untuk pemakaian seharian',
            storage: '128GB / 256GB (tergantung unit)'
        },
        entry: {
            label: 'Entry-level',
            chip: 'Chipset dasar, cukup untuk kebutuhan pokok',
            camera: 'Kamera standar, cukup untuk dokumentasi harian',
            display: 'Layar jernih, ukuran nyaman digenggam',
            battery: 'Baterai tahan lama, hemat daya',
            storage: '64GB / 128GB (tergantung unit)'
        }
    };

    /* ============================================================
       2. UTIL KECIL
       ============================================================ */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function waLink(message) {
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    function highlightMatch(text, query) {
        if (!query) return escapeHtml(text);
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return escapeHtml(text);
        const before = escapeHtml(text.slice(0, idx));
        const match = escapeHtml(text.slice(idx, idx + query.length));
        const after = escapeHtml(text.slice(idx + query.length));
        return `${before}<mark>${match}</mark>${after}`;
    }

    // Diexpose supaya modul lain (di bawah) bisa pakai.
    window.TWApp = { PRODUCTS, TIER_SPECS, WA_NUMBER, escapeHtml, waLink, debounce, highlightMatch };
})();

/* =========================================================================
   MODUL UTAMA — jalan setelah DOM siap
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const { PRODUCTS, TIER_SPECS, WA_NUMBER, escapeHtml, waLink, debounce, highlightMatch } = window.TWApp;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       3. RENDER KATALOG PRODUK
       ============================================================ */
    const productGrid = document.getElementById('productGrid');

    function fallbackIconFor(category) {
        return category === 'lainnya' ? 'fa-tablet-screen-button' : 'fa-mobile-screen-button';
    }

    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = PRODUCTS.map((p, i) => {
            const tagClass = p.condition === 'new' ? 'tag-new' : 'tag-second';
            const tagLabel = p.condition === 'new' ? 'Baru' : 'Second Mulus';
            const waMsg = `Halo Triwulancell, ${p.name} masih ready?`;
            return `
                <div class="product-card reveal" data-category="${p.category}" data-condition="${p.condition}" data-index="${i}">
                    <span class="tag ${tagClass}">${tagLabel}</span>
                    <button type="button" class="wishlist-btn" aria-label="Simpan ${escapeHtml(p.name)} ke wishlist" aria-pressed="false">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <label class="compare-check">
                        <input type="checkbox">
                        <span>Bandingkan</span>
                    </label>
                    <div class="prod-img-container" role="button" tabindex="0" aria-label="Lihat detail ${escapeHtml(p.name)}">
                        <img src="${p.img}" alt="${escapeHtml(p.name)}" class="prod-img" loading="lazy" decoding="async"
                             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'img-fallback',innerHTML:'<i class=\\'fas ${fallbackIconFor(p.category)}\\'></i>'}))">
                    </div>
                    <h3>${escapeHtml(p.name)}</h3>
                    <p class="price">Harga Bersahabat</p>
                    <a href="${waLink(waMsg)}" target="_blank" rel="noopener" class="btn-buy">Tanya Stok</a>
                </div>`;
        }).join('');
    }

    renderProducts();

    let productCards = () => Array.from(document.querySelectorAll('.product-card'));

    /* ============================================================
       4. NAVBAR: shrink + hide/show + progress bar + menu mobile
       ============================================================ */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    function closeMobileNav() {
        navToggle?.classList.remove('open');
        navLinks?.classList.remove('open');
        navOverlay?.classList.remove('open');
    }

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open');
    });
    navOverlay?.addEventListener('click', closeMobileNav);
    navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));

    let lastScrollY = window.scrollY;
    function onScrollNavbar() {
        const y = window.scrollY;
        navbar?.classList.toggle('scrolled', y > 20);

        // Sembunyikan navbar saat scroll ke bawah, tampilkan saat scroll ke atas
        if (y > lastScrollY && y > 140) {
            navbar?.classList.add('nav-hidden');
        } else {
            navbar?.classList.remove('nav-hidden');
        }
        lastScrollY = y;

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = pct + '%';

        backToTop?.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScrollNavbar, { passive: true });
    onScrollNavbar();

    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const navSections = ['beranda', 'kebutuhan', 'produk', 'ulasan', 'lokasi']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const navAnchors = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active'));
                document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    navSections.forEach(sec => sectionObserver.observe(sec));

    /* ============================================================
       5. REVEAL ON SCROLL
       ============================================================ */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    function observeReveals() {
        document.querySelectorAll('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el));
    }
    observeReveals();

    /* ============================================================
       6. CURSOR GLOW & TILT 3D (khusus desktop / mouse presisi)
       ============================================================ */
    if (isFinePointer && !prefersReducedMotion) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        window.addEventListener('mousemove', e => {
            glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        document.querySelectorAll('a, button, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => glow.classList.add('grow'));
            el.addEventListener('mouseleave', () => glow.classList.remove('grow'));
        });

        // Tilt gambar hero (backdrop di dalam CTA box)
        const heroImageWrap = document.querySelector('.hero-image');
        const ctaBoxForTilt = document.querySelector('.cta-box');
        if (heroImageWrap && ctaBoxForTilt) {
            ctaBoxForTilt.addEventListener('mousemove', e => {
                const rect = ctaBoxForTilt.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                heroImageWrap.style.transform = `scale(1.05) rotateY(${x * 12}deg) rotateX(${y * -12}deg)`;
            });
            ctaBoxForTilt.addEventListener('mouseleave', () => { heroImageWrap.style.transform = ''; });
        }

        // Tilt + shine kartu produk (delegasi supaya tetap jalan walau kartu baru dirender)
        document.addEventListener('mousemove', e => {
            const card = e.target.closest?.('.product-card');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            card.style.transform = `perspective(700px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-6px)`;
            card.style.setProperty('--mx', `${px * 100}%`);
            card.style.setProperty('--my', `${py * 100}%`);
        });
        document.addEventListener('mouseout', e => {
            const card = e.target.closest?.('.product-card');
            if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
        });
    }

    /* ============================================================
       7 & 8. SEARCH + FILTER (brand & kondisi) + WISHLIST
       ============================================================ */
    const searchInput = document.getElementById('productSearch');
    const searchEmpty = document.getElementById('searchEmpty');
    const searchSuggest = document.getElementById('searchSuggest');
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    const conditionButtons = document.querySelectorAll('.filter-btn[data-condition]');
    const wishlistToggleBtn = document.getElementById('wishlistToggleBtn');

    let activeFilter = 'all';
    let activeCondition = 'all';
    let searchQuery = '';
    let wishlistOnly = false;

    const WISHLIST_KEY = 'tw_wishlist';
    function getWishlist() {
        try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
        catch { return []; }
    }
    function setWishlist(list) {
        try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); } catch { /* ignore quota errors */ }
        updateWishlistCounter();
    }
    function isWishlisted(name) { return getWishlist().includes(name); }
    function toggleWishlist(name) {
        const list = getWishlist();
        const idx = list.indexOf(name);
        if (idx === -1) list.push(name); else list.splice(idx, 1);
        setWishlist(list);
        return list.includes(name);
    }
    function updateWishlistCounter() {
        const count = getWishlist().length;
        if (wishlistToggleBtn) {
            wishlistToggleBtn.querySelector('.wishlist-count').textContent = count;
            wishlistToggleBtn.classList.toggle('has-items', count > 0);
        }
    }

    function applyProductVisibility() {
        let anyVisible = false;
        productCards().forEach(card => {
            const category = card.dataset.category;
            const condition = card.dataset.condition;
            const name = card.querySelector('h3')?.textContent || '';
            const nameLower = name.toLowerCase();

            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesCondition = activeCondition === 'all' || condition === activeCondition;
            const matchesSearch = nameLower.includes(searchQuery);
            const matchesWishlist = !wishlistOnly || isWishlisted(name);

            const show = matchesFilter && matchesCondition && matchesSearch && matchesWishlist;
            card.classList.toggle('hidden-item', !show);
            if (show) { card.classList.add('reveal', 'in-view'); anyVisible = true; }
        });
        searchEmpty?.classList.toggle('show', !anyVisible);
        observeReveals();
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            applyProductVisibility();
        });
    });

    conditionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            conditionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCondition = btn.dataset.condition;
            applyProductVisibility();
        });
    });

    wishlistToggleBtn?.addEventListener('click', () => {
        wishlistOnly = !wishlistOnly;
        wishlistToggleBtn.classList.toggle('active', wishlistOnly);
        applyProductVisibility();
    });

    // Wishlist heart per kartu (delegasi klik)
    productGrid?.addEventListener('click', e => {
        const heartBtn = e.target.closest('.wishlist-btn');
        if (heartBtn) {
            e.stopPropagation();
            const card = heartBtn.closest('.product-card');
            const name = card.querySelector('h3')?.textContent || '';
            const nowActive = toggleWishlist(name);
            heartBtn.classList.toggle('active', nowActive);
            heartBtn.setAttribute('aria-pressed', String(nowActive));
            heartBtn.querySelector('i').className = nowActive ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
            if (wishlistOnly) applyProductVisibility();
        }
    });

    function syncWishlistHearts() {
        const list = getWishlist();
        productCards().forEach(card => {
            const name = card.querySelector('h3')?.textContent || '';
            const btn = card.querySelector('.wishlist-btn');
            if (!btn) return;
            const active = list.includes(name);
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', String(active));
            btn.querySelector('i').className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        });
    }
    syncWishlistHearts();
    updateWishlistCounter();

    // --- Search: autocomplete + highlight + recent search ---
    const RECENT_KEY = 'tw_recent_search';
    const SUGGESTED_SEEDS = ['iPhone 15', 'iPhone 13', 'Samsung Galaxy S24', 'Samsung Galaxy A55', 'iPhone SE'];

    function getRecent() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
        catch { return []; }
    }
    function pushRecent(term) {
        if (!term.trim()) return;
        let list = getRecent().filter(t => t.toLowerCase() !== term.toLowerCase());
        list.unshift(term);
        list = list.slice(0, 5);
        try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch { /* ignore */ }
    }

    function renderSuggestions(query) {
        if (!searchSuggest) return;
        let items = [];
        let heading = '';

        if (query) {
            items = PRODUCTS
                .map(p => p.name)
                .filter(n => n.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 8);
            heading = items.length ? 'Saran produk' : '';
        } else {
            const recent = getRecent();
            if (recent.length) {
                heading = 'Pencarian terakhir';
                items = recent;
            } else {
                heading = 'Coba cari';
                items = SUGGESTED_SEEDS;
            }
        }

        if (!items.length) {
            searchSuggest.innerHTML = '';
            searchSuggest.classList.remove('open');
            return;
        }

        searchSuggest.innerHTML = `
            <div class="search-suggest-heading">${heading}</div>
            ${items.map(item => `<button type="button" class="search-suggest-item" data-value="${escapeHtml(item)}">
                <i class="fas ${query ? 'fa-magnifying-glass' : 'fa-clock-rotate-left'}"></i>
                <span>${query ? highlightMatch(item, query) : escapeHtml(item)}</span>
            </button>`).join('')}
        `;
        searchSuggest.classList.add('open');
    }

    searchInput?.addEventListener('input', debounce(() => {
        searchQuery = searchInput.value.trim().toLowerCase();
        applyProductVisibility();
        renderSuggestions(searchInput.value.trim());
    }, 150));

    searchInput?.addEventListener('focus', () => renderSuggestions(searchInput.value.trim()));

    searchInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            pushRecent(searchInput.value.trim());
            searchSuggest?.classList.remove('open');
        }
    });

    searchSuggest?.addEventListener('click', e => {
        const item = e.target.closest('.search-suggest-item');
        if (!item) return;
        const value = item.dataset.value;
        searchInput.value = value;
        searchQuery = value.trim().toLowerCase();
        pushRecent(value);
        applyProductVisibility();
        searchSuggest.classList.remove('open');
        document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.search-box')) searchSuggest?.classList.remove('open');
    });

    /* ============================================================
       9. MODAL HELPER + QUICK VIEW
       ============================================================ */
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close')?.focus();
    }
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    });

    const quickViewModal = document.getElementById('quickViewModal');

    function openQuickView(card) {
        const product = PRODUCTS[Number(card.dataset.index)];
        if (!product) return;
        const spec = TIER_SPECS[product.tier];
        const imgEl = card.querySelector('.prod-img, .img-fallback');
        const tag = card.querySelector('.tag')?.textContent || '';
        const waHref = card.querySelector('.btn-buy')?.getAttribute('href') || '#';

        document.getElementById('qvImage').innerHTML = imgEl && imgEl.tagName === 'IMG'
            ? `<img src="${imgEl.getAttribute('src')}" alt="${escapeHtml(product.name)}" loading="lazy">`
            : (imgEl ? imgEl.outerHTML : '');
        document.getElementById('qvTag').textContent = tag;
        document.getElementById('qvTitle').textContent = product.name;
        document.getElementById('qvPrice').textContent = 'Harga Bersahabat';
        document.getElementById('qvSpecs').innerHTML = `
            <li><i class="fas fa-microchip"></i> ${spec.chip}</li>
            <li><i class="fas fa-camera"></i> ${spec.camera}</li>
            <li><i class="fas fa-display"></i> ${spec.display}</li>
            <li><i class="fas fa-battery-full"></i> ${spec.battery}</li>
            <li><i class="fas fa-sd-card"></i> Storage umum: ${spec.storage}</li>
        `;
        document.getElementById('qvWaBtn').setAttribute('href', waHref);
        openModal(quickViewModal);
    }

    productGrid?.addEventListener('click', e => {
        if (e.target.closest('.wishlist-btn')) return;
        const imgContainer = e.target.closest('.prod-img-container');
        if (imgContainer) openQuickView(imgContainer.closest('.product-card'));
    });
    productGrid?.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const imgContainer = e.target.closest('.prod-img-container');
        if (imgContainer) {
            e.preventDefault();
            openQuickView(imgContainer.closest('.product-card'));
        }
    });

    /* ============================================================
       10. BANDINGKAN PRODUK (maksimal 3)
       ============================================================ */
    const MAX_COMPARE = 3;
    const compareBar = document.getElementById('compareBar');
    const compareBarItems = document.getElementById('compareBarItems');
    const compareBarBtn = document.getElementById('compareBarBtn');
    const compareModal = document.getElementById('compareModal');
    const compareGrid = document.getElementById('compareGrid');
    let compareList = [];

    function updateCompareBar() {
        if (!compareBar) return;
        compareBarItems.innerHTML = compareList.map(item => `<span>${escapeHtml(item.name)}</span>`).join('');
        compareBarBtn.textContent = `Bandingkan (${compareList.length}/${MAX_COMPARE})`;
        compareBarBtn.disabled = compareList.length < 2;
        compareBar.classList.toggle('show', compareList.length > 0);
    }

    productGrid?.addEventListener('change', e => {
        const checkbox = e.target.closest('.compare-check input');
        if (!checkbox) return;
        const card = checkbox.closest('.product-card');
        const product = PRODUCTS[Number(card.dataset.index)];

        if (checkbox.checked) {
            if (compareList.length >= MAX_COMPARE) {
                checkbox.checked = false;
                showToast(`Maksimal ${MAX_COMPARE} produk untuk dibandingkan ya 😉`);
                return;
            }
            compareList.push({ card, name: product.name });
        } else {
            compareList = compareList.filter(item => item.card !== card);
        }
        updateCompareBar();
    });

    compareBarBtn?.addEventListener('click', () => {
        if (compareList.length < 2) return;
        compareGrid.innerHTML = compareList.map(item => {
            const card = item.card;
            const product = PRODUCTS[Number(card.dataset.index)];
            const spec = TIER_SPECS[product.tier];
            const imgEl = card.querySelector('.prod-img, .img-fallback');
            const imgHtml = imgEl && imgEl.tagName === 'IMG'
                ? `<img src="${imgEl.getAttribute('src')}" alt="${escapeHtml(product.name)}" loading="lazy">`
                : (imgEl ? imgEl.outerHTML : '');
            const tag = card.querySelector('.tag')?.textContent || '';
            const waHref = card.querySelector('.btn-buy')?.getAttribute('href') || '#';
            return `
                <div class="compare-col">
                    <div class="compare-img">${imgHtml}</div>
                    <span class="qv-tag">${tag}</span>
                    <h4>${escapeHtml(product.name)}</h4>
                    <ul class="compare-specs">
                        <li><i class="fas fa-microchip"></i> ${spec.chip}</li>
                        <li><i class="fas fa-camera"></i> ${spec.camera}</li>
                        <li><i class="fas fa-display"></i> ${spec.display}</li>
                        <li><i class="fas fa-battery-full"></i> ${spec.battery}</li>
                        <li><i class="fas fa-sd-card"></i> ${spec.storage}</li>
                    </ul>
                    <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa"><i class="fab fa-whatsapp"></i> Tanya Ini</a>
                </div>`;
        }).join('');
        compareGrid.className = `compare-grid cols-${compareList.length}`;
        openModal(compareModal);
    });

    /* ============================================================
       Toast kecil (pengganti alert() bawaan browser)
       ============================================================ */
    let toastTimer;
    function showToast(message) {
        let toast = document.getElementById('twToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'twToast';
            toast.className = 'tw-toast';
            toast.setAttribute('role', 'status');
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    }
    window.TWApp.showToast = showToast;

    /* ============================================================
       11. WIZARD TUKAR TAMBAH
       ============================================================ */
    const tradeInBtn = document.getElementById('tradeInBtn');
    const tradeInModal = document.getElementById('tradeInModal');
    const tiPanels = tradeInModal?.querySelectorAll('.tradein-panel') || [];
    const tiDots = tradeInModal?.querySelectorAll('.step-dot') || [];
    let tiBrand = null;
    let tiCondition = null;

    function tiShowStep(n) {
        tiPanels.forEach(p => p.classList.toggle('active', p.dataset.panel === String(n)));
        tiDots.forEach(d => d.classList.toggle('active', Number(d.dataset.step) <= n));
    }
    function tiReset() {
        tiBrand = null;
        tiCondition = null;
        tradeInModal?.querySelectorAll('.tradein-options button').forEach(b => b.classList.remove('selected'));
        tiShowStep(1);
    }
    tradeInBtn?.addEventListener('click', () => { tiReset(); openModal(tradeInModal); });

    document.getElementById('tiBrandOptions')?.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            tiBrand = btn.dataset.value;
            btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            tiShowStep(2);
        });
    });

    document.getElementById('tiConditionOptions')?.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            tiCondition = btn.dataset.value;
            btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            document.getElementById('tiSummary').innerHTML =
                `<p><strong>Tipe HP:</strong> ${escapeHtml(tiBrand)}</p><p><strong>Kondisi:</strong> ${escapeHtml(tiCondition)}</p>`;
            document.getElementById('tiSendBtn').setAttribute('href', waLink(
                `Halo Triwulancell, saya mau tanya tukar tambah.\nTipe HP saya: ${tiBrand}\nKondisi: ${tiCondition}\nMohon info estimasi & prosesnya ya. Terima kasih!`
            ));
            tiShowStep(3);
        });
    });

    tradeInModal?.querySelectorAll('[data-back]').forEach(btn => {
        btn.addEventListener('click', () => {
            const step = Number(tradeInModal.querySelector('.tradein-panel.active')?.dataset.panel || 1);
            tiShowStep(Math.max(1, step - 1));
        });
    });

    /* ============================================================
       12. FAB SPEED-DIAL & STICKY CTA MOBILE
       ============================================================ */
    const fabWrap = document.getElementById('fabWrap');
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');

    const linkWa = document.querySelector('.btn-wa')?.getAttribute('href') || '#';
    const linkIg = document.querySelector('.btn-ig')?.getAttribute('href') || '#';
    const linkTokopedia = document.querySelector('.btn-tokopedia')?.getAttribute('href') || '#';
    const linkShopee = document.querySelector('.btn-shopee')?.getAttribute('href') || '#';

    if (fabMenu) {
        fabMenu.innerHTML = `
            <a href="${linkShopee}" target="_blank" rel="noopener" class="fab-item fab-shopee" title="Shopee" aria-label="Shopee"><i class="fas fa-cart-shopping"></i></a>
            <a href="${linkTokopedia}" target="_blank" rel="noopener" class="fab-item fab-tokopedia" title="Tokopedia" aria-label="Tokopedia"><i class="fas fa-bag-shopping"></i></a>
            <a href="${linkIg}" target="_blank" rel="noopener" class="fab-item fab-ig" title="Instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${linkWa}" target="_blank" rel="noopener" class="fab-item fab-wa" title="WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        `;
    }
    fabMain?.addEventListener('click', () => fabWrap.classList.toggle('open'));
    document.addEventListener('click', e => { if (fabWrap && !fabWrap.contains(e.target)) fabWrap.classList.remove('open'); });

    // Sticky CTA khusus mobile (WA cepat + tukar tambah), FAB otomatis disembunyikan lewat CSS di layar kecil
    const mobileCtaWa = document.getElementById('mobileCtaWa');
    const mobileCtaTradein = document.getElementById('mobileCtaTradein');
    if (mobileCtaWa) mobileCtaWa.setAttribute('href', linkWa);
    mobileCtaTradein?.addEventListener('click', () => { tiReset(); openModal(tradeInModal); });

    /* ============================================================
       13. REKOMENDASI HP SESUAI KEBUTUHAN / PROFESI
       ============================================================ */
    const needsData = {
        kreator: { label: '🎥 Konten Kreator / Vlogger', need: 'Butuh kamera yang jernih & stabil buat video, plus baterai kuat seharian syuting.', devices: ['iPhone 15 Pro', 'iPhone 17 Pro', 'Samsung Galaxy S25 Ultra'] },
        gamer: { label: '🎮 Gamer Mobile', need: 'Butuh chipset kencang, RAM besar, dan refresh rate tinggi biar main game berat tetap mulus.', devices: ['iPhone 16 Pro Max', 'iPhone 17 Pro Max', 'Samsung Galaxy S25 Ultra'] },
        fotografer: { label: '📸 Fotografer / Videografer', need: 'Kualitas sensor kamera nomor satu, plus storage besar buat nyimpen file foto/video mentah.', devices: ['iPhone 15 Pro Max', 'iPhone 17 Pro', 'Samsung Galaxy S24 Ultra'] },
        kantoran: { label: '💼 Karyawan Kantoran', need: 'Yang penting ringan dibawa, baterai awet seharian meeting & email, performa cukup buat kerja harian.', devices: ['iPhone 13', 'iPhone 14', 'Samsung Galaxy A55'] },
        pelajar: { label: '🎓 Pelajar / Mahasiswa', need: 'Budget ramah kantong tapi tetap lancar buat kelas online, ngerjain tugas, dan sosial media.', devices: ['iPhone SE', 'iPhone 12', 'Samsung Galaxy A25'] },
        reseller: { label: '🛍️ Pebisnis Online / Reseller', need: 'Kamera oke buat foto produk, dan baterai kuat buat bales chat pembeli dari pagi sampai malam.', devices: ['iPhone 14', 'iPhone 15', 'Samsung Galaxy S23'] },
        trader: { label: '📈 Trader Saham / Kripto', need: 'Layar jernih buat baca chart, performa stabil biar bisa multitasking banyak aplikasi sekaligus.', devices: ['iPhone 15 Pro', 'iPhone 16 Pro', 'Samsung Galaxy S24 Ultra'] },
        editor: { label: '🎬 Video Editor Mobile', need: 'Butuh RAM & storage besar plus chipset kuat biar rendering video nggak lemot.', devices: ['iPhone 16 Pro Max', 'Samsung Galaxy S24 Ultra', 'iPad Air'] },
        musisi: { label: '🎧 Musisi / Produser Audio', need: 'Storage besar buat nyimpen project audio, dan konektivitas lancar buat kolaborasi online.', devices: ['iPhone 14 Pro', 'iPhone 15', 'Samsung Galaxy S23'] },
        desainer: { label: '🎨 Desainer Grafis', need: 'Layar dengan warna akurat dan performa tinggi buat buka software desain di HP atau tablet.', devices: ['iPhone 15 Pro', 'iPad Air', 'Samsung Galaxy S25 Ultra'] },
        traveler: { label: '✈️ Traveler / Digital Nomad', need: 'Yang ringkas, baterai awet buat dipakai seharian jalan-jalan, kamera oke buat dokumentasi momen.', devices: ['iPhone 13', 'iPhone 14', 'Samsung Galaxy Z Flip5'] },
        guru: { label: '📚 Guru / Dosen', need: 'Simpel dipakai, tahan lama, harga bersahabat, cukup buat mengajar online & administrasi.', devices: ['iPhone 12', 'iPhone SE', 'Samsung Galaxy A35'] }
    };

    const needsChipsWrap = document.getElementById('needsChips');
    const needsCard = document.getElementById('needsCard');

    function renderNeed(key) {
        const data = needsData[key];
        if (!data || !needsCard) return;
        const pesan = `Halo Triwulancell, saya lagi cari HP yang cocok untuk kebutuhan: ${data.label}. Boleh minta rekomendasi & cek stoknya?`;

        needsCard.innerHTML = `
            <h3>${data.label}</h3>
            <p class="needs-desc">${data.need}</p>
            <p class="needs-devices-label">Rekomendasi tipe HP di toko kami:</p>
            <div class="needs-devices">
                ${data.devices.map(d => `<button type="button" class="device-chip" data-device="${escapeHtml(d)}">${escapeHtml(d)}</button>`).join('')}
            </div>
            <a href="${waLink(pesan)}" target="_blank" rel="noopener" class="btn btn-wa"><i class="fab fa-whatsapp"></i> Tanya Rekomendasi ke Admin</a>
        `;

        needsCard.querySelectorAll('.device-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = btn.dataset.device;
                    searchQuery = btn.dataset.device.trim().toLowerCase();
                    applyProductVisibility();
                }
                document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    needsChipsWrap?.querySelectorAll('.chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            needsChipsWrap.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderNeed(chip.dataset.need);
        });
    });
    renderNeed('kreator');

    /* ============================================================
       14. TESTIMONI SLIDER (geser, panah, titik, autoplay)
       ============================================================ */
    const reviewGrid = document.querySelector('.review-grid');
    if (reviewGrid) {
        reviewGrid.classList.add('slider-track');
        const reviewCards = reviewGrid.querySelectorAll('.review-card');

        const nav = document.createElement('div');
        nav.className = 'slider-nav';
        nav.innerHTML = `
            <button class="slider-arrow" data-dir="-1" aria-label="Ulasan sebelumnya"><i class="fas fa-chevron-left"></i></button>
            <div class="slider-dots"></div>
            <button class="slider-arrow" data-dir="1" aria-label="Ulasan berikutnya"><i class="fas fa-chevron-right"></i></button>
        `;
        reviewGrid.insertAdjacentElement('afterend', nav);

        const dotsWrap = nav.querySelector('.slider-dots');
        reviewCards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ke ulasan ${i + 1}`);
            dot.addEventListener('click', () => {
                reviewCards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            });
            dotsWrap.appendChild(dot);
        });

        nav.querySelectorAll('.slider-arrow').forEach(arrow => {
            arrow.addEventListener('click', () => {
                reviewGrid.scrollBy({ left: Number(arrow.dataset.dir) * reviewGrid.clientWidth * 0.9, behavior: 'smooth' });
            });
        });

        let scrollTimeout;
        reviewGrid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                let closestIdx = 0, closestDist = Infinity;
                reviewCards.forEach((c, i) => {
                    const dist = Math.abs(c.offsetLeft - reviewGrid.scrollLeft);
                    if (dist < closestDist) { closestDist = dist; closestIdx = i; }
                });
                dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === closestIdx));
            }, 120);
        });

        if (!prefersReducedMotion) {
            let autoplayTimer = setInterval(() => {
                const maxScroll = reviewGrid.scrollWidth - reviewGrid.clientWidth;
                if (reviewGrid.scrollLeft >= maxScroll - 5) {
                    reviewGrid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    reviewGrid.scrollBy({ left: reviewGrid.clientWidth * 0.9, behavior: 'smooth' });
                }
            }, 5000);
            ['mouseenter', 'touchstart', 'wheel'].forEach(evt => {
                reviewGrid.addEventListener(evt, () => clearInterval(autoplayTimer), { passive: true });
            });
        }
    }

    /* ============================================================
       15. Terapkan filter/search awal setelah semua siap
       ============================================================ */
    applyProductVisibility();
});
