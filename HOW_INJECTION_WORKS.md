# How Widget Injection Works - Inline Section

## Overview

The **inline section** script (`donate-section.js`) dynamically injects the donation widget into any page by finding a target element and inserting an iframe into it.

---

## Step-by-Step Process

### 1. Page Setup - Add Target Element

First, your page needs a target element (a div) where the widget will be injected:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Donate to Macmillan</h1>
  <p>Your support makes a difference...</p>
  
  <!-- TARGET ELEMENT - Widget will appear here -->
  <div id="donate-widget"></div>
  
  <p>Thank you for your support!</p>
</body>
</html>
```

### 2. Configure & Load Script

Add the configuration and script tag (via GTM or directly):

```html
<script>
  // Configuration (BEFORE loading the script)
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget',  // CSS selector for target element
    amount: 25,                  // Optional: pre-fill amount
    type: 'monthly',             // Optional: pre-fill type
    wrapper: true                // Optional: add styled wrapper
  };
</script>
<script src="https://your-domain.com/donate-section.js"></script>
```

### 3. Script Executes

When the script loads, it:

#### Step A: Reads Configuration
```javascript
const config = {
  selector: '#donate-widget',
  position: 'beforeend',
  amount: 25,
  type: 'monthly',
  wrapper: true
};
```

#### Step B: Finds Target Element
```javascript
const targetElement = document.querySelector('#donate-widget');
// Finds: <div id="donate-widget"></div>
```

#### Step C: Creates Widget Container
```javascript
// Creates a wrapper div
const container = document.createElement('div');
container.id = 'macmillan-donate-widget-container';
container.style.padding = '40px 20px';
container.style.background = '#f8f8f8';
container.style.borderRadius = '8px';
```

#### Step D: Creates Iframe
```javascript
const iframe = document.createElement('iframe');
iframe.src = 'https://your-domain.com/embed?amount=25&type=monthly';
iframe.style.width = '100%';
iframe.style.minHeight = '600px';
iframe.style.border = 'none';

container.appendChild(iframe);
```

#### Step E: Injects Into Page
```javascript
targetElement.appendChild(container);
```

---

## Before & After

### BEFORE Injection:
```html
<body>
  <h1>Donate to Macmillan</h1>
  <p>Your support makes a difference...</p>
  
  <div id="donate-widget"></div>  <!-- Empty target -->
  
  <p>Thank you for your support!</p>
</body>
```

### AFTER Injection:
```html
<body>
  <h1>Donate to Macmillan</h1>
  <p>Your support makes a difference...</p>
  
  <div id="donate-widget">
    <!-- Widget container injected here -->
    <div id="macmillan-donate-widget-container" style="padding: 40px 20px; background: #f8f8f8;">
      <iframe 
        src="https://your-domain.com/embed?amount=25&type=monthly"
        style="width: 100%; min-height: 600px; border: none;">
        <!-- Widget content loads here -->
      </iframe>
    </div>
  </div>
  
  <p>Thank you for your support!</p>
</body>
```

---

## Position Options

The `position` config determines WHERE the widget is injected relative to your target element:

### 1. `beforebegin` - Before the target element
```html
<!-- Widget injected HERE -->
<div id="donate-widget"></div>
```

**Result:**
```html
<div id="macmillan-donate-widget-container">...</div>
<div id="donate-widget"></div>
```

### 2. `afterbegin` - Inside target, as first child
```html
<div id="donate-widget">
  <!-- Widget injected HERE -->
  <!-- existing content -->
</div>
```

**Result:**
```html
<div id="donate-widget">
  <div id="macmillan-donate-widget-container">...</div>
  <!-- existing content -->
</div>
```

### 3. `beforeend` - Inside target, as last child (DEFAULT)
```html
<div id="donate-widget">
  <!-- existing content -->
  <!-- Widget injected HERE -->
</div>
```

**Result:**
```html
<div id="donate-widget">
  <!-- existing content -->
  <div id="macmillan-donate-widget-container">...</div>
</div>
```

### 4. `afterend` - After the target element
```html
<div id="donate-widget"></div>
<!-- Widget injected HERE -->
```

**Result:**
```html
<div id="donate-widget"></div>
<div id="macmillan-donate-widget-container">...</div>
```

---

## Full Example: Real-World Use Case

### Your Campaign Page HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Winter Appeal 2025 - Macmillan</title>
</head>
<body>
  <header>
    <nav><!-- Navigation --></nav>
  </header>
  
  <main>
    <section class="hero">
      <h1>Winter Appeal 2025</h1>
      <p>Help us reach our goal of £1 million...</p>
    </section>
    
    <section class="impact">
      <h2>Your Impact</h2>
      <p>Every donation helps families...</p>
    </section>
    
    <!-- DONATION SECTION -->
    <section class="donate-section">
      <h2>Donate Now</h2>
      
      <!-- TARGET: Widget will inject here -->
      <div id="campaign-donate"></div>
      
    </section>
    
    <section class="stories">
      <h2>Stories from our supporters</h2>
      <!-- More content -->
    </section>
  </main>
  
  <footer>
    <!-- Footer content -->
  </footer>
  
  <!-- GTM CODE -->
  <script>
    window.MACMILLAN_DONATE_SECTION_CONFIG = {
      selector: '#campaign-donate',
      amount: 50,
      type: 'one-time',
      wrapper: true,
      wrapperStyle: {
        padding: '40px',
        background: '#E8F5E9',
        borderRadius: '12px',
        border: '2px solid #00853E'
      }
    };
  </script>
  <script src="https://donate-widget.vercel.app/donate-section.js"></script>
</body>
</html>
```

