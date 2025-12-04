# Inline Section Implementation Guide

## Overview

The **Inline Section** script injects the donation widget directly into your page content at a specific location. Perfect for dedicated donation pages, campaign pages, or embedding within articles.

## Quick Start

### 1. Basic Implementation

Add this to your GTM Custom HTML tag:

```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget'  // CSS selector where to inject
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

### 2. Add Target Element to Your Page

In your page HTML, add the target element:

```html
<div id="donate-widget"></div>
```

That's it! The widget will automatically inject into that location.

## Configuration Options

### All Available Options

```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    // Required
    selector: '#donate-widget',        // CSS selector for injection point
    
    // Position (optional)
    position: 'beforeend',             // beforebegin | afterbegin | beforeend | afterend
    
    // Pre-fill (optional)
    amount: 25,                        // Pre-fill amount (number)
    type: 'monthly',                   // Pre-fill type: 'one-time' | 'monthly'
    
    // Styling (optional)
    wrapper: true,                     // Add styled wrapper
    wrapperStyle: {
      padding: '40px 20px',
      background: '#f8f8f8',
      borderRadius: '8px',
      margin: '20px 0'
    },
    
    // Behavior (optional)
    autoResize: true,                  // Auto-resize iframe
    minHeight: '600px'                 // Minimum iframe height
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

### Position Options Explained

The `position` option determines where the widget is injected relative to your target element:

```html
<!-- beforebegin: BEFORE the target element -->
<div>Widget injected here</div>
<div id="target">Target Element</div>

<!-- afterbegin: INSIDE target, as first child -->
<div id="target">
  <div>Widget injected here</div>
  <!-- existing content -->
</div>

<!-- beforeend: INSIDE target, as last child (DEFAULT) -->
<div id="target">
  <!-- existing content -->
  <div>Widget injected here</div>
</div>

<!-- afterend: AFTER the target element -->
<div id="target">Target Element</div>
<div>Widget injected here</div>
```

## GTM Setup

### Step 1: Create Custom HTML Tag

1. Go to **Tags** → **New**
2. Name: "Macmillan Donate Widget - Inline"
3. Tag Type: **Custom HTML**
4. Paste your configuration code

### Step 2: Set Trigger

**Option A: Specific Page (Recommended)**
- Trigger Type: Page View
- Trigger fires on: Some Page Views
- Page Path contains: `/donate`

**Option B: Element Visibility**
- Trigger Type: Element Visibility
- Selection Method: CSS Selector
- Element Selector: `#donate-widget`

**Option C: Custom Event**
- Trigger Type: Custom Event
- Event name: `inject_donate_widget`

### Step 3: Save & Publish

1. Save the tag
2. Test in Preview mode
3. Verify widget appears
4. Publish container

## Use Cases

### 1. Dedicated Donate Page

**Page:** `/donate`

```html
<!-- In your page HTML -->
<main>
  <h1>Support Macmillan</h1>
  <p>Your donation helps us provide vital support...</p>
  
  <div id="donate-widget"></div>
</main>
```

**GTM Tag:**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget',
    wrapper: true
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

**GTM Trigger:**
- Page Path equals `/donate`

---

### 2. Campaign Landing Page

**Page:** `/campaigns/winter-appeal`

```html
<div class="campaign-content">
  <h1>Winter Appeal 2025</h1>
  <p>Help us reach our goal...</p>
  
  <!-- Inject widget here -->
  <div id="campaign-donate"></div>
  
  <h2>How your donation helps</h2>
</div>
```

**GTM Tag:**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#campaign-donate',
    amount: 50,              // Suggested amount
    type: 'one-time',
    wrapper: true
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

**GTM Trigger:**
- Page Path contains `/campaigns/`

---

### 3. After Article Content

**Page:** Blog posts

```html
<article>
  <h1>Article Title</h1>
  <div class="article-content">
    <!-- Article content -->
  </div>
  
  <!-- Inject widget after article -->
  <div id="post-donation"></div>
</article>
```

**GTM Tag:**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#post-donation',
    amount: 15,
    wrapper: true,
    wrapperStyle: {
      padding: '40px 20px',
      background: '#E8F5E9',
      borderRadius: '8px',
      margin: '40px 0',
      border: '2px solid #00853E'
    }
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

**GTM Trigger:**
- Page Path contains `/blog/`

---

### 4. Event Registration Confirmation

**Page:** `/events/registration-complete`

```html
<div class="confirmation">
  <h2>Registration Complete!</h2>
  <p>Thank you for registering...</p>
  
  <!-- Add donation option -->
  <h3>Support Our Cause</h3>
  <div id="event-donate"></div>
</div>
```

**GTM Tag:**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#event-donate',
    amount: 25,
    type: 'monthly',
    wrapper: true
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

**GTM Trigger:**
- Page Path contains `/registration-complete`

---

### 5. Multiple Locations on Same Page

```html
<div class="hero">
  <div id="hero-donate"></div>
</div>

<div class="content">
  <!-- Article content -->
</div>

<div class="footer-cta">
  <div id="footer-donate"></div>
</div>
```

**GTM Tag 1 (Hero):**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#hero-donate',
    amount: 50,
    wrapper: false  // No wrapper for clean hero integration
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

**Note:** For multiple widgets, you'll need to modify the script to support multiple instances or load them sequentially.

## Advanced Configuration

### Custom Styling

