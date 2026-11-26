const API_URL = "https://remotive.com/api/remote-jobs?category=software-dev&limit=100";

const CACHE_KEY = "coi_jobs";
const CACHE_DURATION = 12 * 60 * 60 * 1000;

export async function getJobs() {
    // Step 1: Check if we have recent data
    const savedData = localStorage.getItem(CACHE_KEY);

    if (savedData) {
        try {
            const cache = JSON.parse(savedData);

            if (
                Date.now() - cache.savedAt < CACHE_DURATION &&
                Array.isArray(cache.jobs)
            ) {
                return cache.jobs;
            }
        } catch {
            localStorage.removeItem(CACHE_KEY);
        }
    }

    // Step 2: Request new data if the cache is missing
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Remotive API error: ${response.status}`);
    }

    // Step 3: Convert the JSON response to a JavaScript object
    const data = await response.json();

    if (!Array.isArray(data.jobs)) {
        throw new Error("Unexpected API response format");
    }

    // Step 4: Keep the properties the app needs
    const jobs = data.jobs.map((job) => ({
        id: job.id,
        title: job.title ?? "",
        company: job.company_name ?? "",
        location: job.candidate_required_location ?? "",
        salary: job.salary ?? "",
        url: job.url ?? "",
        tags: Array.isArray(job.tags) ? job.tags : []
    }));

    // Step 5: Save the result for later searches
    // The reason for this is that we avoid calling the API for every search
    // We're downloading up to 100 listings valid for 12 hours
    try {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                savedAt: Date.now(),
                jobs
            })
        );
    } catch {
        // if storage is not available, use the results without caching
    }

    return jobs;    
}
