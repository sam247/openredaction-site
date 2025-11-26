# OpenRedaction Site

A Next.js website for the OpenRedaction API, featuring a modern dark theme inspired by mem0.ai.

## Features

- 🎨 Modern dark theme UI matching mem0.ai design
- 🔑 API key management dashboard
- 💳 Stripe integration for subscriptions
- 📊 Usage tracking and rate limit display
- 📚 Comprehensive API documentation
- 🚀 Built with Next.js 14, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sam247/openredaction-site.git
cd openredaction-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Stripe keys:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (starts with `pk_`)
- `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
- `NEXT_PUBLIC_STRIPE_PRICE_ID` - Your Stripe price ID (from Stripe Dashboard, create a product and price)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret (from Stripe Dashboard, starts with `whsec_`)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
openredaction-site/
├── app/
│   ├── api/              # API routes (Stripe webhooks, checkout)
│   ├── dashboard/        # User dashboard for API key management
│   ├── docs/             # API documentation
│   ├── pricing/          # Pricing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Site header/navigation
│   └── Footer.tsx        # Site footer
└── lib/
    └── utils.ts          # Utility functions
```

## Stripe Integration

### Setting up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product and price in the Stripe Dashboard
3. Add the price ID to your environment variables
4. Set up a webhook endpoint in Stripe Dashboard:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

### API Key Management

- Free tier keys are prefixed with `free_`
- Paid tier keys are prefixed with `paid_`
- Keys are stored in localStorage (in production, use a database)
- When a user subscribes, their API key should be updated to the paid format

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Render
- AWS Amplify
- Railway

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (starts with `pk_`) | Yes (for payments) |
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_`) | Yes (for payments) |
| `NEXT_PUBLIC_STRIPE_PRICE_ID` | Stripe price ID (from product/price in dashboard) | Yes (for payments) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (starts with `whsec_`) | Yes (for webhooks) |
| `NEXT_PUBLIC_API_URL` | OpenRedaction API URL | No (defaults to production) |
| `NEXT_PUBLIC_APP_URL` | Your app URL | No (for redirects) |

## API Integration

The site integrates with the OpenRedaction API:

- **Base URL**: `https://openredaction-api.onrender.com`
- **Endpoints**:
  - `POST /v1/redact` - Redact PII from text
  - Rate limiting: Free (100/day), Pro (10,000/day)

See the [API documentation](https://github.com/sam247/openredaction-api) for more details.

## License

MIT

## Support

For issues and questions:
- Open an issue on GitHub
- Contact support@openredaction.com

