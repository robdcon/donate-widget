import React from 'react';
import styles from '../styles/DonateWidget.module.scss';

/**
 * AmountSelector Component
 * Displays preset amount buttons and custom amount input
 * 
 * @param {number} selectedAmount - Currently selected amount
 * @param {string} customAmount - Custom amount input value
 * @param {function} onAmountSelect - Handler for preset amount selection
 * @param {function} onCustomAmountChange - Handler for custom amount input
 */
export default function AmountSelector({ 
  selectedAmount, 
  customAmount, 
  onAmountSelect, 
  onCustomAmountChange 
}) {
  const presetAmounts = [15, 25, 50, 100];

  return (
    <div className={styles['amount-selector']}>
      <label className={styles['amount-label']}>
        Select amount
      </label>
      
      <div className={styles['amount-buttons']}>
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`${styles['amount-button']} ${
              selectedAmount === amount && !customAmount ? styles.selected : ''
            }`}
            onClick={() => onAmountSelect(amount)}
            aria-pressed={selectedAmount === amount && !customAmount}
          >
            £{amount}
          </button>
        ))}
      </div>
      
      <input
        type="number"
        className={styles['custom-amount-input']}
        placeholder="Or enter custom amount"
        value={customAmount}
        onChange={(e) => onCustomAmountChange(e.target.value)}
        min="1"
        max="10000"
        aria-label="Custom donation amount"
      />
    </div>
  );
}
