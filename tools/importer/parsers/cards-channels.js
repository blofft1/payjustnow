/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const channels = element.querySelectorAll('.channel');
  const cells = [];

  channels.forEach((channel) => {
    const contentContainer = document.createElement('div');

    const title = channel.querySelector('.channel-title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentContainer.appendChild(h3);
    }

    const text = channel.querySelector('.channel-text');
    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      contentContainer.appendChild(p);
    }

    cells.push([contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-channels', cells });
  element.replaceWith(block);
}
