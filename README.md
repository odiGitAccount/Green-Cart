# Playwright Test Project

This project contains end-to-end tests for GreenKart using Playwright with Page Object Model (POM).

## Prerequisites

- Node.js 18+
- npm

## Local Setup

1. Open a terminal in this project folder:

   cd /Users/odibodi/Documents/Tests/playwright-project

2. Install dependencies:

   npm install

3. Install Playwright browsers:

   npx playwright install

4. Set optional credentials (used only if Sign In is shown):

   export RAHUL_EMAIL="odeta799@gmail.com"
   export RAHUL_PASSWORD="Electron@123"

## Run Tests

Run all tests:

npx playwright test

Run tests in headed mode (Chromium):

npx playwright test --project=chromium --headed

Run tests in headed mode (Safari/WebKit):

npx playwright test --project=webkit --headed

## Command to Run the New Cart-Empty Test Locally

Run only the new cart-empty scenario:

npx playwright test tests/cart-empty.spec.js --project=chromium

Run the new cart-empty test in headed mode:

npx playwright test tests/cart-empty.spec.js --project=chromium --headed

## Useful Commands

List discovered tests:

npx playwright test --list

Open last HTML report:

npx playwright show-report
