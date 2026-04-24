# Simon's Portfolio

Modern, responsive portfolio built with Vite + React. Includes an AI assistant powered by Gemini.

# www.simonolawuyi.com
## Tech Stack

- React 19 + TypeScript
- Vite 6
- Gemini API via `@google/genai`

## Local Development

**Prerequisites:** Node.js (18+ recommended)

1. Install dependencies:
   `npm install`
2. Set `GEMINI_API_KEY` in a `.env.local` file (same folder as `package.json`).
3. Start the dev server:
   `npm run dev`

## Build

`npm run build`

Output is generated in the `dist` folder.

## Deploy to Render (Static Site)

1. Create a new **Static Site** on Render and connect this repo.
2. Set **Build Command** to `npm install; npm run build`.
3. Set **Publish Directory** to `dist`.
4. Add an environment variable: `GEMINI_API_KEY`.
5. If using client-side routing, enable SPA fallback (serve `index.html`).

## License

MIT
