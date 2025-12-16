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

    let openHour, closeHour;

    if(day >= 1 && day <= 5){ // Senin - Jumat
        openHour = 7;  // 07:30
        closeHour = 21; // 21:00
    } else { // Sabtu - Minggu
        openHour = 7;  // 07:30
        closeHour = 19; // 19:00
    }

    const nowMinutes = hour*60 + minutes;
    const openMinutes = openHour*60 + 30; // 07:30
    const closeMinutes = closeHour*60;

    if(nowMinutes >= openMinutes && nowMinutes <= closeMinutes){
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
