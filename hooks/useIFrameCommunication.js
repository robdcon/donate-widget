'use client';

import { useEffect } from 'react';

/**
 * IFrame Communication Hook
 * 
 * This hook enables communication between the embedded widget (inside iframe)
 * and the parent page
 * 
 * Features:
 * - Auto-resize iframe to content height
 * - Send donation completion events
 * - Send analytics events
 */
export function useIFrameCommunication(isComplete = false, donationData = null) {
  useEffect(() => {
    // Check if we're inside an iframe
    const isInIframe = window.self !== window.top;
    
    if (!isInIframe) return;

    // Send resize message to parent
    const sendResize = () => {
      const height = document.body.scrollHeight;
      
      window.parent.postMessage({
        type: 'widget-resize',
        height: height
      }, '*'); // In production, specify actual parent origin
    };

    // Send initial resize
    sendResize();

    // Setup resize observer for dynamic height changes
    const resizeObserver = new ResizeObserver(() => {
      sendResize();
    });

    resizeObserver.observe(document.body);

    // Also listen for window resize
    window.addEventListener('resize', sendResize);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', sendResize);
    };
  }, []);

  // Send donation complete message
  useEffect(() => {
    const isInIframe = window.self !== window.top;
    
    if (isInIframe && isComplete && donationData) {
      window.parent.postMessage({
        type: 'donation-complete',
        amount: donationData.amount,
        donationId: donationData.donationId,
        timestamp: new Date().toISOString()
      }, '*'); // In production, specify actual parent origin
    }
  }, [isComplete, donationData]);
}
