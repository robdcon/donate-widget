/**
 * Macmillan Floating Donate Button
 * 
 * This script creates a floating donation button that can be injected via GTM.
 * When clicked, it opens the donation widget in a modal overlay.
 * 
 * Usage in GTM:
 * 1. Create a Custom HTML tag
 * 2. Add this script
 * 3. Set trigger to "All Pages" or specific pages
 * 
 * Configuration options:
 * - data-position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
 * - data-amount: Pre-fill donation amount
 * - data-type: 'one-time' | 'monthly'
 */

(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.MacmillanDonateButton) {
    return;
  }
  
  const WIDGET_URL = 'https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/embed';
  
  // Configuration
  const config = {
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    buttonText: 'Donate',
    buttonColor: '#00853E',
    buttonHoverColor: '#006B32',
    zIndex: 9999
  };
  
  // Create floating button
  function createButton() {
    const button = document.createElement('button');
    button.id = 'macmillan-donate-button';
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span>${config.buttonText}</span>
    `;
    
    // Apply styles
    Object.assign(button.style, {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: config.buttonColor,
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
      zIndex: config.zIndex,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    
    // Position based on config
    const positions = {
      'bottom-right': { bottom: '24px', right: '24px' },
      'bottom-left': { bottom: '24px', left: '24px' },
      'top-right': { top: '24px', right: '24px' },
      'top-left': { top: '24px', left: '24px' }
    };
    
    Object.assign(button.style, positions[config.position] || positions['bottom-right']);
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = config.buttonHoverColor;
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = config.buttonColor;
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    // Click handler
    button.addEventListener('click', openModal);
    
    return button;
  }
  
  // Create modal overlay
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'macmillan-donate-modal';
    
    Object.assign(modal.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: config.zIndex + 1,
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });
    
    // Modal content container
    const modalContent = document.createElement('div');
    Object.assign(modalContent.style, {
      position: 'relative',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      transform: 'scale(0.9)',
      transition: 'transform 0.3s ease'
    });
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close');
    
    Object.assign(closeButton.style, {
      position: 'absolute',
      top: '12px',
      right: '12px',
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: '#333',
      border: 'none',
      borderRadius: '50%',
      fontSize: '24px',
      lineHeight: '1',
      cursor: 'pointer',
      zIndex: '10',
      transition: 'background-color 0.2s ease'
    });
    
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
    
    closeButton.addEventListener('click', closeModal);
    
    // Iframe container
    const iframeContainer = document.createElement('div');
    Object.assign(iframeContainer.style, {
      width: '100%',
      height: '600px',
      maxHeight: '80vh',
      overflow: 'auto'
    });
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'macmillan-donate-iframe';
    iframe.src = WIDGET_URL;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    
    Object.assign(iframe.style, {
      width: '100%',
      height: '100%',
      border: 'none'
    });
    
    iframeContainer.appendChild(iframe);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframeContainer);
    modal.appendChild(modalContent);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Listen for iframe resize messages
    window.addEventListener('message', (event) => {
      if (event.data.type === 'widget-resize' && event.data.height) {
        iframeContainer.style.height = Math.min(event.data.height, window.innerHeight * 0.8) + 'px';
      }
      
      if (event.data.type === 'donation-complete') {
        console.log('Donation completed:', event.data.donation);
        // Optionally close modal after successful donation
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    });
    
    return modal;
  }
  
  // Open modal
  function openModal() {
    const modal = document.getElementById('macmillan-donate-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Trigger animation
      setTimeout(() => {
        modal.style.opacity = '1';
        const content = modal.querySelector('div');
        if (content) {
          content.style.transform = 'scale(1)';
        }
      }, 10);
      
      // Track event (if GTM dataLayer exists)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'donate_modal_opened',
          eventCategory: 'Donation',
          eventAction: 'Modal Opened'
        });
      }
    }
  }
  
  // Close modal
  function closeModal() {
    const modal = document.getElementById('macmillan-donate-modal');
    if (modal) {
      modal.style.opacity = '0';
      const content = modal.querySelector('div');
      if (content) {
        content.style.transform = 'scale(0.9)';
      }
      
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
      
      // Track event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'donate_modal_closed',
          eventCategory: 'Donation',
          eventAction: 'Modal Closed'
        });
      }
    }
  }
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Initialize
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Create and append button
    const button = createButton();
    document.body.appendChild(button);
    
    // Create and append modal
    const modal = createModal();
    document.body.appendChild(modal);
    
    console.log('Macmillan Donate Button initialized');
  }
  
  // Public API
  window.MacmillanDonateButton = {
    open: openModal,
    close: closeModal,
    config: config
  };
  
  // Auto-initialize
  init();
})();
