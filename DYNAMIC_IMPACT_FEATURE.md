# Dynamic Impact Statements Feature

## 📋 Overview

This feature implements **dynamic impact statements** that change based on the donation amount entered by the user. Instead of static messages, the widget now makes an API request to fetch the most appropriate impact statement for any custom amount.

## ✨ What's New

### 1. **API-Driven Impact Statements**
- **Endpoint:** `GET /api/impact?amount={amount}&type={donationType}`
- **Response Time:** ~300ms (with debouncing)
- **Dynamic:** Statements vary by amount ranges (e.g., £15-19, £20-24, etc.)

### 2. **Admin Management Panel**
- **URL:** http://localhost:3001/admin/impact-statements
- **Purpose:** View and manage impact statement configurations
- **Features:** Edit statements, toggle active/inactive, update amount ranges

### 3. **Smart Debouncing**
- **Delay:** 500ms after user stops typing
- **Benefit:** Reduces API calls, smooth UX
- **Loading State:** Shows spinner while fetching

## 🎯 How It Works

### User Flow

1. **User enters custom amount** (e.g., £18)
2. **Widget waits 500ms** (debounce)
3. **API request sent:** `/api/impact?amount=18&type=one-time`
4. **API finds matching range:** £15-19
5. **Returns statement:** "£18 could help a member of our Cancer Information team..."
6. **Widget displays** the dynamic statement

### Amount Ranges (Current Configuration)

| Range | Impact Statement |
|-------|------------------|
| £1-14 | General support message |
| £15-19 | Cancer Information team (15 min) |
| £20-24 | Macmillan nurse (20 min) |
| £25-39 | Macmillan nurse (1 hour) |
| £40-49 | Care package |
| £50-74 | Support worker (2 hours) |
| £75-99 | Cancer support services (1 day) |
| £100-149 | Specialist support |
| £150-249 | Online community (1 month) |
| £250-499 | Support Line (1 hour) |
| £500-999 | Financial guidance (full day) |
| £1000+ | Transformational difference |

## 📁 Files Created/Modified

### New Files

1. **`utils/impactStatementConfig.js`**
   - Configuration for all impact statement ranges
   - Simulates database structure
   - Easy to replace with real DB queries

2. **`app/api/impact/route.js`**
   - API endpoint for fetching impact statements
   - Handles query parameters
   - Returns appropriate statement for amount

3. **`hooks/useImpactStatement.js`**
   - Custom React hook
   - Fetches statements from API
   - Handles debouncing and loading states
   - Cancels previous requests

4. **`app/admin/impact-statements/page.js`**
   - Mock admin management panel
   - View all statements
   - Edit functionality (client-side only)
   - Toggle active/inactive

5. **`app/admin/impact-statements/admin.module.scss`**
   - Styling for admin panel
   - Responsive table design
   - Professional admin UI

### Modified Files

1. **`components/DonateWidget.js`**
   - Removed static `getImpactMessage()` function
   - Added `useImpactStatement()` hook
   - Shows loading state while fetching
   - Displays dynamic statement

## 🚀 Testing the Feature

### Test on Main Widget

1. **Open:** http://localhost:3001
2. **Enter custom amount:** Try £18
3. **Watch:** Loading spinner appears briefly
4. **See:** Dynamic statement shows: "£18 could help..."
5. **Try different amounts:**
   - £22 → Different message
   - £55 → Different message
   - £120 → Different message

### Test Admin Panel

1. **Open:** http://localhost:3001/admin/impact-statements
2. **View:** All configured impact statements
3. **Try editing:**
   - Click "Edit" on any row
   - Modify the statement text
   - Change amount ranges
   - Click "Save"
4. **Toggle active/inactive:**
   - Click "Deactivate" on a statement
   - It won't be used (but this is just client-side demo)

## 🔧 Technical Details

### API Endpoint

**Request:**
```
GET /api/impact?amount=25&type=one-time
```

**Response:**
```json
{
  "statement": "£25 could help fund a Macmillan nurse for one hour...",
  "range": {
    "min": 25,
    "max": 39
  },
  "donationType": "one-time",
  "amount": 25,
  "configId": 4
}
```

### Hook Usage

```javascript
const { statement, loading, error } = useImpactStatement(amount, donationType);

// statement: The impact message
// loading: Boolean, true while fetching
// error: Error message if fetch fails
```

### Configuration Structure

```javascript
{
  id: 1,
  minAmount: 15,
  maxAmount: 19,
  statement: "£{amount} could help...",  // {amount} is replaced
  isActive: true,
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z"
}
```

## 🎨 UI/UX Features

### Loading State
- Small spinner with text: "Loading impact..."
- Appears for ~300-500ms
- Subtle, doesn't block user

### Debouncing
- Waits 500ms after user stops typing
- Prevents excessive API calls
- Smooth, responsive feel

