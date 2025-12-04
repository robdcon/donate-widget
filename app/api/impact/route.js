import { NextResponse } from 'next/server';
import { getImpactStatementConfig } from '../../../utils/impactStatementConfig';

// Mark this route as dynamic (not static)
export const dynamic = 'force-dynamic';

/**
 * API Route: Get Impact Statement
 * GET /api/impact?amount={amount}&type={donationType}
 * 
 * This endpoint returns the appropriate impact statement based on the donation amount
 * 
 * FUTURE IMPLEMENTATION:
 * - Connect to database instead of config file
 * - Add caching layer (Redis)
 * - Add A/B testing capability
 * - Add personalization based on user history
 * - Add analytics tracking
 */

export async function GET(request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const amountParam = searchParams.get('amount');
    const donationType = searchParams.get('type') || 'one-time';
    
    // Validate amount parameter
    if (!amountParam) {
      return NextResponse.json(
        { error: 'Amount parameter is required' },
        { status: 400 }
      );
    }
    
    const amount = parseFloat(amountParam);
    
    // Validate amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }
    
    // Validate amount is within acceptable range
    if (amount > 10000) {
      return NextResponse.json(
        { error: 'Amount exceeds maximum. For donations over £10,000, please contact us directly.' },
        { status: 400 }
      );
    }
    
    // Simulate small API delay (realistic experience)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get impact statement configuration
    const config = getImpactStatementConfig(amount);
    
    if (!config) {
      // Fallback if no configuration found
      return NextResponse.json({
        statement: `£${amount} will make a real difference to people affected by cancer. Thank you for your support.`,
        range: { min: amount, max: amount },
        isCustom: true
      });
    }
    
    // Replace placeholder with actual amount
    const statement = config.statement.replace('{amount}', amount);
    
    // Handle monthly donations differently
    let finalStatement = statement;
    if (donationType === 'monthly') {
      const annualAmount = amount * 12;
      finalStatement = `£${amount} a month (£${annualAmount} a year) could make a lasting difference to people affected by cancer throughout the year.`;
    }
    
    // Return the impact statement
    return NextResponse.json({
      statement: finalStatement,
      range: {
        min: config.minAmount,
        max: config.maxAmount
      },
      donationType,
      amount,
      configId: config.id
    });
    
  } catch (error) {
    console.error('Error fetching impact statement:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch impact statement' },
      { status: 500 }
    );
  }
}

/**
 * FUTURE: POST endpoint for admin panel
 * 
 * POST /api/impact
 * Create or update impact statement configuration
 * Requires authentication and admin role
 * 
 * Example request body:
 * {
 *   minAmount: 100,
 *   maxAmount: 149,
 *   statement: "£{amount} could help...",
 *   isActive: true
 * }
 */

/**
 * FUTURE: PUT endpoint for admin panel
 * 
 * PUT /api/impact/{id}
 * Update existing impact statement
 * Requires authentication and admin role
 */

/**
 * FUTURE: DELETE endpoint for admin panel
 * 
 * DELETE /api/impact/{id}
 * Deactivate impact statement
 * Requires authentication and admin role
 */
