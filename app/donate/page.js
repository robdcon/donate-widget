'use client';

import React from 'react';
import DonateWidget from '../../components/DonateWidget';
import styles from './donate.module.scss';

/**
 * Dedicated Donation Page
 * Full-page donation experience matching mobile design
 */
export default function DonatePage() {
  return (
    <div className={styles.donatePage}>
      {/* Header with logo and progress indicator */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img 
            src="/macmillan-logo.svg" 
            alt="Macmillan Cancer Support" 
            className={styles.logo}
            onError={(e) => {
              // Fallback to text if logo doesn't exist
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="' + styles.logoText + '">MACMILLAN</span>';
            }}
          />
        </div>
        
        {/* Progress indicator */}
        <div className={styles.progressIndicator}>
          <div className={styles.progressDot + ' ' + styles.active}></div>
          <div className={styles.progressLine}></div>
          <div className={styles.progressDot}></div>
          <div className={styles.progressLine}></div>
          <div className={styles.progressDot}></div>
        </div>
        
        <button 
          className={styles.helpButton}
          aria-label="Help"
          onClick={() => window.open('/help', '_blank')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
      </header>

      {/* Main content - Widget */}
      <main className={styles.mainContent}>
        <DonateWidget />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.secureText}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Secure donation
        </p>
        <div className={styles.footerLinks}>
          <a href="/privacy" target="_blank">Privacy Policy</a>
          <span className={styles.separator}>•</span>
          <a href="/terms" target="_blank">Terms</a>
          <span className={styles.separator}>•</span>
          <a href="/contact" target="_blank">Contact</a>
        </div>
        <p className={styles.charity}>
          Macmillan Cancer Support, registered charity in England and Wales (261017)
        </p>
      </footer>
    </div>
  );
}
