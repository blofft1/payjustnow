/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  // Left column: image stack (3 images)
  const leftCol = document.createElement('div');
  const stackImages = element.querySelectorAll('.image-stack-item img');
  stackImages.forEach((img) => {
    const cloned = img.cloneNode(true);
    leftCol.appendChild(cloned);
    leftCol.appendChild(document.createElement('br'));
  });

  // Right column: label, heading, text, CTA
  const rightCol = document.createElement('div');

  const label = element.querySelector('.s-content .s-label');
  if (label) {
    const em = document.createElement('em');
    em.textContent = label.textContent.trim();
    rightCol.appendChild(em);
  }

  const heading = element.querySelector('.s-content .s-title');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    rightCol.appendChild(h2);
  }

  const text = element.querySelector('.s-content .s-text');
  if (text) {
    const p = document.createElement('p');
    p.textContent = text.textContent.trim();
    rightCol.appendChild(p);
  }

  const link = element.querySelector('.s-content a.btn');
  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    const btnText = link.querySelector('.line-normal');
    a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    rightCol.appendChild(strong);
  }

  const cells = [
    [leftCol, rightCol],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-marketing', cells });
  element.replaceWith(block);
}
