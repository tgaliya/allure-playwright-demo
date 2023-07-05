name: Playwright Trigger
on:
  push:
    branches: [main, dev]
  workflow_run:
    workflows:
      - 'Sub-Repo Workflow 1'
    types:
      - completed

jobs:
  run_sub_workflows:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run Sub-Repo Workflow 1
        uses: ./.github/workflows/dev.yml
        with:
          path: outamation/via-core-ui

  run_playwright:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install

      - name: Run Playwright automation
        env:
          EMAIL_USERNAME: ${{ secrets.SMTP_USERNAME }}
          EMAIL_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
        run: |
          npm install nodemailer
          npm install dotenv
          npm run VIA
