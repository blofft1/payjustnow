/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const testimonials = element.querySelectorAll('.testimonials-inner > .testimonial');
  const cells = [];

  testimonials.forEach((testimonial) => {
    // Image column
    const img = testimonial.querySelector('img');
    const imgCell = img ? img.cloneNode(true) : document.createTextNode('');

    // Text content column
    const contentContainer = document.createElement('div');

    const role = testimonial.querySelector('.testimonial-role');
    if (role) {
      const em = document.createElement('em');
      em.textContent = role.textContent.trim();
      contentContainer.appendChild(em);
    }

    const name = testimonial.querySelector('.testimonial-name');
    if (name) {
      const h4 = document.createElement('h4');
      h4.textContent = name.textContent.trim();
      contentContainer.appendChild(h4);
    }

    const quote = testimonial.querySelector('.testimonial-quote p');
    if (quote) {
      const p = document.createElement('p');
      p.textContent = quote.textContent.trim();
      contentContainer.appendChild(p);
    }

    cells.push([imgCell, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-testimonials', cells });
  element.replaceWith(block);
}
