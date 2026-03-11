/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const solutions = element.querySelectorAll(':scope > .solution');
  const cells = [];

  solutions.forEach((solution) => {
    // Image column
    const img = solution.querySelector('.solution-image img');
    const imgCell = img ? img.cloneNode(true) : document.createTextNode('');

    // Text content column
    const contentContainer = document.createElement('div');

    const label = solution.querySelector('.solution-label');
    if (label) {
      const em = document.createElement('em');
      em.textContent = label.textContent.trim();
      contentContainer.appendChild(em);
    }

    const title = solution.querySelector('.solution-title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentContainer.appendChild(h3);
    }

    const text = solution.querySelector('.solution-text');
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      contentContainer.appendChild(p);
    }

    const link = solution.querySelector('a.btn');
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      const btnText = link.querySelector('.line-normal');
      a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
      contentContainer.appendChild(a);
    }

    cells.push([imgCell, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-solutions', cells });
  element.replaceWith(block);
}
