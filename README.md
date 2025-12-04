# Macmillan Express Donate Widget - MVP POC

A mobile-optimized express donation widget for Macmillan Cancer Support, built as a proof-of-concept (POC) to demonstrate core functionality with Google Pay and card payments.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Stripe account (free test account)

### Installation

1. **Clone or navigate to the project:**
```bash
cd donate-widget
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Stripe:**
   - Create a free Stripe account at [stripe.com](https://stripe.com)
   - Get your test publishable key from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy `.env.local.example` to `.env.local`
   - Add your Stripe key to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The donation widget will load on the page

## 🧪 Testing Payments

This is a POC using **mock API responses** for demonstration purposes. Payments are simulated and not processed for real.

### Test Google Pay (Simulated)
1. Click "Pay with Google Pay" button
2. Payment will be simulated successfully
3. See success confirmation

### Test Card Payments (Stripe Test Mode)

Use these Stripe test card numbers:

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | Visa - Successful payment |
| `5555 5555 5555 4444` | Mastercard - Successful payment |
| `4000 0025 0000 3155` | Visa - Requires 3D Secure |
| `4000 0000 0000 9995` | Visa - Declined card |

**Other test details:**
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **Postal Code:** Any valid format

### Testing Different Scenarios

1. **Test preset amounts:** Click £15, £25, £50, or £100 buttons
2. **Test custom amounts:** Enter any amount between £1 and £10,000
3. **Test donation types:** Switch between One-time, Monthly, and Collection
4. **Test validation:** Try submitting without email or with invalid email
5. **Test impact messages:** See different messages for different amounts

## 📁 Project Structure

```
donate-widget/
├── app/
│   ├── layout.js          # Root layout with metadata
│   └── page.js            # Home page with widget
├── components/
│   ├── DonateWidget.js    # Main widget component
│   ├── AmountSelector.js  # Amount selection buttons
│   ├── PaymentSection.js  # Payment form and methods
│   └── SuccessMessage.js  # Success confirmation
├── hooks/
│   └── useStripePayment.js # Payment processing hook
├── utils/
│   ├── mockApi.js         # Mock API responses (POC)
│   └── impactMessages.js  # Static impact messages
├── styles/
│   ├── globals.scss       # Global styles
│   ├── variables.scss     # SASS variables
│   └── DonateWidget.module.scss # Widget styles
└── package.json
```

## 🎨 Design Features

- **Mobile-first:** Optimized for mobile devices (max-width: 448px)
- **Touch-friendly:** Minimum 44px touch targets
- **Accessible:** Semantic HTML, ARIA labels, keyboard navigation
- **Brand colors:** Macmillan green (#00853E) throughout
- **Responsive:** Works on all screen sizes

## 🔧 Technology Stack

- **Framework:** Next.js 14 (React)
- **Styling:** SASS/SCSS
- **Payment Processing:** Stripe Elements
- **State Management:** React useState/useContext
- **Form Validation:** HTML5 + custom validation

## 🚧 Current Limitations (POC Phase)

This is a proof-of-concept with the following limitations:

1. **Mock API:** All backend calls are simulated
2. **No Database:** Donations are not stored
3. **No Email:** Confirmation emails are not sent
4. **Google Pay Simulation:** Google Pay button is simulated, not real integration
5. **No Gift Aid:** Gift Aid opt-in not implemented
6. **No Returning Donors:** Donor recognition not implemented
7. **Test Mode Only:** Stripe is in test mode

## 🔮 Future Enhancements

The architecture is designed to support these future features:

### 1. **Dynamic Impact API Integration**
```javascript
// Current: Static messages
getImpactMessage(amount)

// Future: API-driven
async function getImpactMessage(amount, donationType, userContext) {
  const response = await fetch('/api/impact/calculate', {
    method: 'POST',
    body: JSON.stringify({ amount, donationType, userContext })
  });
  return response.impactMessage;
}
```

### 2. **Returning Donor Recognition**
- Check donor database by email
- Show "Welcome back" message
- Display saved payment methods
- Pre-fill donor information

### 3. **Advanced Payment Options**
- Apple Pay integration
- PayPal
- Direct debit (UK)
- Bank transfer

### 4. **Gift Aid Integration**
- Add Gift Aid opt-in checkbox
- Capture taxpayer information
- Calculate Gift Aid value
- Store Gift Aid declarations

### 5. **Additional Features**
- Tribute/memorial donations
- Corporate matching donations
- Recurring donation management
- Multi-currency support
- Social sharing after donation
- Donation impact tracking
- Donor dashboard

### 6. **Analytics Integration**
Extension points already in code:
```javascript
trackEvent('donation_completed', {
  amount, donationType, donationId
});
```

Future platforms:
- Google Analytics
- Segment
- Custom analytics dashboard

### 7. **Backend Integration**

Replace mock API calls with real endpoints:

**Required API Endpoints:**
- `POST /api/donations/create` - Create payment intent
- `POST /api/donations/confirm` - Confirm payment
- `POST /api/donors/check` - Check returning donor
- `GET /api/impact/calculate` - Get dynamic impact message

## 📝 Development Notes

### Adding a New Component

Components use SASS modules for styling:

```javascript
import styles from '@/styles/ComponentName.module.scss';

export default function ComponentName() {
  return <div className={styles['class-name']}>...</div>;
}
```

### Modifying Styles

All brand colors are in `styles/variables.scss`:
- `$macmillan-green: #00853E`
- `$macmillan-dark-green: #006B32`
- `$macmillan-light-green: #E8F5E9`

### Adding New Payment Methods

1. Add method to `useStripePayment.js` hook
2. Add UI button in `PaymentSection.js`
3. Update mock API in `utils/mockApi.js`

## 🐛 Known Issues

- Google Pay button is a simulation (not real Stripe Payment Request)
- No error retry logic for failed payments
- Form does not persist on navigation
- No loading states for impact messages

## 📖 Stripe Documentation

- [Stripe Elements](https://stripe.com/docs/stripe-js/react)
- [Payment Request Button (Google Pay)](https://stripe.com/docs/stripe-js/elements/payment-request-button)
- [Test Cards](https://stripe.com/docs/testing#cards)

## 🤝 Contributing

This is a POC. For production:
1. Replace mock API with real backend
2. Add comprehensive error handling
3. Add unit and integration tests
4. Add security measures (CSRF, rate limiting)
5. Add monitoring and logging
6. Add performance optimization

## 📄 License

POC for Macmillan Cancer Support

---

## 🎯 Workshop Demo Checklist

- [ ] Widget loads correctly
- [ ] Amount selection works
- [ ] Impact messages display
- [ ] Google Pay simulation works
- [ ] Card payment works (test card)
- [ ] Success message appears
- [ ] Mobile responsive design
- [ ] Accessible (keyboard navigation)
- [ ] Donation type switching works
- [ ] Custom amounts work
- [ ] Validation errors show correctly

## 💡 Tips

- Keep browser console open to see mock API logs
- Use Chrome DevTools mobile view to test responsive design
- Check Network tab (even though API is mocked)
- Test with keyboard only for accessibility

---

**Built with ❤️ for Macmillan Cancer Support**
