// ===== Navbar highlight saat scroll =====
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('header nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

// ===== Status Gym Open/Close =====
function checkGymStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Minggu
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const statusEl = document.getElementById('open-status');

    let openHour, openMinute, closeHour, closeMinute;

    if (day >= 1 && day <= 5) { // Senin - Jumat
        openHour = 7;
        openMinute = 30;
        closeHour = 21;
        closeMinute = 30;
    } else { // Sabtu - Minggu
        openHour = 7;
        openMinute = 30;
        closeHour = 18;
        closeMinute = 30;
    }

    const nowTotal = hour * 60 + minutes;
    const openTotal = openHour * 60 + openMinute;
    const closeTotal = closeHour * 60 + closeMinute;

    if (nowTotal >= openTotal && nowTotal <= closeTotal) {
        statusEl.textContent = "OPEN";
        statusEl.style.color = "limegreen";
    } else {
        statusEl.textContent = "CLOSED";
        statusEl.style.color = "red";
    }
}


// Jalankan saat load
window.onload = checkGymStatus;

// ===== Burger menu toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Tutup menu saat klik link di mobile
navLi.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});


function calculateProtein() {
    const weight = parseFloat(document.getElementById("weight").value);
    const goal = parseFloat(document.getElementById("goal").value);
    const result = document.querySelector("#protein-result h3");

    if (isNaN(weight) || weight <= 0) {
        result.textContent = "⚠ Masukkan berat badan yang valid";
        return;
    }

    const protein = (weight * goal).toFixed(0);
    result.textContent = `${protein} gram / hari`;
}

// =========================================================
// ===== FUNGSI KALKULATOR KALORI HARIAN (TDEE/BMR) BARU =====
// =========================================================
function hitungKalori() {
    // 1. Ambil nilai dari input HTML dari form TDEE
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const usia = parseFloat(document.getElementById('usia').value);
    const jk = document.getElementById('jk').value;
    const aktivitasFaktor = parseFloat(document.getElementById('aktivitas').value);

    const hasilTDEE = document.querySelector("#calorie-result h3");
    const hasilBMRInfo = document.getElementById("bmr-info");

    // Validasi input
    if (isNaN(berat) || isNaN(tinggi) || isNaN(usia) || berat <= 0 || tinggi <= 0 || usia <= 0) {
        hasilTDEE.textContent = "⚠ Lengkapi data fisik Anda";
        hasilBMRInfo.textContent = "";
        return; 
    }

    // 2. Hitung BMR (Basal Metabolic Rate) - Formula Mifflin-St Jeor
    let bmr;
    
    if (jk === 'pria') {
        // BMR Pria: (10 * BB) + (6.25 * TB) - (5 * U) + 5
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) + 5;
    } else { // Wanita
        // BMR Wanita: (10 * BB) + (6.25 * TB) - (5 * U) - 161
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) - 161;
    }

    // 3. Hitung TDEE (Total Daily Energy Expenditure)
    const tdeeValue = bmr * aktivitasFaktor;
    
    // 4. Tampilkan Hasil
    const tdeeFinal = Math.round(tdeeValue);
    const bmrFinal = Math.round(bmr);
    
    hasilTDEE.textContent = `${tdeeFinal} kkal`;
    hasilBMRInfo.textContent = `BMR (Istirahat): ${bmrFinal} kkal`;
}