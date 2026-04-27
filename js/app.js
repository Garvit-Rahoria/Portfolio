// AOS INIT


// DOM LOAD (IMPORTANT)
document.addEventListener("DOMContentLoaded", function () {
    
    // AOS INIT
    AOS.init();

    // TYPE EFFECT
    const roles = ["React Developer", "Web Developer", "Full Stack Developer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const roleElement = document.getElementById("role");

    function typeEffect() {
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

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });


    // SLIDER
    const track = document.querySelector(".skills-track");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let slideIndex = 0;
    const cardWidth = 170;

    function moveSlide() {
        track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex < track.children.length - 4) ? slideIndex + 1 : 0;
        moveSlide();
    });

    prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex > 0) ? slideIndex - 1 : track.children.length - 4;
        moveSlide();
    });

    setInterval(() => {
        slideIndex = (slideIndex < track.children.length - 4) ? slideIndex + 1 : 0;
        moveSlide();
    }, 3000);


    // ACCORDION
    const accordTitles = document.querySelectorAll(".accord-title");

    accordTitles.forEach(title => {
        title.addEventListener("click", () => {
            title.parentElement.classList.toggle("active");
        });
    });


    // FORM VALIDATION
    const form = document.getElementById("contactForm");

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

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.value.match(emailPattern)) {
            emailError.textContent = "Enter a valid email";
            email.classList.add("input-error");
            isValid = false;
        }

        if (phone.value !== "" && phone.value.length < 10) {
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
            alert("Message sent successfully 🚀");
            form.reset();
        }

    });

});