# Cravory — Restaurant Ordering Website

A modern, responsive restaurant ordering website built with React and Vite. Cravory lets customers explore the menu, select delivery or pickup, customize their order details, review their selection, and send an order request through WhatsApp.

**Live Website:** https://hzdevops52.github.io/cravory_restaurant/  
**Repository:** https://github.com/hzdevops52/cravory_restaurant

---

## Overview

Cravory provides a customer-friendly online ordering experience with a branded interface, responsive layouts, interactive menu items, and a WhatsApp-based checkout flow.

### Customer Features

- **Restaurant menu:** Browse available food items and explore the menu.
- **Shopping cart:** Add items and adjust order quantities.
- **Delivery and pickup:** Choose how to receive your order.
- **Customer details:** Enter the information required for the selected fulfillment method.
- **Order review:** Review customer information, selected items, and the subtotal before proceeding.
- **WhatsApp ordering:** Prepare the order request and open WhatsApp to send it to Cravory.
- **Responsive design:** Designed to work across desktop and mobile screens.
- **Interactive checkout:** Smoothly navigate to the order-review panel after submitting the order details.

> **Ordering note:** Submitting an order opens WhatsApp with a prepared message. The customer must send the message, and Cravory must confirm availability, any delivery fee, and the final total. Orders are not automatically confirmed by the website.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface and interactive components |
| Vite | Development server and production build |
| JavaScript (ES Modules) | Application logic |
| CSS | Styling and responsive layouts |
| Lucide React | Interface icons |
| WhatsApp Click-to-Chat | Order-request handoff |
| GitHub Actions | Automated build and deployment |
| GitHub Pages | Static website hosting |

## Project Structure

```text
cravory/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── frontend/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## Run Locally

**Prerequisites:** Node.js 22 or a compatible version supported by the installed Vite release, and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/hzdevops52/cravory_restaurant.git
   cd cravory_restaurant
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in your terminal.

## Available Commands

Run these commands from the `frontend/` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

The production website is generated in `frontend/dist/`.

## Automated Deployment

Cravory uses GitHub Actions to build and deploy the website to GitHub Pages.

The workflow is located at `.github/workflows/ci.yml`.

On every push to the `main` branch, the workflow:

1. Checks out the repository.
2. Sets up Node.js and installs dependencies with `npm ci`.
3. Builds the frontend with `npm run build`.
4. Uploads the production build as a GitHub Pages artifact.
5. Deploys the artifact to GitHub Pages after a successful build.

The workflow can also be started manually using the **Run workflow** option in GitHub Actions.

### GitHub Pages Configuration

In the repository settings, navigate to **Settings → Pages** and select **GitHub Actions** as the deployment source.

The Vite configuration uses the repository's base path for GitHub Pages builds and the root path for local development.

## Project Scope

Cravory is a **static, customer-facing restaurant ordering website**. It does not currently include a backend API, database, restaurant administration dashboard, or automatic order-processing system.

Orders are handed off to WhatsApp for manual communication and confirmation.

## Future Improvements

Potential future enhancements include:

- Menu search and category filtering.
- Improved accessibility and checkout feedback.
- Integration with a backend and database if persistent order management becomes necessary.
- Online payment integration if required.
- Automated testing and additional CI quality checks.

## License

No license has been specified yet. All rights and reuse permissions should be treated as unspecified unless a license is added to the repository.
