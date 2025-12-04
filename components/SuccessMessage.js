import React from 'react';
import styles from '../styles/DonateWidget.module.scss';

/**
 * SuccessMessage Component
 * Displays donation confirmation after successful payment
 * 
 * @param {Object} donationData - Donation details
 * @param {string} donationType - Type of donation (one-time, monthly)
 */
export default function SuccessMessage({ donationData, donationType }) {
  const formatDonationType = (type) => {
    switch (type) {
      case 'one-time':
        return 'One-time donation';
      case 'monthly':
        return 'Monthly donation';
      default:
        return 'Donation';
    }
  };

  return (
    <div className={styles['success-message']}>
      <div className={styles['success-icon']}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      
      <h2>Thank you for your donation!</h2>
      
      <p>
        Your support means we can be there for everyone who needs us. 
        We'll send a confirmation email to you shortly.
      </p>
      
      <div className={styles['donation-details']}>
        <div className={styles['detail-row']}>
          <span>Amount:</span>
          <span>£{donationData.amount}</span>
        </div>
        <div className={styles['detail-row']}>
          <span>Type:</span>
          <span>{formatDonationType(donationType)}</span>
        </div>
        <div className={styles['detail-row']}>
          <span>Receipt Number:</span>
          <span>{donationData.receiptNumber}</span>
        </div>
      </div>
      
      <p style={{ marginTop: '24px', fontSize: '14px', color: '#616161' }}>
        A receipt has been sent to your email address.
      </p>
    </div>
  );
}
