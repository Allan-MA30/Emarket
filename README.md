# NestLink — Group Project

## Tech Stack
- Vue 3 (Composition API + `<script setup>`)
- Vue Router 4
- Pinia (state management)
- Vite (build tool)

## Getting Started
```bash
npm install
npm run dev
```

## Project Structure
```
src/
  views/           ← Each person owns their file(s)
  stores/          ← Shared data — read the comments inside before editing
  components/      ← Shared UI components
  router/          ← Routes (don't add routes without telling team leader)
  assets/main.css  ← Global styles & CSS variables — DO NOT change variable names
```

## Task Assignments
| File | Assigned To | Status |
|------|------------|--------|
| views/Home.vue | TBD | 🔲 Todo |
| views/Contacts.vue | TBD | 🔲 Todo |
| views/PropertyBuy.vue | TBD | 🔲 Todo |
| views/PropertyRent.vue | TBD | 🔲 Todo |
| views/AuthRegister.vue | TBD | 🔲 Todo |
| views/AuthLogin.vue | TBD | 🔲 Todo |
| views/PropertySell.vue | Jean (Team Lead) | ✅ Done |
| views/SellerDashboard.vue | Jean (Team Lead) | ✅ Done |
| stores/listings.js | Jean (Team Lead) | ✅ Done |
| stores/auth.js | Auth teammate | 🔲 Todo |
| stores/enquiries.js | Jean (Team Lead) | ✅ Done |
| components/Navbar.vue | Jean (Team Lead) | ✅ Done |

## Rules
1. **Only edit your own file** in `views/`
2. **Read the comments** inside each store before using it
3. **Use CSS variables** from `main.css` — never hardcode colors
4. **Work on your own branch**, then create a Pull Request to merge
5. **Never push directly to main**

## Git Workflow
```bash
git checkout -b your-name/feature-name   # create your branch
# ... do your work ...
git add .
git commit -m "feat: implement Home page"
git push origin your-name/feature-name
# then open a Pull Request on GitHub
```

## CSS Variables (use these everywhere)
```css
var(--navy)       /* main dark background */
var(--navy-2)     /* slightly lighter surface */
var(--navy-3)     /* card/section background */
var(--gold)       /* primary accent color */
var(--text-main)  /* primary text */
var(--text-muted) /* secondary/hint text */
var(--border)     /* borders */
var(--surface)    /* card backgrounds */
var(--radius)     /* border radius */
var(--font)       /* font family */
```
