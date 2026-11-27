// This section converts the JavaScript job objects into HTML elements

const resultsConstainer = document.querySelector("#job-results");

export function renderJobs(jobs) {
    // Clearing results from previous searches
    resultsConstainer.replaceChildren();

    // Showing message when there are no results
    if (jobs.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No matching jobs found.";
        resultsConstainer.append(message);
        return;
    }

    // Creating one card for every job in the array
    // We will use textContent for security reasons since the info is coming from an external source
    jobs.forEach((job) => {
        const card = document.createElement("article");
        card.classList.add("job-card");

        // Job Title
        const title = document.createElement("h3");
        title.textContent = job.title || "Untitled position";

        // Company name
        const company = document.createElement("p");
        company.classList.add("job-company");
        company.textContent = job.company || "Company not provided";

        // Candidate location
        const location = document.createElement("p");
        location.textContent =
            `Location: ${job.location || "Not specified"}`;
        
        // Salary 
        const salary = document.createElement("p");
        salary.textContent =
            `Salary: ${job.salary || "Not listed"}`;
        
        // Adding the job info to the card
        card.append(title, company, location, salary);

        // Creating external link when a valid HTTP URL exists
        if (job.url) {
            try {
                const url = new URL(job.url);

                if (url.protocol === "https:") {
                    const link = document.createElement("a");

                    link.href = url.href;
                    link.target = "_blank";
                    link.rel + "noopener noreferrer";
                    link.textContent = "View original listing";
                    link.classList.add("job-link");

                    link.setAttribute(
                        "aria-label",
                        `View original listing for ${job.title}`
                    );

                    card.append(link);
                }
            } catch {
                // Skip missing or invalid URLs
            }
        }

        // Display the completed card
        resultsConstainer.append(card);
    });
}