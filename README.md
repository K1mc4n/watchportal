# ✨ Watch Portal - Farcaster Mini App Hub

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneynar-community%2Ffarcaster-watch-portal-example)
[![Tech Stack](https://img.shields.io/badge/Next.js-15-blue?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/DB-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Watch Portal is a comprehensive hub and directory for Farcaster Mini Apps and the broader Web3 ecosystem. Built as a fully functional Farcaster Mini App, it serves as a curated "App Store," news aggregator, and community engagement platform.

## 🚀 Key Features

-   **🔍 Dynamic App Directory:** Discover new and popular Farcaster Mini Apps and crypto tools. Features a curated list, community submissions, and robust filtering by chain or search term.
-   **📰 Real-time News Feed:** Stay updated with the latest in Web3, crypto, and Farcaster, powered by the NewsAPI.
-   **📝 Community Submissions:** A dedicated form for users to submit their own applications for review and inclusion in the portal.
-   **🤖 AI-Powered Chat ("Coin Sage"):** An intelligent chatbot powered by Google's Gemini model, trained to answer questions about crypto, Farcaster, and Web3 concepts.
-   **🏆 Weekly Quiz & Leaderboard:** A gamified experience where users can test their knowledge with a weekly crypto quiz and compete for a spot on the leaderboard.
-   **✅ Seamless Farcaster Integration:** Designed as a Farcaster Mini App for a native experience within clients like Warpcast.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) 15 (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **Database & Backend:** [Supabase](https://supabase.io/)
-   **Farcaster Integration:** [Neynar SDK](https://neynar.com/)
-   **Web3:** [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
-   **AI:** [Google Generative AI (Gemini)](https://ai.google.dev/)
-   **News API:** [NewsAPI.org](https://newsapi.org/)
-   **Deployment:** [Vercel](https://vercel.com/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.18 or later recommended)
-   `npm`, `pnpm`, or `yarn`

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YOUR_GITHUB_USERNAME/watchportal-main.git
    cd watchportal-main
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the necessary variables. You can use the example below as a template.

    ```sh
    # .env.local

    # General App Configuration
    NEXT_PUBLIC_URL="http://localhost:3000"
    NEXT_PUBLIC_MINI_APP_NAME="Watch Portal"
    NEXT_PUBLIC_MINI_APP_DESCRIPTION="Your portal to crypto apps and news."
    NEXT_PUBLIC_MINI_APP_PRIMARY_CATEGORY="Discovery"
    NEXT_PUBLIC_MINI_APP_TAGS="apps,news,tools,farcaster,web3"
    NEXT_PUBLIC_MINI_APP_BUTTON_TEXT="Launch Portal"

    # Supabase (for app submissions and quiz leaderboard)
    # Get these from your Supabase project settings
    SUPABASE_URL=""
    SUPABASE_ANON_KEY=""

    # Neynar (for Farcaster integration)
    # Get this from neynar.com
    NEYNAR_API_KEY=""
    
    # Optional: For signing mini-app metadata
    FID=""
    SEED_PHRASE=""

    # External Services
    NEWS_API_KEY=""
    GOOGLE_API_KEY=""
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌍 Environment Variables Explained

| Variable                            | Description                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_URL`                   | The public URL of your deployed application (e.g., `https://your-app.vercel.app`).                        |
| `NEXT_PUBLIC_MINI_APP_NAME`         | The name of your application.                                                                             |
| `NEXT_PUBLIC_MINI_APP_DESCRIPTION`  | A short description of your app.                                                                          |
| `SUPABASE_URL`                      | The Project URL from your Supabase project's API settings.                                                |
| `SUPABASE_ANON_KEY`                 | The `anon` public key from your Supabase project's API settings.                                          |
| `NEYNAR_API_KEY`                    | Your API key from the [Neynar Dashboard](https://neynar.com/). Required for all Farcaster interactions.    |
| `NEWS_API_KEY`                      | Your API key from [NewsAPI.org](https://newsapi.org/). Required for the News feature.                     |
| `GOOGLE_API_KEY`                    | Your API key from [Google AI Studio](https://aistudio.google.com/app/apikey). Required for the Chat AI feature. |
| `FID` & `SEED_PHRASE`               | (Optional) Your Farcaster ID and seed phrase to sign the Mini App manifest. Provides authenticity.       |

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Fork the repository to your own GitHub account.
2.  Click the "Deploy with Vercel" button at the top of this README, or create a new project on Vercel and import your forked repository.
3.  During setup, add the environment variables listed above to your Vercel project's settings.

## 📜 License

Distributed under the MIT License. See `LICENSE.md` for more information.
