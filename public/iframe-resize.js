/**
 * Macmillan Donate Widget - IFrame Auto-Resize Script
 * 
 * This script automatically resizes the iframe to match the widget's content height
 * Include this script on the parent page (the page that embeds the iframe)
 * 
 * Usage:
 * <script src="https://cdn.macmillan.org.uk/donate-widget/v1/iframe-resize.js"></script>
 */

(function() {
  'use strict';

  // Find all Macmillan widget iframes
  function findWidgetIframes() {
    const iframes = document.querySelectorAll('iframe[src*="/embed"]');
    return Array.from(iframes);
  }

  // Listen for resize messages from iframe
  function setupResizeListener() {
    window.addEventListener('message', function(event) {
      // Security: Verify origin (update with your actual domain)
      // if (event.origin !== 'https://donate.macmillan.org.uk') return;

      const data = event.data;

      // Handle resize message
      if (data.type === 'widget-resize' && data.height) {
        const iframes = findWidgetIframes();
        iframes.forEach(function(iframe) {
          // Match iframe by source
          if (iframe.src.includes(event.origin)) {
            iframe.style.height = data.height + 'px';
            console.log('[Macmillan Widget] Resized to:', data.height + 'px');
          }
        });
      }

      // Handle donation complete message
      if (data.type === 'donation-complete') {
        console.log('[Macmillan Widget] Donation completed:', data);
        
        // Trigger custom event on parent page
        const event = new CustomEvent('macmillan-donation-complete', {
          detail: data
        });
        window.dispatchEvent(event);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupResizeListener);
  } else {
    setupResizeListener();
  }

  // Expose public API
  window.MacmillanWidgetIframe = {
    version: '1.0.0',
    onDonationComplete: function(callback) {
      window.addEventListener('macmillan-donation-complete', function(e) {
        callback(e.detail);
      });
    }
  };

  console.log('[Macmillan Widget IFrame] Script loaded v1.0.0');
})();
