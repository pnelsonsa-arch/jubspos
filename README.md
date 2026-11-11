# The Jubilee POS & GRV

An offline-first Progressive Web App (PWA) built for **The Jubilee** to manage Point of Sale (POS) tabs, Goods Received Vouchers (GRV), supplier invoice scanning, and retail margin pricing in South African Rand (ZAR).

## Features

* **Point of Sale (POS):** Quick-tap product catalog, custom item entry, automatic 15% VAT calculation, Cash/Card tender tracking, and daily shift cash-up totals.
* **Supplier Invoice Scanner (OCR):** Captures supplier invoices via rear phone camera or image upload and extracts line items locally using **Tesseract.js**.
* **GRV & Margin Calculator:** Calculates recommended shelf prices (Incl. 15% VAT) from Excl. or Incl. supplier costs using preset margins (`25%`, `30%`, `35%`, `40%`, or custom %) and syncs updated prices directly to the POS catalog.
* **Price Comparison:** Searchable log of supplier costs, shelf prices, and profit margins across saved GRVs.
* **Offline Ready:** Uses a Service Worker (`sw.js`) and `localStorage` so sales and stock receiving continue working without an internet connection.

## Project Structure

* `index.html` — Main single-page application (UI, POS logic, OCR parser, and margin calculator).
* `manifest.json` — Android PWA configuration for standalone home screen installation.
* `sw.js` — Service Worker for offline asset caching.
* `icon.svg` — App launcher icon.
* `tesseract.min.js` — Client-side OCR engine for reading invoice images.

## Deployment (Cloudflare Pages)

This repository is configured for zero-build static hosting on **Cloudflare Pages**:

1. Connect this GitHub repository to **Cloudflare Workers & Pages**.
2. Use the default static settings:
   * **Framework preset:** `None`
   * **Build command:** *(leave empty)*
   * **Build output directory:** `/` *(or leave empty)*
3. Every commit pushed to `main` automatically deploys to `https://pages.dev`.

## Installing on Android

1. Open the deployed HTTPS URL in **Google Chrome** on Android.
2. Tap **Install App** in the top bar (or open Chrome's **⋮ menu** -> **Add to Home screen** / **Install app**).
3. Launch **Jubilee POS** from your home screen for full-screen offline access.
