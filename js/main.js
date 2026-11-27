// This section coordinates the search, filtering and UI updates

import { getJobs } from "./jobApi.js";
import { renderJobs } from "./jobUI.js";

const searchForm = document.querySelector("#job-search-form");
const jobStatus = document.querySelector("#job-status");
const jobResults = document.querySelector("#job-results");

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
  jobResults.replaceChildren(); // Removes old cards every new search

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

    renderJobs(matchingJobs);

    jobStatus.textContent =
      `${matchingJobs.length} matching jobs found.`;

  } catch (error) {
    console.error("Job search failed:", error);

    jobStatus.textContent =
      "Unable to load jobs. Please try again later.";
  }

});
