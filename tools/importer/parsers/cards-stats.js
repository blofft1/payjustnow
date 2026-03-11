/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const statistics = element.querySelectorAll('.statistic');
  const cells = [];

  statistics.forEach((stat) => {
    // Image column - icon
    const img = stat.querySelector('.statistic-icon img');
    const imgCell = img ? img.cloneNode(true) : document.createTextNode('');

    // Text content column
    const contentContainer = document.createElement('div');

    const title = stat.querySelector('.statistic-title');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent.trim();
      contentContainer.appendChild(h2);
    }

    const text = stat.querySelector('.statistic-text');
    if (text) {
      const p = document.createElement('p');
      const lines = text.querySelectorAll('.line-inner');
      if (lines.length > 0) {
        const lineTexts = [];
        lines.forEach((l) => lineTexts.push(l.textContent.trim()));
        p.textContent = lineTexts.join(' ');
      } else {
        p.textContent = text.textContent.trim();
      }
      contentContainer.appendChild(p);
    }

    const figure = stat.querySelector('.statistic-figure');
    if (figure) {
      const strong = document.createElement('strong');
      const chars = figure.querySelectorAll('.char-inner');
      if (chars.length > 0) {
        const charTexts = [];
        chars.forEach((c) => charTexts.push(c.textContent.trim()));
        strong.textContent = charTexts.join('');
      } else {
        strong.textContent = figure.textContent.trim();
      }
      contentContainer.appendChild(strong);
    }

    cells.push([imgCell, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
