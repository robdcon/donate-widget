# Google Tag Manager Implementation

## Quick Start

Add this single line to your GTM Custom HTML tag:

```html
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-button.js"></script>
```

**That's it!** The floating donate button will appear on your site.

## GTM Setup Steps

1. **Create Custom HTML Tag**
   - Go to Tags → New
   - Name: "Macmillan Donate Button"
   - Tag Type: Custom HTML
   - Paste the script tag above

2. **Set Trigger**
   - Triggering: All Pages
   - Or create custom trigger for specific pages

3. **Publish**
   - Save → Submit → Publish

## What You Get

- 🎯 **Floating Button**: Appears in bottom-right corner
- 📱 **Mobile Responsive**: Auto-adapts to screen size
- 🎬 **Modal Overlay**: Opens widget in a beautiful modal
- 📊 **GTM Events**: Automatic dataLayer tracking
- ♿ **Accessible**: ESC key to close, ARIA labels
- 🔒 **Secure**: Iframe isolation

## Configuration (Optional)

Customize button appearance:

```html
<script>
  window.MACMILLAN_DONATE_CONFIG = {
    position: 'bottom-right',  // or 'bottom-left', 'top-right', 'top-left'
    buttonText: 'Donate Now',
    buttonColor: '#00853E',
    buttonHoverColor: '#006B32'
  };
</script>
<script src="https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/donate-button.js"></script>
```

## GTM Events Tracked

The script automatically pushes these events to `dataLayer`:

- `donate_modal_opened` - User clicks button
- `donate_modal_closed` - User closes modal
- `donation_complete` - Donation successful (with amount/type)

## Manual Control

Control the button via JavaScript:

```javascript
// Open modal
window.MacmillanDonateButton.open();

// Close modal
window.MacmillanDonateButton.close();

// Access config
window.MacmillanDonateButton.config;
```

## Testing

1. Use GTM Preview mode
2. Visit your site
3. Look for floating button
4. Click to test modal

Check browser console for: `Macmillan Donate Button initialized`

## Conditional Loading

### Only on Blog Posts
- Trigger: Page URL contains `/blog/`

### Exclude from Donation Pages
- Trigger: Page URL does NOT contain `/donate`

### Only for Mobile
- Trigger: Custom JavaScript → `{{Device Type}}` equals `mobile`

## Full Documentation

Visit: `https://donate-widget-7rbvheu4a-robdcons-projects.vercel.app/gtm-guide.html`

This page includes:
- Live demo
- Complete configuration options
- GA4 event setup
- Troubleshooting guide
- Advanced use cases

## Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- Script is self-contained (no external dependencies)
- Widget loads in iframe (prevents XSS)
- No cookies or tracking without consent
- Stripe-compliant payment handling

## Troubleshooting

**Button doesn't appear?**
- Check GTM Preview - is tag firing?
- Check browser console for errors
- Verify script URL is correct

**Modal doesn't open?**
- Check for JavaScript errors
- Verify iframe is allowed (CSP policy)

**Style conflicts?**
- Button uses inline styles to avoid conflicts
- Override with `!important` if needed

## Production Checklist

- [ ] Test in GTM Preview mode
- [ ] Verify on mobile devices
- [ ] Check button position on all pages
- [ ] Test donation flow end-to-end
- [ ] Verify GA4 events are firing
- [ ] Test ESC key closes modal
- [ ] Verify Stripe test mode is working

## Support

For issues or questions:
1. Check browser console (F12)
2. Verify GTM tag is firing
3. Test in incognito mode
4. Try different browsers/devices
