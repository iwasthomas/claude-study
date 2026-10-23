# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bucket-list manager: a static, framework-free web app (vanilla JS + Tailwind via CDN). UI text, comments, and README are in Korean; keep new user-facing strings and comments in Korean to match.

There is no build step, package manager, linter, or test suite. To run, open `index.html` in a browser, or serve the folder (`python -m http.server 8000`). Tailwind loads from `cdn.tailwindcss.com`, so styling needs network access.

## Architecture

Two scripts share globals (no modules/bundler); `index.html` must load `js/storage.js` before `js/app.js`.

- `js/storage.js` — `BucketStorage`, an object literal that is the entire data layer. Every method does a full `load()` (parse the whole array from LocalStorage key `bucketList`), mutates, then `save()`. There is no in-memory cache; LocalStorage is the single source of truth. Also owns derived data: `getStats()` and `getFilteredList(filter)` (`'all' | 'active' | 'completed'`).
- `js/app.js` — `BucketListApp` class, instantiated into the global `app` on `DOMContentLoaded`. Pattern: handler calls `BucketStorage.*`, then `render()`, which re-reads storage, updates the stats, and rebuilds the list via `innerHTML`.
- Item rows are built as HTML strings in `createBucketItemHTML` and wired with inline `onclick="app.handleXxx(...)"`. This is why `app` must stay a global, and why new per-row actions must be exposed as `app` methods (or the rendering switched to event delegation).
- `css/styles.css` only supplements Tailwind: the `.filter-btn.active` state, the `slideIn` animation, and the scrollbar. Filter buttons and the edit modal are toggled via classes (`active`; `hidden`/`flex`), not via Tailwind utilities.

Item shape: `{ id (Date.now() string), title, completed, createdAt (ISO string), completedAt (ISO string | null) }`.

## Gotchas

- Titles are inserted into inline `onclick` attributes after `escapeHtml` plus a `'` → `\'` replacement (`app.js`, edit/delete buttons). Be careful with quoting when changing this; it is fragile for titles containing backslashes or entities.
- `README.md` is partly out of date: it lists an `assets/` folder that doesn't exist and shows `createdAt` as `YYYY-MM-DD`, but the code stores full ISO timestamps.
