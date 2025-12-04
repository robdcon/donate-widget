# Embeddable Widget Implementation Plan

## Best Approach: Web Component + Script Tag

The best approach for embedding this widget on any page is to create a **standalone JavaScript bundle** that can be included via a `<script>` tag and initialized with a simple `<div>` placeholder.

## Implementation Options

### Option 1: Web Component (Recommended)
**Pros:**
- Works on any website (WordPress, Drupal, static HTML, etc.)
- Encapsulated styles (won't conflict with host page)
- Easy to use: Just add `<macmillan-donate-widget></macmillan-donate-widget>`
- Modern, standard approach
- Supports configuration via attributes

**Cons:**
- Slightly larger bundle size
- Requires modern browser (IE11 needs polyfill)

### Option 2: IFrame Embed
**Pros:**
- Complete isolation from host page
- No style conflicts ever
- Very simple to implement

**Cons:**
- Harder to resize dynamically
- Can't access parent page context
- SEO limitations
- Payment redirects can be tricky

### Option 3: React Bundle with Initialization Function
**Pros:**
- Uses existing React code
- Good performance
- Flexible configuration

**Cons:**
- Larger bundle size
- Can have style conflicts
- Requires careful CSS scoping

## Recommended Solution: Hybrid Approach

Create both:
1. **Web Component wrapper** (for most use cases)
2. **IFrame fallback** (for complex pages with conflicts)

## Implementation Steps

### Step 1: Create Standalone Build
- Configure Next.js to export static bundle
- Bundle React + Stripe + Widget into single JS file
- Generate CSS file with scoped styles
- Create initialization script

### Step 2: Web Component Wrapper
- Create custom element `<macmillan-donate-widget>`
- Shadow DOM for style encapsulation
- Accept configuration attributes
- Handle Stripe initialization

### Step 3: Embed Script
- Single `<script>` tag to include
- Auto-initializes on page load
- Configuration via data attributes
- CDN hosting ready

### Step 4: IFrame Fallback
- Host widget at `/embed` route
- Provide iframe embed code
- Auto-resize iframe to content
- PostMessage communication

## Usage Examples

### Web Component (Primary)
```html
<!-- Simple -->
<macmillan-donate-widget></macmillan-donate-widget>

<!-- With configuration -->
<macmillan-donate-widget
  stripe-key="pk_live_xxx"
  default-amount="25"
  default-type="monthly"
  theme="light"
></macmillan-donate-widget>

<!-- Load script -->
<script src="https://cdn.macmillan.org.uk/donate-widget/v1/widget.js"></script>
```

### IFrame (Fallback)
```html
<iframe 
  src="https://donate.macmillan.org.uk/embed?amount=25&type=monthly"
  width="100%"
  height="800"
  frameborder="0"
  title="Macmillan Donation Widget"
></iframe>

<!-- Optional: Auto-resize script -->
<script src="https://cdn.macmillan.org.uk/donate-widget/v1/iframe-resize.js"></script>
```

### Script Tag Initialization
```html
<div id="macmillan-donate-widget"></div>
<script src="https://cdn.macmillan.org.uk/donate-widget/v1/widget.js"></script>
<script>
  MacmillanWidget.init({
    container: '#macmillan-donate-widget',
    stripeKey: 'pk_live_xxx',
    defaultAmount: 25,
    defaultType: 'monthly',
    theme: 'light'
  });
</script>
```

## Next Steps

Which approach would you prefer?

1. **Full Web Component** (most versatile, recommended)
2. **IFrame embed** (quickest to implement, most isolated)
3. **Script + div initialization** (middle ground)

I can implement any of these options now!
