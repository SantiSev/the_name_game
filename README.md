# The Name Game

A cross-platform mobile and web app built with **React Native (Expo)** that challenges users to match WillowTree employees to their headshots.

---

## 📱 Platforms

| Platform | Status |
|----------|--------|
| Web | ✅ Supported |
| iOS | ✅ Supported (via Expo Go) |
| Android | ✅ Supported (via Expo Go) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)
- [Expo Go](https://expo.dev/client) on your mobile device (for mobile testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/name_game.git
cd name_game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Standard (requires same WiFi network)
npx expo start

# Tunnel mode (works across any network — recommended)
npx expo start --tunnel
```

---

## 🗂️ Project Structure

```
name_game/
├── app/                        # Expo Router pages (routes)
│   ├── _layout.tsx             # Root navigation layout
│   ├── index.tsx               # Main menu screen
│   └── game.tsx                # Game screen
├── src/
│   ├── assets/                 # Images, fonts, icons
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── screens/                # Full page screen components
│   ├── services/               # Services dedicated to API calls and others
│   ├── types/                  # TypeScript interfaces
│   ├── utils/                  # Helper functions
├── .github/
│   └── workflows/
│       └── build-check.yml     # CI/CD pipeline
├── global.css                  # NativeWind/Tailwind base styles
├── tailwind.config.js          # NativeWind configuration
├── app.json                    # Expo configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🎯 Game Modes

### Practice Mode *(Mobile & Web)*
- 6 random employee headshots are displayed
- The name of one employee is shown — pick the correct headshot
- One wrong guess ends the game and shows your score
- Click OK to return to the menu

### Timed Mode *(Mobile only)*
- Same concept as Practice Mode
- Wrong guesses don't end the game — keep guessing until correct
- Score as many correct matches as you can before the timer runs out
- Final score is displayed when time is up

---

## 🏗️ Architecture

This project follows an **MVVM-inspired** architecture:

- **Model** → `src/types/index.ts` + `src/services/api.ts` — data shape and fetching
- **ViewModel** → `src/hooks/useGameLogic.ts` — all game state and business logic
- **View** → `src/screens/` + `src/components/` — pure UI, no business logic

This separation means the game logic is completely decoupled from the UI. The screens only receive state and callbacks from the hook — they never directly manage game logic.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Expo](https://expo.dev/) | React Native framework |
| [Expo Router](https://expo.github.io/router/) | File-based navigation |
| [NativeWind v4](https://www.nativewind.dev/) | Tailwind CSS for React Native |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [ESLint](https://eslint.org/) | Code linting |
| [Prettier](https://prettier.io/) | Code formatting |
| [Husky](https://typicode.github.io/husky/) | Git pre-commit hooks |

---


## ✅ CI/CD

Every pull request and push to `main`/`master` triggers a GitHub Actions pipeline that:

1. Installs dependencies with `npm ci`
2. Runs ESLint
3. Runs TypeScript type checking (`tsc --noEmit`)

The PR is blocked from merging if any of these checks fail.

---

## 🔒 Pre-commit Hooks

Husky runs `lint-staged` before every commit:

- ESLint auto-fixes linting issues
- Prettier formats all `.ts` and `.tsx` files

If unfixable errors are found, the commit is blocked.

---

test123