# Imposter

A simple, offline party game for your mobile device. Pass the phone, find the imposter, and don't get voted out!

![Imposter Gameplay Screenshot](https://i.imgur.com/gDqJd6k.png)

## What is Imposter?

Imposter is a mobile party game designed for a single phone, perfect for groups of friends and family. Players secretly receive a role: either a "Civilian" who gets a secret word, or an "Imposter" who is left in the dark. The goal is simple: the civilians must work together to identify and vote out the imposters, while the imposters must blend in and survive.

All gameplay happens offline on one device, making it the perfect game for road trips, waiting in line, or any time you want to have some fun without needing an internet connection.

## Key Features

*   **Fully Offline:** No internet connection required. Play it anywhere, anytime.
*   **Single Device Gameplay:** All you need is one phone for a whole group to play.
*   **Customizable Word Pool:** Add your own inside jokes, themed words, or anything you can think of to make the game your own.
*   **Adaptive Imposter Selection:** A smart, built-in algorithm ensures fairness. It tracks recent games to prevent the same players from being chosen as the imposter too often, making each round feel fresh and unpredictable.
*   **Sleek, Themable UI:** A clean, modern interface with multiple color themes to choose from.

## How to Play

1.  **Setup:** The first player sets the number of players and imposters.
2.  **Reveal:** Each player taps the screen to privately view their role. If you're a civilian, you'll see the secret word. If you're an imposter, you'll just see "IMPOSTER".
3.  **Discuss:** Once everyone has their role, the discussion begins! Players talk about the word, trying to prove they know what it is without giving it away. Imposters must pretend they know the word and blend in.
4.  **Vote:** After the discussion, players vote on who they think the imposter is.
5.  **Win:** The civilians win if they successfully vote out all the imposters. The imposters win if they survive long enough to outnumber the civilians.

## Local Development Setup

This project is a standard React web application. To run it locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/imposter.git
    cd imposter
    ```

2.  **Install dependencies:**
    You can use either `npm` or `yarn`.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    This will start a local server, and you can open the provided URL in your browser.
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Building for Production

To create a static, production-ready build of the application, run the following command:

```bash
npm run build
# or
yarn build
```

This will generate a `dist` directory containing all the necessary HTML, CSS, and JavaScript files, which can be deployed to any static hosting service.
