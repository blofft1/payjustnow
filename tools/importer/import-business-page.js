/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBusinessParser from './parsers/hero-business.js';
import carouselLogosParser from './parsers/carousel-logos.js';
import cardsSolutionsParser from './parsers/cards-solutions.js';
import cardsStatsParser from './parsers/cards-stats.js';
import columnsMarketingParser from './parsers/columns-marketing.js';
import cardsResourcesParser from './parsers/cards-resources.js';
import carouselBenefitsParser from './parsers/carousel-benefits.js';
import cardsChannelsParser from './parsers/cards-channels.js';
import carouselTestimonialsParser from './parsers/carousel-testimonials.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/payjustnow-cleanup.js';
import sectionsTransformer from './transformers/payjustnow-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-business': heroBusinessParser,
  'carousel-logos': carouselLogosParser,
  'cards-solutions': cardsSolutionsParser,
  'cards-stats': cardsStatsParser,
  'columns-marketing': columnsMarketingParser,
  'cards-resources': cardsResourcesParser,
  'carousel-benefits': carouselBenefitsParser,
  'cards-channels': cardsChannelsParser,
  'carousel-testimonials': carouselTestimonialsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'business-page',
  description: 'Business landing page for PayJustNow merchant services',
  urls: [
    'https://payjustnow.com/business/',
  ],
  blocks: [
    {
      name: 'hero-business',
      instances: ['section.section-hero'],
    },
    {
      name: 'carousel-logos',
      instances: ['section.section-carousel.section-brands .carousel.carousel-logos'],
    },
    {
      name: 'cards-solutions',
      instances: ['section.section-solutions .solutions'],
    },
    {
      name: 'cards-stats',
      instances: ['section.section-statistics-scroller .statistics-scroller'],
    },
    {
      name: 'columns-marketing',
      instances: ['section.section-marketing .s-inner'],
    },
    {
      name: 'cards-resources',
      instances: ['section.section-resources .resources'],
    },
    {
      name: 'carousel-benefits',
      instances: ['section.section-benefits .carousel.carousel-benefits'],
    },
    {
      name: 'cards-channels',
      instances: ['section.section-channels .channels'],
    },
    {
      name: 'carousel-testimonials',
      instances: ['section.section-testimonials .testimonials'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'section.section-hero',
      style: 'dark',
      blocks: ['hero-business'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Brand Logos',
      selector: 'section.section-carousel.section-brands',
      style: 'dark',
      blocks: ['carousel-logos'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Solutions',
      selector: 'section.section-solutions',
      style: 'dark',
      blocks: ['cards-solutions'],
      defaultContent: ['section.section-solutions .s-inner > .s-content'],
    },
    {
      id: 'section-4',
      name: 'Statistics Scroller',
      selector: 'section.section-statistics-scroller',
      style: 'dark',
      blocks: ['cards-stats'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Marketing Solutions',
      selector: 'section.section-marketing.section-image-stack',
      style: null,
      blocks: ['columns-marketing'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Resources',
      selector: 'section.section-resources',
      style: 'dark',
      blocks: ['cards-resources'],
      defaultContent: ['section.section-resources .s-inner > .s-content'],
    },
    {
      id: 'section-7',
      name: 'Benefits',
      selector: 'section.section-benefits',
      style: null,
      blocks: ['carousel-benefits'],
      defaultContent: ['section.section-benefits .s-inner > .s-content'],
    },
    {
      id: 'section-8',
      name: 'Channels',
      selector: 'section.section-channels',
      style: null,
      blocks: ['cards-channels'],
      defaultContent: ['section.section-channels .s-inner > .s-content'],
    },
    {
      id: 'section-9',
      name: 'Testimonials',
      selector: 'section.section-testimonials',
      style: null,
      blocks: ['carousel-testimonials'],
      defaultContent: ['section.section-testimonials .s-inner > .s-content'],
    },
    {
      id: 'section-10',
      name: 'CTA Banner',
      selector: 'section.section-cta',
      style: 'accent',
      blocks: [],
      defaultContent: ['section.section-cta .cta'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Section transformer runs separately after cleanup (needs template.sections)
    try {
      sectionsTransformer.call(null, 'afterTransform', main, {
        ...payload,
        template: PAGE_TEMPLATE,
      });
    } catch (e) {
      console.error('Section transformer failed:', e);
    }

    // 6. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 7. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
