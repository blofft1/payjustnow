/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const items = element.querySelectorAll(':scope > .carousel-item');
  const cells = [];

  // Track unique items to avoid duplicates from carousel cloning
  const seenTexts = new Set();

  items.forEach((item) => {
    const img = item.querySelector('img');
    const textSpan = item.querySelector('.carousel-item-text');

    if (img && textSpan) {
      const text = textSpan.textContent.trim();
      if (!seenTexts.has(text)) {
        seenTexts.add(text);
        const clonedImg = img.cloneNode(true);
        const span = document.createElement('span');
        span.textContent = text;
        cells.push([clonedImg, span]);
      }
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-benefits', cells });
  element.replaceWith(block);
}
