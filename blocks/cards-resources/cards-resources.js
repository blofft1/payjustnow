function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${url.pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });
  const img = document.createElement('img');
  img.setAttribute('loading', eager ? 'eager' : 'lazy');
  img.setAttribute('alt', alt);
  picture.appendChild(img);
  img.setAttribute('src', `${url.pathname}?width=${breakpoints[breakpoints.length - 1].width}&format=webply&optimize=medium`);
  return picture;
}

function moveInstrumentation(from, to) {
  if (!from || !to) return;
  const attributes = ['data-aue-resource', 'data-aue-type', 'data-aue-label', 'data-aue-model', 'data-aue-filter', 'data-aue-component', 'data-aue-behavior'];
  attributes.forEach((attr) => {
    const val = from.getAttribute(attr);
    if (val) {
      to.setAttribute(attr, val);
      from.removeAttribute(attr);
    }
  });
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-resources-card-image';
      else div.className = 'cards-resources-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
