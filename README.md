# Career Opportunity Intelligence

WDD330 final project — a browser-based application for finding remote technical jobs, reviewing location restrictions, comparing job requirements with user-entered skills, and discovering GitHub learning projects.

## Course technology requirements

- HTML, CSS, and vanilla JavaScript (ES modules)
- Two external APIs: Remotive jobs and GitHub repository search
- Responsive layout, accessible interactions, and CSS animation
- Clean code and ESLint checks; no JavaScript frameworks or libraries

## Planned milestones

1. **Foundation:** Semantic HTML, responsive CSS, and ES module entry point.
2. **Job discovery:** Fetch real jobs, show loading/error states, filter locally, and inspect job details.
3. **Skill comparison:** Save a user-entered skills profile and identify matching or missing terms transparently.
4. **Learning resources:** Search GitHub repositories for skills the user wants to develop.
5. **Finish:** Saved jobs, accessibility and mobile testing, animations, ESLint, and deployment.

## Data and accuracy principles

- Job listings come from an external provider; link back to the original listing and attribute Remotive.
- Country or time-zone text is not proof of eligibility; users must check the employer's conditions.
- Skill matches are keyword-based guidance, not estimates of hiring probability.
- Do not commit API keys or other secrets to frontend source code.
- Avoid frequent Remotive polling; follow provider limits and cache responsibly.

## Project planning

[Trello — Career Opportunity Intelligence](https://trello.com/b/q6qv03b8/career-opportunity-intelligence)

## Development notes

Record design decisions, bugs, fixes, and evidence of your own learning as the project evolves.
