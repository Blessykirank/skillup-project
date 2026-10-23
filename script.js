
const navigation = document.getElementById("navigation");
const content = document.getElementById("content");

async function loadPage(page, category = "") {
    try {
        const allowedPages = [
            "home", "courses", "about", "contact", "login", "signup"
        ];

        if (!allowedPages.includes(page)) {
            page = "home";
        }

        const response = await fetch(`${page}.html`);

        if (!response.ok) {
            throw new Error(`${page}.html could not be loaded`);
        }

        content.innerHTML = await response.text();

        document.querySelectorAll("[data-page]").forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page === page &&
                !link.closest(".dropdown-menu")
            );
        });

        if (page === "courses" && category) {
            const heading = content.querySelector(".page-heading h1");

            if (heading) {
                heading.innerHTML = `${category} <span>Courses</span>`;
            }

            content.querySelectorAll(".course-card").forEach(card => {
                const title = card.querySelector("h2")?.textContent || "";

                card.hidden = !title.toLowerCase().includes(
                    category.toLowerCase()
                );
            });
        }

        document.getElementById("coursesMenu")?.classList.remove("show");

        document.getElementById("coursesToggle")?.setAttribute(
            "aria-expanded",
            "false"
        );

        document.getElementById("navLinks")?.classList.remove("show");

        document.getElementById("menuBtn")?.setAttribute(
            "aria-expanded",
            "false"
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <section class="content-page">
                <h1>Oops! This page could not load.</h1>
                <p>
                    Check that the HTML files are in the same folder
                    and that you're running the project with Live Server.
                </p>
                <button class="start-btn" data-page="home">
                    Return Home
                </button>
            </section>`;
    }
}

async function connectFiles() {
    try {
        const response = await fetch("navigation.html");

        if (!response.ok) {
            throw new Error("navigation.html could not be loaded");
        }

        navigation.innerHTML = await response.text();

        await loadPage("home");
    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <section class="content-page">
                <h1>SkillUp could not connect its files.</h1>
                <p>
                    Open index.html with VS Code Live Server and check
                    that navigation.html is in the same folder.
                </p>
            </section>`;
    }
}

// Navigation links, course buttons, and course lessons
document.addEventListener("click", event => {
    const pageLink = event.target.closest("[data-page]");

    if (pageLink) {
        event.preventDefault();

        loadPage(
            pageLink.dataset.page,
            pageLink.dataset.category || ""
        );

        return;
    }

    const coursesToggle = event.target.closest("#coursesToggle");

    if (coursesToggle) {
        const menu = document.getElementById("coursesMenu");

        if (menu) {
            const isOpen = menu.classList.toggle("show");

            coursesToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }

        return;
    }

    const menuButton = event.target.closest("#menuBtn");

    if (menuButton) {
        const nav = document.getElementById("navLinks");

        if (nav) {
            const isOpen = nav.classList.toggle("show");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }

        return;
    }

    // Existing course selection behavior
    const courseButton = event.target.closest("[data-course]");

    if (courseButton) {
        const message = document.getElementById("courseMessage");

        if (message) {
            message.textContent =
                `${courseButton.dataset.course} selected! Course lessons can be added next.`;
        }

        return;
    }

    // NEW: Open Web Development lessons
    const startLearningButton = event.target.closest(
        "[data-open-course]"
    );

    if (startLearningButton) {
        const courseSection = document.getElementById("courseLearning");
        const lessonContent = document.getElementById("courseLessonContent");

        if (!courseSection || !lessonContent) {
            console.error(
                "Course lesson area was not found in courses.html."
            );
            return;
        }

        if (
            startLearningButton.dataset.openCourse === "web-development"
        ) {
            lessonContent.innerHTML = `
                <h2>Web Development — Beginner Lessons</h2>

                <article class="lesson-card">
                    <h3>Lesson 1: Introduction to Web Development</h3>
                    <p>
                        Web development is the process of creating
                        websites and web applications.
                    </p>
                    <p>
                        <strong>Frontend:</strong>
                        The part of a website users see and interact with.
                    </p>
                    <p>
                        <strong>Backend:</strong>
                        The server-side logic and data processing.
                    </p>
                </article>

                <article class="lesson-card">
                    <h3>Lesson 2: HTML Basics</h3>
                    <p>
                        HTML stands for HyperText Markup Language.
                        It provides the structure of a webpage.
                    </p>
                    <pre><code>&lt;h1&gt;Welcome to SkillUp!&lt;/h1&gt;
&lt;p&gt;My first webpage.&lt;/p&gt;</code></pre>
                </article>

                <article class="lesson-card">
                    <h3>Lesson 3: CSS Basics</h3>
                    <p>
                        CSS stands for Cascading Style Sheets.
                        It controls the appearance of a webpage.
                    </p>
                    <pre><code>h1 {
    color: purple;
    text-align: center;
}</code></pre>
                </article>

                <article class="lesson-card">
                    <h3>Lesson 4: JavaScript Basics</h3>
                    <p>
                        JavaScript adds interaction and dynamic
                        behavior to websites.
                    </p>
                    <pre><code>alert("Welcome to SkillUp!");</code></pre>
                </article>
            `;

            // Hide course cards while lessons are open
            content.querySelectorAll(".course-card").forEach(card => {
                card.hidden = true;
            });

            courseSection.hidden = false;

            courseSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        return;
    }

    // NEW: Return to the course cards
    if (event.target.closest("#backToCourses")) {
        const courseSection = document.getElementById("courseLearning");

        if (courseSection) {
            courseSection.hidden = true;
        }

        content.querySelectorAll(".course-card").forEach(card => {
            card.hidden = false;
        });

        return;
    }
});

// Demo contact, login, and signup forms
document.addEventListener("submit", event => {
    const form = event.target;

    if (form.id === "contactForm") {
        event.preventDefault();

        document.getElementById("contactFeedback").textContent =
            "Thank you! The form works in this demo, but your message has not been sent to a server.";

        form.reset();
    }

    if (form.id === "loginForm") {
        event.preventDefault();

        document.getElementById("loginFeedback").textContent =
            "Your form is working! Real login requires a backend and account authentication.";
    }

    if (form.id === "signupForm") {
        event.preventDefault();

        const password = form.elements.password.value;
        const confirmPassword = form.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            document.getElementById("signupFeedback").textContent =
                "Passwords do not match. Please try again.";

            return;
        }

        document.getElementById("signupFeedback").textContent =
            "Your form is working! Account creation requires a backend.";
    }
});

// Connect the separate navigation and page files
connectFiles();
