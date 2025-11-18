This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack

[x] React/NextJS

[x] Typescript

[x] Tailwind/shadcn

[x] Postgres/prisma

[x] BetterAuth

[x] Zod

[x] Tanstack-form

[x] Tanstack Query

[x] Tailwind prettier

[x] EsLint

[x] Prettier

[x] de quoi envoyer des mails (resend/react-email)

[x] email de confirmation après inscription

[x] Dark mode ? dans les settings peut être

[x] reset Password avec envoie d'email

[ ] mettre des loaders partout où il y a besoin:
au signup
au sign in

[ ] ajout de toast ?

[ ] avoir une page landing

avoir une page profile ou on peut modifier ses infos:

- username
- mail et password si connecté avec
- supprimer son compte

[ ] 2FA (TOTP, OTP ...)

[ ] vérifier tout ce qui touche à la connexion/inscription :
j'ai pas de compte je vais sur :
/profile => doit être rédirigé vers /signin
/signin, je mets des ids qui n'existent pas => form affiche un message qui dit invalid email et password
/signin avec id valides => redirection /profile
/signup, avec id existant => error compte existant avec cette email
/signup, avec id inexistant => on affiche la modale pour dire qu'il faut vérifier son mail, le bouton "done" redirige vers signin pour que l'user puise se connecter (apres avoir vérifier son adresse).
si l'user n'a pas vérifié son mail et qu'il va sur signin, apres avoir renseigné ses infos il est rediriger vers verify-email et peut renvoyer un email pour vérifier son adresse
un user avec une adresse non vérifié ne peut pas accéder à /profile

[ ] invalider les boutons de form quand on submit le form

### Later :

[ ] Sentry

[ ] Stripe

[ ] multi langue ? (i18n)

[ ] notification ?

analytics avec Intégration simple avec Plausible / Posthog / Vercel Analytics
tests : E2E, unit-test, intégration
rate limit sur login/signup : désactivation apres X tentatives
Husky ?

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## To do before using the Boilerplate

- [ ] Add resend's API key and verify your domain

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
