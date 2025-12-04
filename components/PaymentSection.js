import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import styles from '../styles/DonateWidget.module.scss';
import { useStripePayment } from '../hooks/useStripePayment';

/**
 * PaymentSection Component
 * Handles Google Pay and card payment forms
 * 
 * @param {number} amount - Donation amount
 * @param {string} donationType - Type of donation
 * @param {function} onPaymentSuccess - Success callback
 * 
 * FUTURE ENHANCEMENTS:
 * - Add Apple Pay support
 * - Add PayPal option
 * - Add saved payment methods for returning donors
 * - Add Gift Aid opt-in
 */
export default function PaymentSection({ amount, donationType, onPaymentSuccess }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardFocused, setCardFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  
  const { handleGooglePayPayment, handleCardPayment, isProcessing, error } = useStripePayment();

  /**
   * Handle Google Pay button click
   * POC: Simulates Google Pay payment
   * Production: Would use Stripe Payment Request API
   */
  const handleGooglePay = async () => {
    if (!email) {
      setEmailError('Email is required for Google Pay');
      return;
    }
    
    setEmailError('');
    
    const result = await handleGooglePayPayment({
      amount,
      donationType,
      email
    });
    
    if (result.success) {
      onPaymentSuccess(result.data);
    }
  };

  /**
   * Handle card payment form submission
   */
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    let hasError = false;
    
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }
    
    if (!name || name.trim().length < 2) {
      setNameError('Name is required (minimum 2 characters)');
      hasError = true;
    } else {
      setNameError('');
    }
    
    if (hasError) return;
    
    const result = await handleCardPayment({
      amount,
      donationType,
      email,
      name
    });
    
    if (result.success) {
      onPaymentSuccess(result.data);
    }
  };

  // Stripe Card Element styling
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#212121',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        '::placeholder': {
          color: '#616161',
        },
      },
      invalid: {
        color: '#D32F2F',
      },
    },
  };

  return (
    <div className={styles['payment-section']}>

        <button
          type="submit"
          className={styles['donate-button']}
          disabled={isProcessing || !amount}
        >
          {isProcessing ? (
            <>
              <span className={styles.spinner}></span>
              <span style={{ marginLeft: '8px' }}>Processing...</span>
            </>
          ) : (
            `Donate £${amount}`
          )}
        </button>
      {/* Email field (shared for both payment methods) */}
      {/* <div className={styles['form-group']}>
        <label htmlFor="email">Email address *</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          placeholder="your.email@example.com"
          required
          disabled={isProcessing}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <span id="email-error" role="alert" style={{ color: '#D32F2F', fontSize: '14px' }}>
            {emailError}
          </span>
        )}
      </div> */}

      {/* Google Pay Button */}
      {/* POC: Simple button, Production: Use Stripe Payment Request Button */}
      {/* <button
        type="button"
        className={styles['donate-button']}
        onClick={handleGooglePay}
        disabled={isProcessing || !amount}
        style={{
          background: '#000',
          marginBottom: '16px'
        }}
      >
        {isProcessing ? (
          <>
            <span className={styles.spinner}></span>
            <span style={{ marginLeft: '8px' }}>Processing...</span>
          </>
        ) : (
          'Pay with Google Pay'
        )}
      </button> */}

      {/* <div className={styles['section-divider']}>
        <span>Or pay by card</span>
      </div> */}

      {/* Card Payment Form */}
      {/* <form onSubmit={handleCardSubmit} className={styles['card-form']}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Name on card *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError('');
            }}
            placeholder="John Smith"
            required
            disabled={isProcessing}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <span id="name-error" role="alert" style={{ color: '#D32F2F', fontSize: '14px' }}>
              {nameError}
            </span>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="card-element">Card details *</label>
          <div
            className={`${styles['stripe-card-element']} ${
              cardFocused ? styles.focused : ''
            }`}
          >
            <CardElement
              id="card-element"
              options={cardElementOptions}
              onFocus={() => setCardFocused(true)}
              onBlur={() => setCardFocused(false)}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles['donate-button']}
          disabled={isProcessing || !amount}
        >
          {isProcessing ? (
            <>
              <span className={styles.spinner}></span>
              <span style={{ marginLeft: '8px' }}>Processing...</span>
            </>
          ) : (
            `Donate £${amount}`
          )}
        </button>
      </form> */}

      {/* Error Message */}
      {error && (
        <div className={styles['error-message']} role="alert">
          {error}
        </div>
      )}

      {/* FUTURE ENHANCEMENT: Add Gift Aid opt-in */}
      {/* FUTURE ENHANCEMENT: Add saved payment methods for returning donors */}
    </div>
  );
}
