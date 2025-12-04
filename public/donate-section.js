/**
 * Macmillan Donate Widget - Inline Section Injector
 * 
 * This script injects the donation widget directly into a page section.
 * Perfect for embedding on specific pages like /donate or campaign pages.
 * 
 * Usage in GTM:
 * 1. Create a Custom HTML tag
 * 2. Add this script with configuration
 * 3. Set trigger to specific pages (e.g., Page Path contains "/donate")
 * 
 * Configuration options:
 * - selector: CSS selector where to inject the widget (required)
 * - position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
 * - amount: Pre-fill donation amount
 * - type: 'one-time' | 'monthly'
 * - wrapper: Add wrapper styles (padding, background, etc.)
 */

(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.MacmillanDonateSection) {
    console.warn('Macmillan Donate Section already initialized');
    return;
  }
  
  const WIDGET_URL = 'https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/embed';
  
  // Default configuration
  const defaultConfig = {
    selector: '#donate-widget',  // CSS selector for injection point
    position: 'beforeend',       // beforebegin, afterbegin, beforeend, afterend
    amount: null,                // Pre-fill amount (e.g., 25)
    type: null,                  // Pre-fill type ('one-time' or 'monthly')
    wrapper: true,               // Add styled wrapper
    wrapperStyle: {
      padding: '40px 20px',
      background: '#f8f8f8',
      borderRadius: '8px',
      margin: '20px 0'
    },
    autoResize: true,            // Automatically resize iframe
    minHeight: '600px'           // Minimum height for iframe
  };
  
  // Merge with user config
  const config = Object.assign({}, defaultConfig, window.MACMILLAN_DONATE_SECTION_CONFIG || {});
  
  /**
   * Create the widget container
   */
  function createWidgetContainer() {
    const container = document.createElement('div');
    container.id = 'macmillan-donate-widget-container';
    container.className = 'macmillan-donate-section';
    
    // Apply wrapper styles if enabled
    if (config.wrapper) {
      Object.assign(container.style, config.wrapperStyle);
    }
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'macmillan-donate-section-iframe';
    
    // Build iframe URL with parameters
    let iframeUrl = WIDGET_URL;
    const params = [];
    
    if (config.amount) {
      params.push(`amount=${encodeURIComponent(config.amount)}`);
    }
    
    if (config.type) {
      params.push(`type=${encodeURIComponent(config.type)}`);
    }
    
    if (params.length > 0) {
      iframeUrl += '?' + params.join('&');
    }
    
    iframe.src = iframeUrl;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('title', 'Macmillan Cancer Support Donation Widget');
    
    // Iframe styles
    Object.assign(iframe.style, {
      width: '100%',
      minHeight: config.minHeight,
      border: 'none',
      display: 'block'
    });
    
    container.appendChild(iframe);
    
    return container;
  }
  
  /**
   * Inject the widget into the page
   */
  function injectWidget() {
    const targetElement = document.querySelector(config.selector);
    
    if (!targetElement) {
      console.error(`Macmillan Donate Section: Target element not found: ${config.selector}`);
      return false;
    }
    
    const container = createWidgetContainer();
    
    // Insert based on position
    switch (config.position) {
      case 'beforebegin':
        targetElement.parentNode.insertBefore(container, targetElement);
        break;
      case 'afterbegin':
        targetElement.insertBefore(container, targetElement.firstChild);
        break;
      case 'beforeend':
        targetElement.appendChild(container);
        break;
      case 'afterend':
        targetElement.parentNode.insertBefore(container, targetElement.nextSibling);
        break;
      default:
        targetElement.appendChild(container);
    }
    
    console.log('Macmillan Donate Section injected successfully');
    
    // Track injection in GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'donate_widget_injected',
        eventCategory: 'Donation',
        eventAction: 'Widget Injected',
        eventLabel: config.selector
      });
    }
    
    return true;
  }
  
  /**
   * Setup iframe auto-resize
   */
  function setupAutoResize() {
    if (!config.autoResize) return;
    
    window.addEventListener('message', (event) => {
      // Verify origin matches widget URL
      if (!event.origin.includes(new URL(WIDGET_URL).origin)) {
        return;
      }
      
      const iframe = document.getElementById('macmillan-donate-section-iframe');
      if (!iframe) return;
      
      if (event.data.type === 'widget-resize' && event.data.height) {
        iframe.style.height = event.data.height + 'px';
      }
      
      if (event.data.type === 'donation-complete') {
        console.log('Donation completed:', event.data.donation);
        
        // Track in GTM
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'donation_complete',
            eventCategory: 'Donation',
            eventAction: 'Donation Complete',
            donationAmount: event.data.donation.amount,
            donationType: event.data.donation.type
          });
        }
        
        // Scroll to widget on completion
        const container = document.getElementById('macmillan-donate-widget-container');
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
  
  /**
   * Remove the widget from the page
   */
  function removeWidget() {
    const container = document.getElementById('macmillan-donate-widget-container');
    if (container) {
      container.remove();
      console.log('Macmillan Donate Section removed');
      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'donate_widget_removed',
          eventCategory: 'Donation',
          eventAction: 'Widget Removed'
        });
      }
      
      return true;
    }
    return false;
  }
  
  /**
   * Update widget configuration
   */
  function updateConfig(newConfig) {
    Object.assign(config, newConfig);
    
    // If widget is already injected, reload it
    const existing = document.getElementById('macmillan-donate-widget-container');
    if (existing) {
      removeWidget();
      setTimeout(injectWidget, 100);
    }
  }
  
  /**
   * Initialize the widget
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Validate configuration
    if (!config.selector) {
      console.error('Macmillan Donate Section: selector is required in configuration');
      return;
    }
    
    // Setup auto-resize listener
    setupAutoResize();
    
    // Inject the widget
    const injected = injectWidget();
    
    if (injected) {
      console.log('Macmillan Donate Section initialized with config:', config);
    }
  }
  
  // Public API
  window.MacmillanDonateSection = {
    inject: injectWidget,
    remove: removeWidget,
    updateConfig: updateConfig,
    config: config,
    version: '1.0.0'
  };
  
  // Auto-initialize
  init();
})();
