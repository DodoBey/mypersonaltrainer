### My Personal Trainer

\*\*This is a FullStack Next.js application to create workout plans for the user without hassle with the help of OpenAI API.

### Stack

- Next.js
- Clerk
- Tailwind & DaisyUi
- OpenAI
- Axios
- Tanstack/React Query
- Prisma
- React Hot Toaster

### Progress

- [x] Boilerplate
- [x] Required Dependencies Installed
- [x] Homepage
- [x] Clerk Integration
- [x] SideBar (in progress...)
- [x] Profile Page
- [x] Workout Page
- [x] Generate Workout Page
- [x] OpenAI Integration
- [x] PDF Generator Integration
- [x] DB integration and saving the workouts
- [x] UX Implementations (such as toast, loader, error, etc.)
- [ ] Stripe payment will be integrated for `Buy Token` functionality
- [ ] And will be adding/upgrading the feature based on the feedback

# To Test It Out

I have deployed the app on Vercel and Render. Before I deploy the app, I put a limitation for each user since OpenAI charges me for each token usage. I give 2000 Tokens for every account, the maximum token usage for a request of 7 days of workout creation is around ~850 tokens, average token usage on each chat request is around ~100. If the user has less than 750 tokens, creating a workout won't work or if the user has less than 80 tokens, chat won't work too. I'll implement Stripe for extra token requests.

This is just an experiment for now, so please do not create 100 new users to use thousands of tokens🥲

### Vercel

Due to a Serverless Function Maximum Execution Duration on Vercel, it returns 504 - Timeout when the user tries to create a new workout. The rest works fine.

_[Vercel Link](https://mypersonaltrainer.vercel.app/)_

### Render

In addition to Vercel, I deployed the app into Render too, it doesn't have limitations for the serverless execution but it's slow. Also since my instance is on a free tier, it will spin down with inactivity, which can delay requests by 50 seconds or more. And due to it speed, sometimes it works glitchy when the requests are so slow but generally all the functionalities are ready to test on Render.

_[Render Link](https://mypersonaltrainer.onrender.com/)_

### Getting Started

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
