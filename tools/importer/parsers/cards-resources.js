/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const resources = element.querySelectorAll(':scope > .resource');
  const cells = [];

  resources.forEach((resource) => {
    // Image column
    const img = resource.querySelector('.resource-image img');
    const imgCell = img ? img.cloneNode(true) : document.createTextNode('');

    // Text content column
    const contentContainer = document.createElement('div');

    const title = resource.querySelector('.resource-title');
    if (title) {
      const h3 = document.createElement('h3');
      const titleText = title.querySelector('.line-normal');
      h3.textContent = titleText ? titleText.textContent.trim() : title.textContent.trim();
      contentContainer.appendChild(h3);
    }

    const text = resource.querySelector('.resource-text');
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      contentContainer.appendChild(p);
    }

    const link = resource.querySelector('.resource-content a.btn');
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      const btnText = link.querySelector('.line-normal');
      a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
      contentContainer.appendChild(a);
    }

    cells.push([imgCell, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-resources', cells });
  element.replaceWith(block);
}
