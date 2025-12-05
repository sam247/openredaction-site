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
- `NEXT_PUBLIC_STRIPE_BASE_PRICE_ID` - Base subscription price ID (for metered billing)
- `NEXT_PUBLIC_STRIPE_METERED_PRICE_ID` - Metered usage price ID (for metered billing)
- `STRIPE_METER_ID` - Meter ID for tracking usage
- `STRIPE_METER_EVENT_NAME` - Meter event name (default: `openredaction_api_requests`)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret (starts with `whsec_`)

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
4. Webhook endpoint is configured:
   - URL: `https://openredaction.com/api/webhooks/stripe`
   - Webhook Secret: `whsec_oAr8gywKHBFoB0QUR7N4T5J5lbtwm4kX`
   - Events configured:
     - `checkout.session.completed`
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
| `NEXT_PUBLIC_STRIPE_BASE_PRICE_ID` | Base subscription price ID (for metered billing) | Yes (for metered billing) |
| `NEXT_PUBLIC_STRIPE_METERED_PRICE_ID` | Metered usage price ID (for metered billing) | Yes (for metered billing) |
| `STRIPE_METER_ID` | Meter ID for tracking API usage | Yes (for metered billing) |
| `STRIPE_METER_EVENT_NAME` | Meter event name (default: `openredaction_api_requests`) | Yes (for metered billing) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (starts with `whsec_`) | Yes (for webhooks) |
| `NEXT_PUBLIC_API_URL` | OpenRedaction API URL | No (defaults to production) |
| `NEXT_PUBLIC_APP_URL` | Your app URL | No (for redirects) |

## API Integration

### Hosted API Usage

The site integrates with the OpenRedaction hosted API for AI-assist functionality:

- **Base URL**: `https://openredaction-api.onrender.com`
- **AI Detect Endpoint**: `POST /ai-detect`
- **Rate Limits**:
  - **Free Tier**: IP-based limits (fair-use, anonymous)
  - **Pro Tier**: 50,000 AI-assist requests/month with API key

#### Using the Hosted API

To use the hosted API with an API key:

```javascript
const response = await fetch('https://openredaction-api.onrender.com/ai-detect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE' // Optional: omit for free tier
  },
  body: JSON.stringify({
    text: 'Your text to redact here'
  })
});

const data = await response.json();
// Response includes: { entities: [...], aiUsed: true/false }
```

#### Response Headers

The API returns usage information in response headers:
- `X-Usage-Count`: Current usage count
- `X-Usage-Limit`: Monthly limit
- `X-Usage-Reset`: Reset date (ISO 8601)

#### Error Codes

- `401` with `INVALID_KEY`: Invalid or missing API key
- `429` with `RATE_LIMIT`: Rate limit exceeded
- `400` with `TEXT_TOO_LONG`: Input text exceeds maximum length (50,000 characters)

#### Getting an API Key

1. Visit [openredaction.com/pricing](https://openredaction.com/pricing)
2. Subscribe to the Pro tier (£9/month)
3. Check your email for your API key
4. Use the key in the `x-api-key` header

For more details, see:
- [API Documentation](https://github.com/sam247/openredaction-api)
- [Site Documentation](/docs) - Complete API usage guide
- [Playground](https://openredaction.com/playground) - Try the API in your browser

## License

MIT

## Support

For issues and questions:
- Open an issue on GitHub
- Contact support@openredaction.com