### Error Handling
- Falls back to generic message on error
- Doesn't break the flow
- Logs error to console

## 🔮 Production Implementation

### Database Setup

```sql
CREATE TABLE impact_statements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  min_amount DECIMAL(10, 2) NOT NULL,
  max_amount DECIMAL(10, 2) NOT NULL,
  statement TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT, -- Admin user ID
  updated_by INT, -- Admin user ID
  
  INDEX idx_amount (min_amount, max_amount, is_active),
  INDEX idx_active (is_active)
);

-- Audit log table
CREATE TABLE impact_statement_audit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  statement_id INT,
  action VARCHAR(50), -- 'created', 'updated', 'deleted'
  old_value JSON,
  new_value JSON,
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Implementation (Production)

**Update `app/api/impact/route.js`:**

```javascript
import { query } from '@/lib/db'; // Your DB connection

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const amount = parseFloat(searchParams.get('amount'));
  
  // Query database instead of config file
  const result = await query(`
    SELECT * FROM impact_statements 
    WHERE ? BETWEEN min_amount AND max_amount 
    AND is_active = true 
    ORDER BY priority DESC 
    LIMIT 1
  `, [amount]);
  
  if (!result.length) {
    return NextResponse.json({ error: 'No statement found' }, { status: 404 });
  }
  
  const statement = result[0].statement.replace('{amount}', amount);
  
  return NextResponse.json({
    statement,
    range: {
      min: result[0].min_amount,
      max: result[0].max_amount
    }
  });
}
```

### Admin Panel (Production)

**Add to Admin Panel:**

1. **Authentication:** Require admin login
2. **CRUD Operations:** Full create, read, update, delete
3. **Validation:** Prevent overlapping ranges
4. **Preview:** Test statements before activating
5. **Audit Log:** Track all changes
6. **Permissions:** Role-based access control

**Example Admin API:**

```javascript
// POST /api/admin/impact-statements
// Create new statement (admin only)

// PUT /api/admin/impact-statements/[id]
// Update statement (admin only)

// DELETE /api/admin/impact-statements/[id]
// Delete statement (admin only)
```

## 📊 Future Enhancements

### 1. **Caching**
```javascript
// Add caching layer
import { cache } from 'react';

export const getImpactStatement = cache(async (amount) => {
  // Cached for the duration of the request
});
```

### 2. **A/B Testing**
```javascript
// Multiple statements for same range
// Randomly select one
// Track which performs better

{
  minAmount: 25,
  maxAmount: 39,
  statements: [
    { text: "Version A...", variant: "a" },
    { text: "Version B...", variant: "b" }
  ]
}
```

### 3. **Personalization**
```javascript
// Tailor messages based on:
// - User location
// - Donation history
// - Referral source
// - Time of year (campaigns)

const statement = await getPersonalizedImpact(amount, userContext);
```

### 4. **Analytics**
```javascript
// Track which statements lead to donations
// Optimize based on conversion rates

trackEvent('impact_statement_viewed', {
  amount,
  statementId,
  variant
});

trackEvent('donation_completed', {
  amount,
  statementId,
  variant
});

// Calculate conversion rate per statement
```

### 5. **Multi-language**
```javascript
// Support multiple languages
{
  minAmount: 25,
  maxAmount: 39,
  statements: {
    en: "£25 could help...",
    cy: "Gallai £25 helpu...", // Welsh
    gd: "Dh'fhaodadh £25 cuideachadh..." // Gaelic
  }
}
```

## ✅ Testing Checklist

- [ ] Enter amount £18 → See specific message
- [ ] Enter amount £55 → See different message
- [ ] Switch to Monthly → Message updates
- [ ] Type fast → Only one API call (debouncing works)
- [ ] Visit admin panel → See all statements
- [ ] Click Edit → Form appears
- [ ] Modify statement → Changes visible (client-side)
- [ ] Toggle active/inactive → Badge updates
- [ ] Check console → No errors
- [ ] Check Network tab → API calls visible

## 🐛 Known Limitations (POC)

1. **No Real Database:** Uses config file, not persisted
2. **Client-side Admin:** Changes don't persist on refresh
3. **No Authentication:** Admin panel is public
4. **No Validation:** Can create overlapping ranges
5. **No Audit Log:** No tracking of changes

These are intentional for POC and should be implemented in production.

## 📖 Documentation Updates Needed

When going to production, update:

1. **README.md** - Add section on dynamic impact statements
2. **API Documentation** - Document `/api/impact` endpoint
3. **Admin Guide** - Create admin user guide
4. **Developer Guide** - Database schema, setup instructions

---

**Feature Status:** ✅ Complete and Ready for Demo

**Demo URLs:**
- Main Widget: http://localhost:3001
- Admin Panel: http://localhost:3001/admin/impact-statements