### What Happens:

1. **Page loads** → Browser renders HTML
2. **Script loads** → `donate-section.js` executes
3. **Finds target** → `document.querySelector('#campaign-donate')`
4. **Creates iframe** → With URL: `/embed?amount=50&type=one-time`
5. **Injects** → Iframe inserted into `#campaign-donate` div
6. **Widget loads** → Inside iframe, shows amount selector pre-filled with £50

### Visual Result:

```
┌─────────────────────────────────────┐
│  Header & Navigation                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Hero Section                       │
│  "Winter Appeal 2025"               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Impact Section                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  DONATE SECTION                     │
│  ┌───────────────────────────────┐  │
│  │  INJECTED WIDGET              │  │
│  │  [£15] [£25] [£50] ← selected│  │
│  │  One-time / Monthly           │  │
│  │  Impact statement...          │  │
│  │  [Continue to donate button]  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Stories Section                    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Footer                             │
└─────────────────────────────────────┘
```

---

## Auto-Resize Feature

The widget automatically resizes based on content:

### How It Works:

1. **Widget loads** in iframe at 600px height (minimum)
2. **Widget measures itself** using ResizeObserver
3. **Widget sends message** to parent page:
   ```javascript
   window.parent.postMessage({
     type: 'widget-resize',
     height: 750
   }, '*');
   ```
4. **Parent script receives** message and updates iframe height:
   ```javascript
   iframe.style.height = '750px';
   ```

### Why This Matters:

Without auto-resize:
```
┌──────────────┐
│ Widget       │
│              │ ← Content cut off
└──────────────┘
   Scrollbar appears
```

With auto-resize:
```
┌──────────────┐
│ Widget       │
│              │
│              │
│              │ ← All content visible
└──────────────┘
   No scrollbar
```

---

## GTM Implementation

### Step 1: Create GTM Tag

**Tag Type:** Custom HTML

**Tag Code:**
```html
<script>
  window.MACMILLAN_DONATE_SECTION_CONFIG = {
    selector: '#donate-widget',
    wrapper: true
  };
</script>
<script src="https://donate-widget.vercel.app/donate-section.js"></script>
```

### Step 2: Set Trigger

**Trigger Type:** Page View

**Conditions:**
- Page Path contains `/donate`
- OR Element Visibility: `#donate-widget` is visible

### Step 3: Publish

The widget will automatically inject on pages where:
1. The trigger fires (e.g., URL contains `/donate`)
2. AND the target element exists (`#donate-widget`)

---

## Advantages of This Method

### ✅ Non-Invasive
- Doesn't modify existing page structure
- Only affects the target element
- Easy to add/remove

### ✅ Flexible Positioning
- Place widget anywhere on the page
- Multiple positions supported
- Can move by changing selector

### ✅ Isolated
- Widget runs in iframe (sandboxed)
- Won't break if widget has errors
- No CSS/JS conflicts with page

### ✅ Dynamic
- Can inject after page load
- Can remove and re-inject
- Can update configuration on-the-fly

### ✅ Cross-Domain Safe
- Works even if widget is on different domain
- Security through iframe isolation
- PostMessage for communication

---

## Manual Control

You can control the widget programmatically:

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

// Check if widget is loaded
console.log(window.MacmillanDonateSection.config);
```

### Example: Conditional Loading

```javascript
// Only inject if user scrolls to donation section
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    window.MacmillanDonateSection.inject();
    observer.disconnect();
  }
});

observer.observe(document.querySelector('#donate-widget'));
```

---

## Troubleshooting

### Widget doesn't appear?

**Check 1:** Target element exists
```javascript
console.log(document.querySelector('#donate-widget')); // Should not be null
```

**Check 2:** Script loaded
```javascript
console.log(window.MacmillanDonateSection); // Should be an object
```

**Check 3:** Console errors
```javascript
// Open browser console (F12)
// Look for errors in red
```

### Widget appears in wrong place?

Change the `position` config:
```javascript
window.MACMILLAN_DONATE_SECTION_CONFIG = {
  selector: '#donate-widget',
  position: 'afterbegin'  // Try different positions
};
```

### Widget height wrong?

Check `autoResize` is enabled:
```javascript
window.MACMILLAN_DONATE_SECTION_CONFIG = {
  selector: '#donate-widget',
  autoResize: true,  // Make sure this is true
  minHeight: '600px'
};
```

---

## Summary

The inline section injection works by:

1. **Finding** a target element on your page via CSS selector
2. **Creating** an iframe container with the widget URL
3. **Inserting** that container into/around the target element
4. **Communicating** with the iframe to auto-resize
5. **Tracking** events in GTM dataLayer

It's a clean, non-invasive way to add the donation widget to any page without modifying your site's code structure!
