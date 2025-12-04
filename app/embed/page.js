'use client';

import DonateWidget from '../../components/DonateWidget';

/**
 * Embed Page Route
 * 
 * This page is designed to be embedded via iframe on external websites
 * URL: https://yourdomain.com/embed
 * 
 * Query Parameters:
 * - amount: Default amount (e.g., ?amount=25)
 * - type: Default donation type (e.g., ?type=monthly)
 * - theme: Color theme (light/dark)
 * 
 * Usage Example:
 * <iframe 
 *   src="https://yourdomain.com/embed?amount=25&type=monthly"
 *   width="100%"
 *   height="800"
 *   frameborder="0"
 *   title="Macmillan Donation Widget"
 * ></iframe>
 */
export default function EmbedPage({ searchParams }) {
  return (
    <main 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'transparent' // Allow parent page background to show
      }}
    >
      <DonateWidget 
        defaultAmount={searchParams?.amount ? parseInt(searchParams.amount) : null}
        defaultType={searchParams?.type || 'one-time'}
      />
    </main>
  );
}
