/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image/video from .s-media
  const videoSource = element.querySelector('.s-media video source');
  const heroImg = element.querySelector('.s-media img');

  // Build the background media cell
  let bgMedia;
  if (videoSource) {
    const videoLink = document.createElement('a');
    videoLink.href = videoSource.getAttribute('src');
    videoLink.textContent = videoSource.getAttribute('src');
    bgMedia = videoLink;
  } else if (heroImg) {
    bgMedia = heroImg.cloneNode(true);
  }

  // Build the content cell
  const contentContainer = document.createElement('div');

  // Heading
  const h1 = element.querySelector('.s-title');
  if (h1) {
    const heading = document.createElement('h1');
    const words = h1.querySelectorAll('.word-inner');
    const wordTexts = [];
    words.forEach((w) => wordTexts.push(w.textContent.trim()));
    heading.textContent = wordTexts.join(' ');
    contentContainer.appendChild(heading);
  }

  // Description text
  const sText = element.querySelector('.s-text');
  if (sText) {
    const p = document.createElement('p');
    const lines = sText.querySelectorAll('.line-inner');
    const lineTexts = [];
    lines.forEach((l) => lineTexts.push(l.textContent.trim()));
    p.textContent = lineTexts.join(' ');
    contentContainer.appendChild(p);
  }

  // CTA button
  const ctaLink = element.querySelector('.s-buttons a.btn');
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.getAttribute('href');
    const btnText = ctaLink.querySelector('.line-normal');
    a.textContent = btnText ? btnText.textContent.trim() : ctaLink.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    contentContainer.appendChild(strong);
  }

  // Hero statistics
  const stats = element.querySelectorAll('.hero-statistic');
  if (stats.length > 0) {
    const statsContainer = document.createElement('p');
    stats.forEach((stat, i) => {
      const figure = stat.querySelector('.hero-statistic-figure');
      const text = stat.querySelector('.hero-statistic-text');
      if (figure && text) {
        const bold = document.createElement('strong');
        bold.textContent = figure.textContent.trim();
        statsContainer.appendChild(bold);
        statsContainer.appendChild(document.createTextNode(' ' + text.textContent.trim()));
        if (i < stats.length - 1) {
          statsContainer.appendChild(document.createElement('br'));
        }
      }
    });
    contentContainer.appendChild(statsContainer);
  }

  const cells = [];
  // Row 1: background media
  if (bgMedia) {
    cells.push([bgMedia]);
  }
  // Row 2: content
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-business', cells });
  element.replaceWith(block);
}
