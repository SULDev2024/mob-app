## Quick orientation

This is an Expo + React Native mobile app (AR e-commerce demo). Key entry points and conventions:

- Project type: Expo (see `package.json`, main: `expo-router/entry`, scripts: `start`, `android`, `ios`, `web`).
- Router: expo-router (top-level `app/_layout.jsx`) — the file-based router is the primary layout when running via `expo-router/entry`.
- Alternative navigation: `app/index.jsx` contains a manual React Navigation setup (Bottom Tabs + Stack) and also registers a root component. Be careful: there are two different root approaches in the repo (expo-router vs manual NavigationContainer). Prefer `app/_layout.jsx` when using expo-router.

## Primary components & data flows

- Screens live under `app/` and `bottomTab/` (examples: `bottomTab/homescreen.jsx`, `bottomTab/cartscreen.jsx`, `bottomTab/productDetailScreen.jsx`).
- Global state: `context/CartContext.js` — exposes `CartProvider`, `useCart()`, `addToCart(product)` and `removeFromCart(id)`. Wrap the app with `CartProvider` (already done in `app/_layout.jsx`).
- Navigation patterns: components call `navigation.navigate("ProductDetail", { product })` or `navigation.navigate("SearchResults", { results, query })` to pass data. Screens expect product objects with fields like `id`, `title`, `image`, `price`, `description`.

## Build / run / debug

- Common commands (use the workspace shell):
  - npm run start  -> starts Expo (Metro + DevTools)
  - npm run android -> runs Expo targeting Android
  - npm run ios -> runs Expo targeting iOS (macOS only)
  - npm run web -> web build
- When using VS Code, open the project root and run `npm run start`. Use Expo DevTools to open on device/emulator.
- Note: package.json main points at `expo-router/entry`. If you prefer the manual navigator in `app/index.jsx`, ensure you don't have conflicting root providers (duplicate CartProvider/NavigationContainer).

## Project-specific conventions and gotchas

- Two router patterns exist side-by-side:
  - expo-router style: `app/_layout.jsx` exports a `Stack` and wraps `CartProvider`. This is the recommended entry for an Expo Router app.
  - manual React Navigation: `app/index.jsx` registers a root with `registerRootComponent` and uses a `NavigationContainer` + custom Tab/Stack. If you edit navigation, pick one approach and remove the other to avoid duplicate roots.
- Assets and icons: small PNGs are stored under `Icons/` and loaded with require, e.g. `require("../Icons/focusedHome-01.png")`. Keep names stable — the code uses exact file names.
- Firebase: `bottomTab/firebaseConfig.js` contains a placeholder config. Replace the placeholder keys with your Firebase project's values. The file exports `auth` from `firebase/auth`.
- Context usage: `useCart()` is a thin wrapper; components store full product objects in `cartItems`. `removeFromCart` filters by `id` — ensure products have an `id` when added.

## Examples to follow (copy/paste)

- Add to cart (from a detail or list screen):
  - const { addToCart } = useCart();
  - addToCart(product);

- Navigate with product payload:
  - navigation.navigate("ProductDetail", { product: item });

## Files to inspect when changing behavior

- Global state: `context/CartContext.js`
- Router/layout: `app/_layout.jsx`, `app/index.jsx` (pick one)
- Screens: `bottomTab/*.jsx` (homescreen, carts creen, profilescreen, productDetailScreen, searchResultsScreen)
- Firebase config: `bottomTab/firebaseConfig.js`
- Project metadata & scripts: `package.json`

## Small checklist for contributors

1. Decide router approach (expo-router vs manual). If switching, update `package.json` `main` or remove the unused root to avoid duplicate registration.
2. Ensure `CartProvider` wraps the router exactly once.
3. Replace Firebase placeholders before running auth flows.
4. When adding image assets, add to `Icons/` and reference with `require()`.

If anything above is unclear or you want this file to include CI/test guidance or more examples, tell me which areas to expand and I will iterate.
