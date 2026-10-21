
async function connectFiles() {
    try {
        // Load the navigation
        const navResponse = await fetch("navigation.html");

        if (!navResponse.ok) {
            throw new Error("navigation.html could not be loaded");
        }

        const navHTML = await navResponse.text();

        document.getElementById("navigation").innerHTML = navHTML;

        // Load the homepage
        const homeResponse = await fetch("home.html");

        if (!homeResponse.ok) {
            throw new Error("home.html could not be loaded");
        }

        const homeHTML = await homeResponse.text();

        document.getElementById("content").innerHTML = homeHTML;

        console.log("SkillUp files connected successfully!");

    } catch (error) {
        console.error("Connection error:", error);
    }
}

connectFiles();
