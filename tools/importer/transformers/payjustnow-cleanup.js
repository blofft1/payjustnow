/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: PayJustNow cleanup.
 * Selectors from captured DOM of https://payjustnow.com/business/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banners and overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#CybotCookiebotDialog',
      '#CybotCookiebotDialogBodyUnderlay',
      '[class*="cookie"]',
      '.cc-window',
    ]);

    // Remove scroll-locked overflow styles
    const body = element.closest('body');
    if (body && body.style.overflow === 'hidden') {
      body.style.overflow = 'scroll';
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content: header, footer, nav
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer.footer',
      'nav',
      '.header',
      '.footer',
      // Commented-out sections from source
      '.section-wallet',
      // Scripts, styles, iframes, noscript
      'script',
      'style',
      'iframe',
      'link',
      'noscript',
      'svg',
      // Mobile-only toggle icons
      '.toggle.mobile-only',
    ]);

    // Remove tracking and event attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-scroll');
      el.removeAttribute('data-scroll-speed');
    });
  }
}
