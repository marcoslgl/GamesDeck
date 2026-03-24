# GamesDeck

A web app to discover and watch live streams powered by the **Twitch Developers API** (Helix).

## Live demo
Production deployment (Vercel):
- https://games-deck.vercel.app/

## Features
- Browse and discover Twitch live streams
- Real-time data fetched from Twitch Helix endpoints
- Responsive UI built with Nuxt + Vue

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
3. If your project uses OAuth redirects, add your local and production redirect URLs in the Twitch app settings.

## Environment variables
Create a `.env` file (or `.env.local`) and add your Twitch credentials.

> Note: exact variable names depend on your implementation. Adjust to match the ones used in your code.

Example:
```bash
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
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

## Build / Preview
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
