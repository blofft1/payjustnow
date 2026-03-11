export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (rows.length < 2) return;

  const bgRow = rows[0];
  const fgRow = rows[1];

  bgRow.classList.add('hero-business-background');
  fgRow.classList.add('hero-business-foreground');

  // Check for video link in the background row
  const vidLink = bgRow.querySelector('a[href*=".mp4"]');
  if (vidLink) {
    const video = document.createElement('video');
    video.src = vidLink.href;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    bgRow.innerHTML = '';
    bgRow.append(video);
    video.load();
    video.play().catch(() => {});
  } else if (!bgRow.querySelector('picture')) {
    block.classList.add('no-image');
  }

  // Structure the stats row: find the last <p> with multiple <strong> tags
  const paragraphs = fgRow.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const strongs = p.querySelectorAll('strong');
    if (strongs.length >= 2) {
      // This is the stats paragraph - restructure it
      const statsContainer = document.createElement('div');
      statsContainer.classList.add('hero-business-stats');

      strongs.forEach((strong) => {
        const statItem = document.createElement('div');
        statItem.classList.add('hero-business-stat');

        const value = document.createElement('span');
        value.classList.add('hero-business-stat-value');
        value.textContent = strong.textContent;

        // Get the label text after this strong
        const label = document.createElement('span');
        label.classList.add('hero-business-stat-label');
        let labelText = '';
        let node = strong.nextSibling;
        while (node && node.nodeName !== 'STRONG' && node.nodeName !== 'BR') {
          if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
          }
          node = node.nextSibling;
        }
        label.textContent = labelText.trim();

        statItem.append(value, label);
        statsContainer.append(statItem);
      });

      p.replaceWith(statsContainer);
    }
  });
}
