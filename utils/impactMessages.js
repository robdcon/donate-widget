/**
 * Static impact messages for different donation amounts
 * 
 * FUTURE ENHANCEMENT: Replace with API-driven dynamic impact messages
 * Extension point: Create useImpactMessage(amount, donationType) hook
 * API endpoint: POST /api/impact/calculate
 */

const IMPACT_MESSAGES = {
  15: "£15 could help a member of our Cancer Information team provide support and information to someone affected by cancer for 15 minutes.",
  25: "£25 could help fund a Macmillan nurse for one hour, helping someone living with cancer and their family.",
  50: "£50 could help pay for a support worker for two hours, helping people with cancer navigate the benefits system.",
  100: "£100 could help fund specialist cancer support for someone who has no one else to turn to.",
  250: "£250 could help answer calls on the Macmillan Support Line for one hour, providing support when it's needed most.",
  500: "£500 could help provide financial guidance to families affected by cancer for a full day."
};

/**
 * Get impact message for a given amount
 * @param {number} amount - Donation amount
 * @returns {string} Impact message
 */
export function getImpactMessage(amount) {
  // Return exact match if available
  if (IMPACT_MESSAGES[amount]) {
    return IMPACT_MESSAGES[amount];
  }
  
  // Find closest amount for custom amounts
  const amounts = Object.keys(IMPACT_MESSAGES).map(Number).sort((a, b) => a - b);
  let closestAmount = amounts[0];
  
  for (const key of amounts) {
    if (amount >= key) {
      closestAmount = key;
    }
  }
  
  // If custom amount is higher than all predefined amounts
  if (amount > amounts[amounts.length - 1]) {
    return `£${amount} will make a significant difference to people affected by cancer. Your generosity will help Macmillan be there for everyone who needs us.`;
  }
  
  return IMPACT_MESSAGES[closestAmount];
}

/**
 * Get monthly impact message
 * @param {number} amount - Monthly donation amount
 * @returns {string} Monthly impact message
 */
export function getMonthlyImpactMessage(amount) {
  const annualAmount = amount * 12;
  return `£${amount} a month (£${annualAmount} a year) could make a lasting difference to people affected by cancer throughout the year.`;
}

/**
 * FUTURE ENHANCEMENT: Dynamic impact API integration
 * 
 * Example implementation:
 * 
 * export async function getImpactMessageFromAPI(amount, donationType, userContext) {
 *   try {
 *     const response = await fetch('/api/impact/calculate', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ amount, donationType, userContext })
 *     });
 *     const data = await response.json();
 *     return data.impactMessage;
 *   } catch (error) {
 *     console.error('Failed to fetch impact message:', error);
 *     return getImpactMessage(amount); // Fallback to static
 *   }
 * }
 */
