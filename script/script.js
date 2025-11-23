// js/main.js

// Navbar highlight saat scroll
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


function checkGymStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Minggu, 1 = Senin ... 6 = Sabtu
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
    const closeMinutes = closeHour*60; // misal 21:00

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
