import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to fetch dynamic impact statements from API
 * 
 * @param {number} amount - Donation amount
 * @param {string} donationType - Type of donation (one-time, monthly)
 * @returns {Object} - { statement, loading, error }
 */
export function useImpactStatement(amount, donationType) {
  const [statement, setStatement] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track the latest request
  const abortControllerRef = useRef(null);
  
  useEffect(() => {
    // Don't fetch if amount is not valid
    if (!amount || amount <= 0) {
      setStatement('');
      setLoading(false);
      setError(null);
      return;
    }
    
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    const fetchImpactStatement = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build API URL with query parameters
        const params = new URLSearchParams({
          amount: amount.toString(),
          type: donationType
        });
        
        const response = await fetch(`/api/impact?${params}`, {
          signal: abortControllerRef.current.signal
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch impact statement');
        }
        
        const data = await response.json();
        setStatement(data.statement);
        setLoading(false);
        
      } catch (err) {
        // Don't set error if request was aborted (user typing fast)
        if (err.name === 'AbortError') {
          return;
        }
        
        console.error('Error fetching impact statement:', err);
        setError(err.message);
        setLoading(false);
        
        // Fallback to generic message on error
        setStatement(`£${amount} will make a real difference to people affected by cancer.`);
      }
    };
    
    // Debounce: Wait 500ms after user stops typing
    const debounceTimer = setTimeout(() => {
      fetchImpactStatement();
    }, 500);
    
    // Cleanup function
    return () => {
      clearTimeout(debounceTimer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    
  }, [amount, donationType]);
  
  return {
    statement,
    loading,
    error
  };
}

/**
 * FUTURE ENHANCEMENTS:
 * 
 * 1. Add caching to reduce API calls
 *    - Use React Query or SWR for better caching
 *    - Cache in localStorage for repeated visits
 * 
 * 2. Add personalization
 *    - Pass user context (returning donor, location, etc.)
 *    - Get personalized impact statements
 * 
 * 3. Add A/B testing
 *    - Randomly show different statements
 *    - Track which statements lead to donations
 * 
 * 4. Add analytics
 *    - Track which amounts users view
 *    - Track engagement with impact statements
 * 
 * 5. Add prefetching
 *    - Prefetch common amounts (£15, £25, £50, £100)
 *    - Reduce perceived loading time
 */
