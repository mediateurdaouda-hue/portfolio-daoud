/* ========================= typing animation ========================= */
var typedStringsEN = ["Full-Stack Developer", "Graphic Designer", "Web desginer",];
var typedStringsFR = ["Développeur Full-Stack", "Designer Graphique", "Formateur Web"];

var typed = new Typed(".typing", {
    strings: typedStringsEN,
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* ========================= Navigation Hama ========================= */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

/* ========================= Hire Me → Contact ========================= */
document.querySelectorAll(".hire-me[data-section-index]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removeBackSection();
        if (sectionIndex !== null) {
            addBackSection(sectionIndex);
        }
    });
});

/* ========================= Nav Toggler (responsive) ========================= */
const navTogglerBtn = document.querySelector(".nav-toggler"),
      Hama = document.querySelector(".Hama");

if (window.innerWidth < 1199) {
    navTogglerBtn.classList.add("nav-pulse");
}

navTogglerBtn.addEventListener("click", () => {
    navTogglerBtn.classList.remove("nav-pulse");
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    Hama.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

/* ========================= Language Switcher FR / EN ========================= */
let currentLang = "fr";
const langToggle = document.getElementById("langToggle");
const langLabel  = document.getElementById("langLabel");
langLabel.textContent = "🇬🇧";
document.documentElement.lang = "fr";
applyLanguage("fr");
langToggle.addEventListener("click", function () {
    currentLang = currentLang === "en" ? "fr" : "en";
    langLabel.textContent = currentLang === "en" ? "🇫🇷" : "🇬🇧";
    document.documentElement.lang = currentLang;
    applyLanguage(currentLang);
});

function applyLanguage(lang) {
    var enP = document.getElementById("about-text-en");
    var frP = document.getElementById("about-text-fr");
    if (enP && frP) {
        enP.style.display = lang === "fr" ? "none" : "block";
        frP.style.display = lang === "fr" ? "block" : "none";
    }

    document.querySelectorAll("[data-en]").forEach(function (el) {
        if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA" && !el.querySelector("[data-en]")) {
            el.textContent = lang === "fr" ? el.getAttribute("data-fr") : el.getAttribute("data-en");
        }
    });
    document.querySelectorAll("[data-placeholder-en]").forEach(function (el) {
        el.placeholder = lang === "fr"
            ? el.getAttribute("data-placeholder-fr")
            : el.getAttribute("data-placeholder-en");
    });
    typed.destroy();
    typed = new Typed(".typing", {
        strings: lang === "fr" ? typedStringsFR : typedStringsEN,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

/* ========================= Droit d'auteur ========================= */
(function () {
    var creationYear = 2025;
    var currentYear = new Date().getFullYear();
    document.getElementById("year").textContent =
        currentYear > creationYear ? creationYear + " – " + currentYear : creationYear;
})();

/* ========================= Animation barres de compétences ========================= */
function animateSkills() {
    document.querySelectorAll(".progress-in[data-width]").forEach(function (bar) {
        var target = bar.getAttribute("data-width") + "%";
        bar.style.transition = "width 1.2s ease-in-out";
        bar.style.width = target;
    });
}
function resetSkills() {
    document.querySelectorAll(".progress-in[data-width]").forEach(function (bar) {
        bar.style.transition = "none";
        bar.style.width = "0%";
    });
}

navList.forEach(function (li) {
    li.querySelector("a").addEventListener("click", function () {
        var target = this.getAttribute("href").split("#")[1];
        if (target === "about") {
            resetSkills();
            setTimeout(animateSkills, 400);
        }
    });
});

/* ========================= Années d'expérience dynamiques ========================= */
(function () {
    var startYear = 2022;
    var years = new Date().getFullYear() - startYear;
    document.getElementById("exp-years-en").textContent = years;
    document.getElementById("exp-years-fr").textContent = years;
})();

/* ========================= Âge dynamique ========================= */
(function () {
    var birth = new Date(2000, 0, 1);
    var today = new Date();
    var age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    document.getElementById("age").textContent = age;
})();

/* ========================= Validation + Envoi formulaire ========================= */
(function () {
    var form = document.getElementById("contact-form");
    var feedback = document.getElementById("form-feedback");
    if (!form || !feedback) return;

    function setError(inputId, errorId, msg) {
        var input = document.getElementById(inputId);
        var error = document.getElementById(errorId);
        input.classList.add("input-error");
        input.classList.remove("input-ok");
        error.textContent = msg;
    }
    function setOk(inputId, errorId) {
        var input = document.getElementById(inputId);
        var error = document.getElementById(errorId);
        input.classList.remove("input-error");
        input.classList.add("input-ok");
        error.textContent = "";
    }
    function clearAll() {
        ["form-name","form-email","form-subject","form-message"].forEach(function(id) {
            var el = document.getElementById(id);
            el.classList.remove("input-error","input-ok");
        });
        ["error-name","error-email","error-subject","error-message"].forEach(function(id) {
            document.getElementById(id).textContent = "";
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAll();
        var isFr = currentLang === "fr";
        var name    = document.getElementById("form-name").value.trim();
        var email   = document.getElementById("form-email").value.trim();
        var subject = document.getElementById("form-subject").value.trim();
        var message = document.getElementById("form-message").value.trim();
        var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var valid = true;

        if (!name) {
            setError("form-name", "error-name", isFr ? "Le nom est requis." : "Name is required.");
            valid = false;
        } else { setOk("form-name", "error-name"); }

        if (!email) {
            setError("form-email", "error-email", isFr ? "L'email est requis." : "Email is required.");
            valid = false;
        } else if (!emailReg.test(email)) {
            setError("form-email", "error-email", isFr ? "Format d'email invalide." : "Invalid email format.");
            valid = false;
        } else { setOk("form-email", "error-email"); }

        if (!subject) {
            setError("form-subject", "error-subject", isFr ? "L'objet est requis." : "Subject is required.");
            valid = false;
        } else { setOk("form-subject", "error-subject"); }

        if (!message) {
            setError("form-message", "error-message", isFr ? "Le message est requis." : "Message is required.");
            valid = false;
        } else { setOk("form-message", "error-message"); }

        if (!valid) return;

        var btn = document.getElementById("submit-btn");
        btn.disabled = true;
        btn.textContent = isFr ? "Envoi en cours..." : "Sending...";

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        }).then(function (res) {
            if (res.ok) {
                feedback.textContent = isFr
                    ? "✅ Message envoyé avec succès ! Je vous répondrai très bientôt."
                    : "✅ Message sent successfully! I will get back to you very soon.";
                feedback.style.background = "#d4edda";
                feedback.style.color = "#155724";
                form.reset();
                clearAll();
            } else { throw new Error(); }
        }).catch(function () {
            feedback.textContent = isFr
                ? "❌ Une erreur est survenue. Écrivez-moi à mediateurdaouda@gmail.com"
                : "❌ An error occurred. Contact me at mediateurdaouda@gmail.com";
            feedback.style.background = "#f8d7da";
            feedback.style.color = "#721c24";
        }).finally(function () {
            feedback.style.display = "block";
            btn.disabled = false;
            btn.textContent = isFr ? "Envoyer le Message" : "Send Message";
        });
    });
})();


/* ========================= Modal Aperçu CV ========================= */
(function () {
    var modal = document.getElementById("cv-modal");
    var openBtn = document.getElementById("view-cv-btn");
    var closeBtn = document.getElementById("cv-modal-close");
    if (!modal || !openBtn || !closeBtn) return;

    openBtn.addEventListener("click", function () {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
})();

/* ========================= Scroll to Top ========================= */
(function () {
    var btn = document.getElementById("scroll-top");

    document.querySelectorAll(".section").forEach(function (section) {
        section.addEventListener("scroll", function () {
            if (this.scrollTop > 300) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });
    });

    btn.addEventListener("click", function () {
        var active = document.querySelector(".section.active");
        if (active) active.scrollTo({ top: 0, behavior: "smooth" });
    });
})();