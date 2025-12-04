# 🚀 Quick Start Guide - Macmillan Donate Widget POC

## You're Almost Ready!

The development server is running at: **http://localhost:3001**

## ⚠️ Important: Add Your Stripe Key

Before testing, you need to add your Stripe test key:

### Step 1: Get Your Stripe Test Key
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) (or login if you have an account)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_...`)

### Step 2: Add Key to Project
1. Open the file: `.env.local`
2. Replace `pk_test_YOUR_STRIPE_KEY_HERE` with your actual key
3. Save the file
4. The dev server will automatically reload

Example:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123...xyz789
```

## 🧪 Test the Widget

### Test Card Payments
Use these test cards (they won't charge real money):

- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **Postal Code:** Any valid format

### Test Flow
1. Open http://localhost:3001
2. Select an amount (£15, £25, £50, £100) or enter custom
3. Enter your email
4. Click "Pay with Google Pay" (simulated) OR fill in card details
5. See success message!

## 🎨 What to Try

- ✅ Switch between One-time, Monthly, and Collection tabs
- ✅ Try different preset amounts to see different impact messages
- ✅ Enter custom amounts (£1 to £10,000)
- ✅ Test with invalid email to see validation
- ✅ Check mobile view (resize browser or use DevTools)
- ✅ Try keyboard navigation (Tab and Enter keys)
- ✅ Check browser console for mock API logs

## 📱 Mobile Testing

Open Chrome DevTools (F12) → Toggle device toolbar → Select a mobile device

## 🐛 Troubleshooting

### Widget doesn't load?
- Check browser console for errors
- Make sure `.env.local` file exists
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Stripe errors?
- Make sure you added your Stripe key to `.env.local`
- Key should start with `pk_test_`
- No quotes needed around the key

### Port already in use?
- Server will automatically try port 3001, 3002, etc.
- Check terminal output for the actual port

## 🎯 Workshop Demo Points

**Key Features to Showcase:**
1. ✨ Clean, mobile-optimized UI
2. 💚 Macmillan brand colors throughout
3. 💰 Flexible donation amounts
4. 💡 Dynamic impact messages
5. 💳 Multiple payment options (Google Pay + Card)
6. ✅ Form validation and error handling
7. 🎉 Clear success confirmation
8. ♿ Accessible (keyboard, screen readers)

**Technical Highlights:**
- Built with Next.js 14 + React
- Styled with SASS (no Tailwind)
- Stripe Elements integration
- Mock API for POC (ready for backend)
- Extension points for future features
- Clean component architecture

## 📚 Next Steps

### For Production:
1. Replace mock API with real backend
2. Implement real Google Pay (Stripe Payment Request API)
3. Add Gift Aid opt-in
4. Add returning donor recognition
5. Add analytics tracking
6. Add comprehensive error handling
7. Add automated tests
8. Add monitoring and logging

### Code Tour:
- **Main Widget:** `components/DonateWidget.js`
- **Styles:** `styles/DonateWidget.module.scss`
- **Mock API:** `utils/mockApi.js`
- **Impact Messages:** `utils/impactMessages.js`
- **Payment Hook:** `hooks/useStripePayment.js`

## 💡 Pro Tips

- All console.log statements are prefixed with `[MOCK API]` or `[MOCK ANALYTICS]`
- Future enhancement points are marked with `// FUTURE ENHANCEMENT:` comments
- All colors use SASS variables from `styles/variables.scss`
- Components are mobile-first (small screen → larger)

---

**Ready to demo? Open http://localhost:3001 and start donating! 🎉**
