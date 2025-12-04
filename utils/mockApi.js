/**
 * Mock API functions for POC
 * These simulate backend API calls for donation processing
 * 
 * FUTURE ENHANCEMENT: Replace with real API endpoints
 * Backend endpoints needed:
 * - POST /api/donations/create
 * - POST /api/donations/confirm
 * - POST /api/donors/check (for returning donor recognition)
 * - GET /api/impact/calculate (for dynamic impact messages)
 */

/**
 * Simulate network delay
 * @param {number} ms - Milliseconds to delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock: Create a donation intent
 * Real implementation would create a Stripe Payment Intent
 * 
 * @param {Object} data - Donation data
 * @returns {Promise<Object>} - Mock client secret
 */
export async function createDonation(data) {
  const { amount, donationType, email } = data;
  
  console.log('[MOCK API] Creating donation:', { amount, donationType, email });
  
  // Simulate API call delay
  await delay(800);
  
  // Mock response
  return {
    success: true,
    clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
    donationId: `don_${Date.now()}`,
    amount,
    currency: 'gbp'
  };
}

/**
 * Mock: Confirm donation after payment
 * Real implementation would verify payment with Stripe
 * 
 * @param {Object} data - Confirmation data
 * @returns {Promise<Object>} - Confirmation response
 */
export async function confirmDonation(data) {
  const { donationId, paymentMethod, email } = data;
  
  console.log('[MOCK API] Confirming donation:', { donationId, paymentMethod, email });
  
  // Simulate API call delay
  await delay(1000);
  
  // Mock successful response
  return {
    success: true,
    donationId,
    receiptNumber: `RCP-${Date.now()}`,
    message: 'Thank you for your donation!',
    timestamp: new Date().toISOString()
  };
}

/**
 * Mock: Process Google Pay payment
 * Real implementation would use Stripe Payment Intent with Google Pay
 * 
 * @param {Object} paymentData - Google Pay payment data
 * @returns {Promise<Object>} - Payment confirmation
 */
export async function processGooglePayPayment(paymentData) {
  const { amount, donationType, email } = paymentData;
  
  console.log('[MOCK API] Processing Google Pay payment:', { amount, donationType, email });
  
  // Simulate payment processing
  await delay(1500);
  
  // Mock successful payment
  return {
    success: true,
    donationId: `don_gpay_${Date.now()}`,
    receiptNumber: `RCP-${Date.now()}`,
    amount,
    paymentMethod: 'google_pay',
    timestamp: new Date().toISOString()
  };
}

/**
 * Mock: Process card payment
 * Real implementation would use Stripe Payment Intent with card
 * 
 * @param {Object} paymentData - Card payment data
 * @returns {Promise<Object>} - Payment confirmation
 */
export async function processCardPayment(paymentData) {
  const { amount, donationType, email, name } = paymentData;
  
  console.log('[MOCK API] Processing card payment:', { amount, donationType, email, name });
  
  // Simulate payment processing
  await delay(1500);
  
  // Mock successful payment
  return {
    success: true,
    donationId: `don_card_${Date.now()}`,
    receiptNumber: `RCP-${Date.now()}`,
    amount,
    paymentMethod: 'card',
    timestamp: new Date().toISOString()
  };
}

/**
 * FUTURE ENHANCEMENT: Check if donor is returning
 * This would check the donor database by email
 * 
 * @param {string} email - Donor email
 * @returns {Promise<Object>} - Donor information
 */
export async function checkReturningDonor(email) {
  console.log('[MOCK API] Checking returning donor:', email);
  
  await delay(500);
  
  // Mock: Always return as new donor for POC
  return {
    isReturning: false,
    savedPaymentMethods: []
  };
  
  // Future implementation would return:
  // {
  //   isReturning: true,
  //   donorName: 'John Doe',
  //   lastDonation: '2024-01-15',
  //   totalDonations: 5,
  //   savedPaymentMethods: [
  //     { id: 'pm_xxx', last4: '4242', brand: 'visa' }
  //   ]
  // }
}

/**
 * FUTURE ENHANCEMENT: Analytics tracking
 * Send events to analytics platform
 * 
 * @param {string} eventName - Event name
 * @param {Object} properties - Event properties
 */
export function trackEvent(eventName, properties = {}) {
  console.log('[MOCK ANALYTICS]', eventName, properties);
  
  // Future: Send to Google Analytics, Segment, or custom analytics
  // Example:
  // gtag('event', eventName, properties);
  // analytics.track(eventName, properties);
}

/**
 * Mock: Validate donation amount
 * @param {number} amount - Amount to validate
 * @returns {Object} - Validation result
 */
export function validateAmount(amount) {
  const MIN_AMOUNT = 1;
  const MAX_AMOUNT = 10000;
  
  if (!amount || amount < MIN_AMOUNT) {
    return {
      valid: false,
      error: `Minimum donation amount is £${MIN_AMOUNT}`
    };
  }
  
  if (amount > MAX_AMOUNT) {
    return {
      valid: false,
      error: `Maximum donation amount is £${MAX_AMOUNT}. For larger donations, please contact us directly.`
    };
  }
  
  return { valid: true };
}

/**
 * Mock: Validate email
 * @param {string} email - Email to validate
 * @returns {Object} - Validation result
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return {
      valid: false,
      error: 'Email is required'
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: 'Please enter a valid email address'
    };
  }
  
  return { valid: true };
}
