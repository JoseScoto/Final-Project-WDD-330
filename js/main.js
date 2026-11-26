import { getJobs } from "./jobApi.js";

const searchForm = document.querySelector("#job-search-form");
const jobStatus = document.querySelector("#job-status");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent HTML form reloading the page

  const formData = new FormData(searchForm);

  const query = String(formData.get("query") ?? "")
    .trim()
    .toLowerCase();

  if (!query) {
    return;
  }

  jobStatus.textContent = "Loading jobs...";

  try {
    const jobs = await getJobs();

    // Filtering only the jobs that satisfy our condition
    const matchingJobs = jobs.filter((job) => {
      const titleMatches = job.title
        .toLowerCase()
        .includes(query);

      // Checking if at least one tag matches the search
      const tagsMatch = job.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return titleMatches || tagsMatch;
    });

    console.table(
      matchingJobs.slice(0, 5).map((job) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        url: job.url
      }))
    );

    jobStatus.textContent =
      `${matchingJobs.length} matching jobs found. Check the Console.`;

  } catch (error) {
    console.error("Job search failed:", error);

    jobStatus.textContent =
      "Unable to load jobs. Please try again later.";
  }

});
