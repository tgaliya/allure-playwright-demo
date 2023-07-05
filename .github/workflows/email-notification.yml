name: Playwright Automation Email Notification

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  run_playwright:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
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
