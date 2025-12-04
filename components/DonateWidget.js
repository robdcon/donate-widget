'use client';

import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../styles/DonateWidget.module.scss';
import AmountSelector from './AmountSelector';
import PaymentSection from './PaymentSection';
import SuccessMessage from './SuccessMessage';
import { useImpactStatement } from '../hooks/useImpactStatement';
import { useIFrameCommunication } from '../hooks/useIFrameCommunication';
import { validateAmount, trackEvent } from '../utils/mockApi';

// Load Stripe (use test key for POC)
// IMPORTANT: Replace with your own Stripe publishable key
// For testing, use: pk_test_... key from your Stripe dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');

/**
 * Main DonateWidget Component
 * Orchestrates the complete donation flow
 * 
 * FUTURE ENHANCEMENTS:
 * - Add returning donor recognition (check email on blur)
 * - Add tribute/memorial donation options
 * - Add corporate donation matching
 * - Add social sharing after successful donation
 * - Add donation preferences (communication opt-in)
 * - Add multi-currency support
 */
export default function DonateWidget() {
  // Donation type state
  const [donationType, setDonationType] = useState('one-time');
  
  // Amount state - Set middle option (£25) as default
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState(25);
  
  // Payment flow state
  const [isComplete, setIsComplete] = useState(false);
  const [donationData, setDonationData] = useState(null);
  
  // Error state
  const [amountError, setAmountError] = useState('');
  
  // Fetch dynamic impact statement from API
  const { statement: impactStatement, loading: impactLoading } = useImpactStatement(finalAmount, donationType);
  
  // Enable iframe communication (auto-resize, donation events)
  useIFrameCommunication(isComplete, donationData);

  /**
   * Track widget load
   */
  useEffect(() => {
    trackEvent('widget_loaded', { timestamp: new Date().toISOString() });
  }, []);

  /**
   * Handle preset amount selection
   */
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(''); // Clear custom amount
    setFinalAmount(amount);
    setAmountError('');
    
    trackEvent('amount_selected', {
      amount,
      type: 'preset',
      donationType
    });
  };

  /**
   * Handle custom amount input
   */
  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null); // Clear preset selection
    
    const numValue = parseFloat(value);
    if (value && !isNaN(numValue)) {
      const validation = validateAmount(numValue);
      if (validation.valid) {
        setFinalAmount(numValue);
        setAmountError('');
        
        trackEvent('amount_selected', {
          amount: numValue,
          type: 'custom',
          donationType
        });
      } else {
        setAmountError(validation.error);
        setFinalAmount(null);
      }
    } else {
      setFinalAmount(null);
      setAmountError('');
    }
  };

  /**
   * Handle donation type change
   */
  const handleDonationTypeChange = (type) => {
    setDonationType(type);
    
    trackEvent('donation_type_changed', {
      newType: type,
      amount: finalAmount
    });
  };

  /**
   * Handle successful payment
   */
  const handlePaymentSuccess = (data) => {
    setDonationData(data);
    setIsComplete(true);
    
    trackEvent('donation_completed', {
      amount: finalAmount,
      donationType,
      donationId: data.donationId,
      paymentMethod: data.paymentMethod
    });
  };

  // Show success message after donation
  if (isComplete && donationData) {
    return (
      <div className={styles['donate-widget']}>
        <SuccessMessage 
          donationData={donationData} 
          donationType={donationType}
        />
      </div>
    );
  }

  return (
    <div className={styles['donate-widget']}>
      {/* Header */}
      <div className={styles['widget-header']}>
        <h1>Support Macmillan</h1>
        <p>Your donation helps us support people living with cancer</p>
      </div>

      {/* Donation Type Tabs */}
      <div className={styles['donation-type-tabs']}>
        <button
          type="button"
          className={`${styles['tab-button']} ${
            donationType === 'one-time' ? styles.active : ''
          }`}
          onClick={() => handleDonationTypeChange('one-time')}
        >
          One-time
        </button>
        <button
          type="button"
          className={`${styles['tab-button']} ${
            donationType === 'monthly' ? styles.active : ''
          }`}
          onClick={() => handleDonationTypeChange('monthly')}
        >
          Monthly
        </button>
      </div>

      {/* Amount Selection */}
      <AmountSelector
        selectedAmount={selectedAmount}
        customAmount={customAmount}
        onAmountSelect={handleAmountSelect}
        onCustomAmountChange={handleCustomAmountChange}
      />

      {/* Impact Message - Directly under amount selection */}
      {finalAmount && !amountError && (
        <div className={styles['impact-message']}>
          {impactLoading ? (
            <p style={{ opacity: 0.6 }}>
              <span className={styles.spinner} style={{ marginRight: '8px' }}></span>
              Loading impact...
            </p>
          ) : (
            <p>{impactStatement}</p>
          )}
        </div>
      )}

      {/* Amount Error */}
      {amountError && (
        <div className={styles['error-message']} role="alert">
          {amountError}
        </div>
      )}

      {/* Payment Section - Only show if amount is selected */}
      {finalAmount && !amountError && (
        <Elements stripe={stripePromise}>
          <PaymentSection
            amount={finalAmount}
            donationType={donationType}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}

      {/* FUTURE ENHANCEMENT: Add returning donor check on email blur */}
      {/* FUTURE ENHANCEMENT: Add Gift Aid opt-in checkbox */}
      {/* FUTURE ENHANCEMENT: Add tribute/memorial donation options */}
    </div>
  );
}
