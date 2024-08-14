This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

## Environment Variables

To get the project up and running locally, you need to configure several environment variables. Please follow these steps:

1. **Create a `.env` File:**

   In the root directory of your project, create a file named `.env`.

2. **Add the Required Environment Variables:**

   Open the `.env` file and add the following variables:

   ```plaintext
   DB_URL="your_database_url_here"
   RESEND_API="your_resend_api_key_here"
   NEXT_AUTH_SECRET="your_next_auth_secret_here"
   OPEN_AI_API_KEY="your_openai_api_key_here"
