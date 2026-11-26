// Application entry point.
// Milestone 1: verify that the page and ES module load successfully.
// Milestone 2: replace this placeholder with a Remotive API request.
const searchForm = document.querySelector("#job-search-form");
const jobStatus = document.querySelector("#job-status");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = new FormData(searchForm).get("query").trim();
  jobStatus.textContent = `Next milestone: search real jobs for "${query}".`;
});
