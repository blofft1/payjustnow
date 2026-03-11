/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const items = element.querySelectorAll(':scope > .carousel-item');
  const cells = [];

  // Track unique image sources to avoid duplicates from carousel cloning
  const seenSrcs = new Set();

  items.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      if (!seenSrcs.has(src)) {
        seenSrcs.add(src);
        const clonedImg = img.cloneNode(true);
        cells.push([clonedImg]);
      }
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-logos', cells });
  element.replaceWith(block);
}
