# GamesDeck

A **Nuxt (Vue)** web app to discover and watch live streams powered by the **Twitch Developers API**.

## Live demo
Production deployment (Vercel):
- https://games-deck.vercel.app/

## What it does
- Browse and discover Twitch live streams.
- Fetches real-time data from the Twitch Developers API (Helix).
- Simple, responsive UI built with Vue/Nuxt.

## Tech stack
- **Nuxt** (Vue)
- **Twitch Developers API** (Helix)
- Deployed on **Vercel**

## Prerequisites
- Node.js (LTS recommended)
- A Twitch Developer application (Client ID / Client Secret)

## Twitch setup
1. Create an app in the Twitch Developer Console.
2. Copy your **Client ID** and **Client Secret**.
3. If your implementation uses OAuth redirects, add your local and production redirect URLs in the Twitch app settings.

## Environment variables
Create a `.env` file (or `.env.local`) and set your Twitch credentials.

> Note: variable names can differ depending on your implementation. Adjust them to match your code.

Example:
```bash
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
# If you use OAuth:
TWITCH_REDIRECT_URI=http://localhost:3000
```

## Install
```bash
git clone https://github.com/marcoslgl/GamesDeck.git
cd GamesDeck
npm install
```

## Run (development)
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Contributing
PRs are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "Add X"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

## License
Add a license if you want (e.g., MIT).