```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget',
    wrapper: true,
    wrapperStyle: {
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #E8F5E9 0%, #ffffff 100%)',
      borderRadius: '16px',
      margin: '40px 0',
      boxShadow: '0 4px 20px rgba(0, 133, 62, 0.2)',
      border: '3px solid #00853E'
    },
    minHeight: '700px'
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

### Dynamic Configuration (GTM Variables)

Use GTM variables for dynamic values:

```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget',
    amount: {{DonationAmountVariable}},      // GTM variable
    type: {{DonationTypeVariable}},          // GTM variable
    wrapper: true
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js"></script>
```

### Conditional Loading

Load only if target element exists:

```html
<script>
  // Check if target exists before loading
  if (document.querySelector('#donate-widget')) {
    window.MACMILLAN_DONATE_SECTION_CONFIG = {
      selector: '#donate-widget'
    };
    
    var script = document.createElement('script');
    script.src = 'https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-section.js';
    document.head.appendChild(script);
  }
</script>
```

## Manual Control API

Control the widget programmatically:

```javascript
// Inject widget manually
window.MacmillanDonateSection.inject();

// Remove widget
window.MacmillanDonateSection.remove();

// Update configuration and re-inject
window.MacmillanDonateSection.updateConfig({
  amount: 100,
  type: 'one-time'
});

// Check current configuration
console.log(window.MacmillanDonateSection.config);

// Check version
console.log(window.MacmillanDonateSection.version);
```

## GTM Events Tracked

The script automatically pushes these events to `dataLayer`:

### donate_widget_injected
```javascript
{
  event: 'donate_widget_injected',
  eventCategory: 'Donation',
  eventAction: 'Widget Injected',
  eventLabel: '#donate-widget'  // The selector used
}
```

### donate_widget_removed
```javascript
{
  event: 'donate_widget_removed',
  eventCategory: 'Donation',
  eventAction: 'Widget Removed'
}
```

### donation_complete
```javascript
{
  event: 'donation_complete',
  eventCategory: 'Donation',
  eventAction: 'Donation Complete',
  donationAmount: 25,
  donationType: 'monthly'
}
```

## Testing

### 1. GTM Preview Mode

1. Click **Preview** in GTM
2. Enter your site URL
3. Navigate to target page
4. Check Tags tab - verify tag fired
5. Check dataLayer - look for `donate_widget_injected`
6. Verify widget appears in target element

### 2. Console Testing

Open browser console (F12):

```javascript
// Check if script loaded
console.log(window.MacmillanDonateSection);

// Check configuration
console.log(window.MacmillanDonateSection.config);

// Test injection
window.MacmillanDonateSection.inject();

// Test removal
window.MacmillanDonateSection.remove();
```

### 3. Element Inspection

1. Right-click target element → Inspect
2. Verify iframe was injected
3. Check iframe src includes correct parameters
4. Verify wrapper styles applied

## Troubleshooting

### Widget doesn't appear

**Check:**
- ✓ Target element exists on page (`document.querySelector('#donate-widget')`)
- ✓ GTM tag is firing (Preview mode)
- ✓ Console for errors (F12)
- ✓ Selector is correct (copy from Elements inspector)
- ✓ No typos in configuration

**Solution:**
```javascript
// Debug in console
console.log('Element exists:', !!document.querySelector('#donate-widget'));
console.log('Script loaded:', !!window.MacmillanDonateSection);
console.log('Config:', window.MacmillanDonateSection?.config);
```

### Widget appears in wrong location

**Check:**
- ✓ Verify `selector` targets correct element
- ✓ Check `position` setting (beforebegin, afterbegin, etc.)
- ✓ Inspect HTML structure

**Solution:**
Adjust `position` in configuration or change `selector`

### Widget doesn't resize

**Check:**
- ✓ `autoResize: true` in configuration
- ✓ Console for postMessage errors
- ✓ iframe origin matches widget URL

**Solution:**
```javascript
// Manual resize listening
window.addEventListener('message', (event) => {
  console.log('Message received:', event.data);
});
```

### Multiple widgets conflict

**Issue:** Script only supports one instance per page

**Solution:** Load script multiple times is not recommended. Instead:
1. Use one inline widget per page
2. Combine with floating button for multiple CTAs
3. Or create multiple target elements and inject sequentially

## Best Practices

### ✓ DO

- Use specific, unique CSS selectors
- Test on actual page before GTM deployment
- Use Element Visibility trigger for dynamic pages
- Pre-fill amount/type for campaign pages
- Add wrapper styling for visual consistency
- Track events in GA4

### ✗ DON'T

- Don't use generic selectors like `div` or `.container`
- Don't inject into elements that change/reload
- Don't load script without target element
- Don't use multiple inline widgets on same page
- Don't forget to test mobile responsiveness

## Production Checklist

Before going live:

- [ ] Target element exists on page
- [ ] CSS selector is unique and specific
- [ ] Tested in GTM Preview mode
- [ ] Widget appears in correct location
- [ ] Pre-fill values (if used) work correctly
- [ ] Wrapper styling looks good
- [ ] Auto-resize working
- [ ] GTM events firing correctly
- [ ] Tested on mobile devices
- [ ] Tested on multiple browsers
- [ ] Donation flow works end-to-end

## Support & Resources

- 📖 **Full Integration Guide:** `/integration-options.html`
- 🧪 **Test Page:** `/test-button.html`
- 📋 **Floating Button Guide:** `GTM_IMPLEMENTATION.md`
- 🎯 **Widget Embed Docs:** `EMBED_IMPLEMENTATION_PLAN.md`

## Summary

The inline section script gives you precise control over where the donation widget appears on your pages. Perfect for:

- Dedicated donation pages
- Campaign landing pages
- Post-article CTAs
- Event registration confirmations
- Thank you pages

One script, infinite possibilities! 🎉
