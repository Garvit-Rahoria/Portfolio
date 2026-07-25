// AOS INIT


// DOM LOAD (IMPORTANT)
document.addEventListener("DOMContentLoaded", function () {
    
    // AOS INIT
    if (window.AOS) {
        AOS.init({
            duration: 700,
            once: true
        });
    }

    // TYPE EFFECT
    const roles = ["React Developer", "Web Developer", "Full Stack Developer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const roleElement = document.getElementById("role");

    function typeEffect() {
        if (!roleElement) return;

        const currentText = roles[index];

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        roleElement.innerText = currentText.substring(0, charIndex);

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            return setTimeout(typeEffect, 1500);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    // MENU TOGGLE
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("#navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }


    // SLIDER
    const track = document.querySelector(".skills-track");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (track && nextBtn && prevBtn) {
        let slideIndex = 0;
        let autoSlide;

        function getSlideDetails() {
            const firstCard = track.querySelector(".skill-card");
            const wrapper = track.parentElement;

            if (!firstCard || !wrapper) {
                return { step: 0, maxIndex: 0 };
            }

            const trackStyles = window.getComputedStyle(track);
            const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
            const step = firstCard.getBoundingClientRect().width + gap;
            const visibleCards = Math.max(1, Math.floor((wrapper.clientWidth + gap) / step));
            const maxIndex = Math.max(0, track.children.length - visibleCards);

            return { step, maxIndex };
        }

        function moveSlide() {
            const { step, maxIndex } = getSlideDetails();
            slideIndex = Math.min(slideIndex, maxIndex);
            track.style.transform = `translateX(-${slideIndex * step}px)`;
        }

        function goNext() {
            const { maxIndex } = getSlideDetails();
            slideIndex = slideIndex < maxIndex ? slideIndex + 1 : 0;
            moveSlide();
        }

        function goPrev() {
            const { maxIndex } = getSlideDetails();
            slideIndex = slideIndex > 0 ? slideIndex - 1 : maxIndex;
            moveSlide();
        }

        nextBtn.addEventListener("click", goNext);
        prevBtn.addEventListener("click", goPrev);
        window.addEventListener("resize", moveSlide);

        autoSlide = setInterval(goNext, 3000);

        track.addEventListener("mouseenter", () => clearInterval(autoSlide));
        track.addEventListener("mouseleave", () => {
            autoSlide = setInterval(goNext, 3000);
        });

        moveSlide();
    }


    // ACCORDION
    const accordTitles = document.querySelectorAll(".accord-title");

    accordTitles.forEach(title => {
        title.addEventListener("click", () => {
            title.parentElement.classList.toggle("active");
        });
    });


    // FORM VALIDATION
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneError = document.getElementById("phoneError");
        const messageError = document.getElementById("messageError");

        document.querySelectorAll(".error").forEach(el => el.textContent = "");
        document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("input-error"));

        if (name.value.trim() === "") {
            nameError.textContent = "Name is required";
            name.classList.add("input-error");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email.value.match(emailPattern)) {
            emailError.textContent = "Enter a valid email";
            email.classList.add("input-error");
            isValid = false;
        }

        const phoneDigits = phone.value.replace(/\D/g, "");
        if (phone.value !== "" && phoneDigits.length < 10) {
            phoneError.textContent = "Enter valid phone number";
            phone.classList.add("input-error");
            isValid = false;
        }

        if (message.value.trim() === "") {
            messageError.textContent = "Message cannot be empty";
            message.classList.add("input-error");
            isValid = false;
        }

        if (isValid) {
            const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
            const body = encodeURIComponent(
                `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nPhone: ${phone.value.trim() || "Not provided"}\n\nMessage:\n${message.value.trim()}`
            );

            window.location.href = `mailto:garvitrahoriya2004@gmail.com?subject=${subject}&body=${body}`;
            form.reset();
        }

    });

});
