# Shopify theme (rod-tux)

Local development for a Shopify store theme. Use **Option A** to pull your existing online theme, or **Option B** to start from a new theme.

---

## Homepage revamp (collections & featured product)

The homepage is set up to highlight the **Reef** (rod case) first and show **Apparel** (e.g. shirt) lower on the page.

**In Shopify Admin:**

1. **Featured product** – In **Online Store → Themes → Customize**, open the homepage and select the **Featured product** section. Use the product picker to choose the Reef (or your main rod case product).
2. **Collections** – Create two collections and assign products:
   - A collection with **handle** `reef` (or `rod-cases`) containing only the Reef/rod case product(s).
   - A collection with **handle** `apparel` containing the shirt and any other apparel.
   If your handles differ, change them in the theme editor for the “Reef” and “Apparel” product-list sections.

---

## Prerequisites

- **Node.js** 18+ and **npm** ( [nodejs.org](https://nodejs.org/) )
- **Git** (you already have this)

---

## Option A: Pull your existing theme from the store

Use this if you’ve been editing the theme in the Shopify admin and want to work on that same theme locally.

### 1. Install dependencies (Shopify CLI)

From this repo root:

```bash
npm install
```

### 2. Log in and pull the theme

You’ll need:

- **Store URL** – Your store’s `.myshopify.com` URL (e.g. `my-store` or `my-store.myshopify.com`).
- **Store access** – One of:
  - Store owner account, or
  - Staff account with **Themes** permission, or
  - Collaborator with **Manage themes**, or
  - [Theme Access](https://shopify.dev/docs/storefronts/themes/tools/theme-access) password (then use `--password` with commands).

From this repo root, run:

```bash
npx shopify theme pull --store YOUR-STORE.myshopify.com
```

- The first time you run a command that needs the store, the CLI will open a browser so you can **log in with your Shopify account** (the one that has access to the store).
- You’ll be asked to **choose which theme** to pull (e.g. live theme or a specific theme by name/ID).
- Theme files are downloaded into this folder.

To pull the **live** theme without picking from a list:

```bash
npx shopify theme pull --store YOUR-STORE.myshopify.com --live
```

### 3. Develop locally

```bash
npx shopify theme dev --store YOUR-STORE.myshopify.com
```

Then open the preview URL (e.g. `http://127.0.0.1:9292`) in Chrome. Changes to CSS/sections hot-reload.

### 4. Push changes back to the store

When you’re ready to update the theme on the store:

```bash
npx shopify theme push --store YOUR-STORE.myshopify.com
```

You’ll choose which theme to update (or use `--theme THEME_ID` / `--unpublished` to push as a new unpublished theme).

---

## Option B: Start from a new theme

Use this if you prefer to start from a blank theme instead of pulling an existing one.

### 1. Install dependencies

```bash
npm install
```

### 2. Create a new theme

```bash
npx shopify theme init
```

This creates the standard theme folders (e.g. `assets`, `config`, `layout`, `sections`, `snippets`, `templates`, etc.) in the current directory. If the directory isn’t empty, use a new folder or run `theme init` in an empty subfolder.

### 3. Connect to your store and develop

```bash
npx shopify theme dev --store YOUR-STORE.myshopify.com
```

You’ll be prompted to log in if needed. The CLI creates a temporary **development theme** on your store and gives you a local preview URL.

---

## Useful commands

| Command | Purpose |
|--------|--------|
| `npx shopify theme pull --store STORE` | Download theme from store into current folder |
| `npx shopify theme push --store STORE` | Upload local theme to store |
| `npx shopify theme dev --store STORE` | Local preview with hot reload (Chrome) |
| `npx shopify theme list --store STORE` | List themes on the store |
| `npx shopify theme info` | Show current store and theme config |
| `npx shopify auth logout` | Log out (switch account or store) |

---

## What to provide so we can pull your theme

To pull your current progress from the store, we need:

1. **Store URL**  
   Your store’s myshopify URL, e.g. `your-store-name.myshopify.com` or just `your-store-name`.

2. **How you access the store**  
   - Are you the **store owner**?  
   - Or do you have a **staff** or **collaborator** account with theme access?  
   - Or do you have a **Theme Access password** from the merchant?

3. **Which theme to pull**  
   - The **live** (published) theme, or  
   - A specific **unpublished** theme (name or ID from Admin → Online Store → Themes).

Once you have Node 18+ and run `npm install` in this repo, you can run:

```bash
npx shopify theme pull --store YOUR-STORE.myshopify.com
```

and log in when the browser opens; then choose the theme to download. If you’d rather start from scratch, use **Option B** above.
