# End-to-End Testing with Cypress

This project uses **Cypress** for end-to-end (E2E) testing.

This codebase dosn't actually have a full stack app so testing [Gym Buddy]('https://viveek-sh.github.io/gym-buddy')

## Getting Started

Make sure you have Node.js installed.

### Install dependencies

```bash
npm install
```

### Run Test

```bash
#You can write Script to start [DB => Next App / React APP => Run Cypress => Close Containers] locally
# This script can be then integrated in workflow for testing
# But this codebase dosen't have local full stack app so directly running Cypress on terminal


#headless mode
npx cypress run

#or

#headed mode with --browser and --headed flag
npx cypress run --browser electorn --headed
```

> This is simple end to end written for Gym-Buddy on Cypress.
