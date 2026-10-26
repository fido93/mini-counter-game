# Guess My Number

A simple mobile number-guessing game built with Expo and React Native. Think of a number, and let the app guess it using your higher-or-lower hints.

## How to Play

1. Enter a number between **1 and 99** and tap **Confirm**.
2. The app makes a guess. Tap **−** if your number is lower, or **+** if it's higher.
3. The game ends when the app guesses your number. Each guess is shown in a log.

Lying about a hint triggers a "Don't lie!" warning.

## Tech Stack

- [Expo](https://expo.dev) (SDK 58) and React Native
- TypeScript
- Expo Router-free navigation via simple screen state
- ESLint, Prettier, and Husky for code quality

## Getting Started

### Prerequisites

- Node.js (LTS)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android/iOS emulator

### Installation

```bash
npm install
```

### Run the App

```bash
npm start       # start the Expo dev server
npm run android # open on Android
npm run ios     # open on iOS
npm run web     # open in the browser
```

## Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run lint`       | Run Expo lint                    |
| `npm run lint:check` | Lint with zero warnings allowed  |
| `npm run typecheck`  | Type-check with TypeScript       |
| `npm run format`     | Format the project with Prettier |

## Project Structure

```
├── App.tsx           # Root component and screen switching
├── screens/          # StartGameScreen, GameScreen, GameOverScreen
├── components/       # Reusable UI pieces (Card, Title, buttons, ...)
├── constants/        # Shared colors and styles
└── assets/           # Fonts and images
```

## License

This project is licensed under the terms in the [LICENSE](LICENSE) file.
