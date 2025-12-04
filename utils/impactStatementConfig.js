/**
 * Mock Impact Statement Configuration
 * 
 * This simulates what would be stored in a database and managed via an admin panel
 * 
 * FUTURE: Replace with database queries
 * Admin panel at /admin/impact-statements to manage these
 */

export const IMPACT_STATEMENT_RANGES = [
  {
    id: 1,
    minAmount: 1,
    maxAmount: 14,
    statement: "£{amount} will help provide vital information and support to someone affected by cancer.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 2,
    minAmount: 15,
    maxAmount: 19,
    statement: "£{amount} could help a member of our Cancer Information team provide support and information to someone affected by cancer for 15 minutes.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 3,
    minAmount: 20,
    maxAmount: 24,
    statement: "£{amount} could help pay for a Macmillan nurse for 20 minutes, providing expert care and support.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 4,
    minAmount: 25,
    maxAmount: 39,
    statement: "£{amount} could help fund a Macmillan nurse for one hour, helping someone living with cancer and their family.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 5,
    minAmount: 40,
    maxAmount: 49,
    statement: "£{amount} could help provide a care package for someone recently diagnosed with cancer.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 6,
    minAmount: 50,
    maxAmount: 74,
    statement: "£{amount} could help pay for a support worker for two hours, helping people with cancer navigate the benefits system.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 7,
    minAmount: 75,
    maxAmount: 99,
    statement: "£{amount} could help fund vital cancer support services for a day.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 8,
    minAmount: 100,
    maxAmount: 149,
    statement: "£{amount} could help fund specialist cancer support for someone who has no one else to turn to.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 9,
    minAmount: 150,
    maxAmount: 249,
    statement: "£{amount} could help provide emotional support through our online community for a month.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 10,
    minAmount: 250,
    maxAmount: 499,
    statement: "£{amount} could help answer calls on the Macmillan Support Line for one hour, providing support when it's needed most.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 11,
    minAmount: 500,
    maxAmount: 999,
    statement: "£{amount} could help provide financial guidance to families affected by cancer for a full day.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 12,
    minAmount: 1000,
    maxAmount: 10000,
    statement: "£{amount} will make a transformational difference to people affected by cancer. Your incredible generosity will help Macmillan be there for everyone who needs us.",
    isActive: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  }
];

/**
 * Get impact statement configuration by amount
 * Simulates database query
 */
export function getImpactStatementConfig(amount) {
  // Filter active statements only
  const activeStatements = IMPACT_STATEMENT_RANGES.filter(config => config.isActive);
  
  // Find matching range
  const config = activeStatements.find(
    config => amount >= config.minAmount && amount <= config.maxAmount
  );
  
  return config || null;
}

/**
 * FUTURE ADMIN PANEL STRUCTURE:
 * 
 * Admin panel would allow:
 * 1. Create new impact statement ranges
 * 2. Edit existing statements
 * 3. Set min/max amounts
 * 4. Activate/deactivate statements
 * 5. Preview statements
 * 6. Order/priority management
 * 7. A/B testing different statements
 * 
 * Database schema example:
 * 
 * CREATE TABLE impact_statements (
 *   id INT PRIMARY KEY AUTO_INCREMENT,
 *   min_amount DECIMAL(10, 2) NOT NULL,
 *   max_amount DECIMAL(10, 2) NOT NULL,
 *   statement TEXT NOT NULL,
 *   is_active BOOLEAN DEFAULT true,
 *   priority INT DEFAULT 0,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 *   INDEX idx_amount (min_amount, max_amount, is_active)
 * );
 */
