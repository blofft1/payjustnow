var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-business-page.js
  var import_business_page_exports = {};
  __export(import_business_page_exports, {
    default: () => import_business_page_default
  });

  // tools/importer/parsers/hero-business.js
  function parse(element, { document }) {
    const videoSource = element.querySelector(".s-media video source");
    const heroImg = element.querySelector(".s-media img");
    let bgMedia;
    if (videoSource) {
      const videoLink = document.createElement("a");
      videoLink.href = videoSource.getAttribute("src");
      videoLink.textContent = videoSource.getAttribute("src");
      bgMedia = videoLink;
    } else if (heroImg) {
      bgMedia = heroImg.cloneNode(true);
    }
    const contentContainer = document.createElement("div");
    const h1 = element.querySelector(".s-title");
    if (h1) {
      const heading = document.createElement("h1");
      const words = h1.querySelectorAll(".word-inner");
      const wordTexts = [];
      words.forEach((w) => wordTexts.push(w.textContent.trim()));
      heading.textContent = wordTexts.join(" ");
      contentContainer.appendChild(heading);
    }
    const sText = element.querySelector(".s-text");
    if (sText) {
      const p = document.createElement("p");
      const lines = sText.querySelectorAll(".line-inner");
      const lineTexts = [];
      lines.forEach((l) => lineTexts.push(l.textContent.trim()));
      p.textContent = lineTexts.join(" ");
      contentContainer.appendChild(p);
    }
    const ctaLink = element.querySelector(".s-buttons a.btn");
    if (ctaLink) {
      const a = document.createElement("a");
      a.href = ctaLink.getAttribute("href");
      const btnText = ctaLink.querySelector(".line-normal");
      a.textContent = btnText ? btnText.textContent.trim() : ctaLink.textContent.trim();
      const strong = document.createElement("strong");
      strong.appendChild(a);
      contentContainer.appendChild(strong);
    }
    const stats = element.querySelectorAll(".hero-statistic");
    if (stats.length > 0) {
      const statsContainer = document.createElement("p");
      stats.forEach((stat, i) => {
        const figure = stat.querySelector(".hero-statistic-figure");
        const text = stat.querySelector(".hero-statistic-text");
        if (figure && text) {
          const bold = document.createElement("strong");
          bold.textContent = figure.textContent.trim();
          statsContainer.appendChild(bold);
          statsContainer.appendChild(document.createTextNode(" " + text.textContent.trim()));
          if (i < stats.length - 1) {
            statsContainer.appendChild(document.createElement("br"));
          }
        }
      });
      contentContainer.appendChild(statsContainer);
    }
    const cells = [];
    if (bgMedia) {
      cells.push([bgMedia]);
    }
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-business", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse2(element, { document }) {
    const items = element.querySelectorAll(":scope > .carousel-item");
    const cells = [];
    const seenSrcs = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        const src = img.getAttribute("src");
        if (!seenSrcs.has(src)) {
          seenSrcs.add(src);
          const clonedImg = img.cloneNode(true);
          cells.push([clonedImg]);
        }
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-solutions.js
  function parse3(element, { document }) {
    const solutions = element.querySelectorAll(":scope > .solution");
    const cells = [];
    solutions.forEach((solution) => {
      const img = solution.querySelector(".solution-image img");
      const imgCell = img ? img.cloneNode(true) : document.createTextNode("");
      const contentContainer = document.createElement("div");
      const label = solution.querySelector(".solution-label");
      if (label) {
        const em = document.createElement("em");
        em.textContent = label.textContent.trim();
        contentContainer.appendChild(em);
      }
      const title = solution.querySelector(".solution-title");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentContainer.appendChild(h3);
      }
      const text = solution.querySelector(".solution-text");
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        contentContainer.appendChild(p);
      }
      const link = solution.querySelector("a.btn");
      if (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        const btnText = link.querySelector(".line-normal");
        a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
        contentContainer.appendChild(a);
      }
      cells.push([imgCell, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-solutions", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse4(element, { document }) {
    const statistics = element.querySelectorAll(".statistic");
    const cells = [];
    statistics.forEach((stat) => {
      const img = stat.querySelector(".statistic-icon img");
      const imgCell = img ? img.cloneNode(true) : document.createTextNode("");
      const contentContainer = document.createElement("div");
      const title = stat.querySelector(".statistic-title");
      if (title) {
        const h2 = document.createElement("h2");
        h2.textContent = title.textContent.trim();
        contentContainer.appendChild(h2);
      }
      const text = stat.querySelector(".statistic-text");
      if (text) {
        const p = document.createElement("p");
        const lines = text.querySelectorAll(".line-inner");
        if (lines.length > 0) {
          const lineTexts = [];
          lines.forEach((l) => lineTexts.push(l.textContent.trim()));
          p.textContent = lineTexts.join(" ");
        } else {
          p.textContent = text.textContent.trim();
        }
        contentContainer.appendChild(p);
      }
      const figure = stat.querySelector(".statistic-figure");
      if (figure) {
        const strong = document.createElement("strong");
        const chars = figure.querySelectorAll(".char-inner");
        if (chars.length > 0) {
          const charTexts = [];
          chars.forEach((c) => charTexts.push(c.textContent.trim()));
          strong.textContent = charTexts.join("");
        } else {
          strong.textContent = figure.textContent.trim();
        }
        contentContainer.appendChild(strong);
      }
      cells.push([imgCell, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-marketing.js
  function parse5(element, { document }) {
    const leftCol = document.createElement("div");
    const stackImages = element.querySelectorAll(".image-stack-item img");
    stackImages.forEach((img) => {
      const cloned = img.cloneNode(true);
      leftCol.appendChild(cloned);
      leftCol.appendChild(document.createElement("br"));
    });
    const rightCol = document.createElement("div");
    const label = element.querySelector(".s-content .s-label");
    if (label) {
      const em = document.createElement("em");
      em.textContent = label.textContent.trim();
      rightCol.appendChild(em);
    }
    const heading = element.querySelector(".s-content .s-title");
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      rightCol.appendChild(h2);
    }
    const text = element.querySelector(".s-content .s-text");
    if (text) {
      const p = document.createElement("p");
      p.textContent = text.textContent.trim();
      rightCol.appendChild(p);
    }
    const link = element.querySelector(".s-content a.btn");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      const btnText = link.querySelector(".line-normal");
      a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
      const strong = document.createElement("strong");
      strong.appendChild(a);
      rightCol.appendChild(strong);
    }
    const cells = [
      [leftCol, rightCol]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-marketing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resources.js
  function parse6(element, { document }) {
    const resources = element.querySelectorAll(":scope > .resource");
    const cells = [];
    resources.forEach((resource) => {
      const img = resource.querySelector(".resource-image img");
      const imgCell = img ? img.cloneNode(true) : document.createTextNode("");
      const contentContainer = document.createElement("div");
      const title = resource.querySelector(".resource-title");
      if (title) {
        const h3 = document.createElement("h3");
        const titleText = title.querySelector(".line-normal");
        h3.textContent = titleText ? titleText.textContent.trim() : title.textContent.trim();
        contentContainer.appendChild(h3);
      }
      const text = resource.querySelector(".resource-text");
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        contentContainer.appendChild(p);
      }
      const link = resource.querySelector(".resource-content a.btn");
      if (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        const btnText = link.querySelector(".line-normal");
        a.textContent = btnText ? btnText.textContent.trim() : link.textContent.trim();
        contentContainer.appendChild(a);
      }
      cells.push([imgCell, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-resources", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-benefits.js
  function parse7(element, { document }) {
    const items = element.querySelectorAll(":scope > .carousel-item");
    const cells = [];
    const seenTexts = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      const img = item.querySelector("img");
      const textSpan = item.querySelector(".carousel-item-text");
      if (img && textSpan) {
        const text = textSpan.textContent.trim();
        if (!seenTexts.has(text)) {
          seenTexts.add(text);
          const clonedImg = img.cloneNode(true);
          const span = document.createElement("span");
          span.textContent = text;
          cells.push([clonedImg, span]);
        }
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-benefits", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-channels.js
  function parse8(element, { document }) {
    const channels = element.querySelectorAll(".channel");
    const cells = [];
    channels.forEach((channel) => {
      const contentContainer = document.createElement("div");
      const title = channel.querySelector(".channel-title");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentContainer.appendChild(h3);
      }
      const text = channel.querySelector(".channel-text");
      if (text) {
        const p = document.createElement("p");
        p.textContent = text.textContent.trim();
        contentContainer.appendChild(p);
      }
      cells.push([contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-channels", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-testimonials.js
  function parse9(element, { document }) {
    const testimonials = element.querySelectorAll(".testimonials-inner > .testimonial");
    const cells = [];
    testimonials.forEach((testimonial) => {
      const img = testimonial.querySelector("img");
      const imgCell = img ? img.cloneNode(true) : document.createTextNode("");
      const contentContainer = document.createElement("div");
      const role = testimonial.querySelector(".testimonial-role");
      if (role) {
        const em = document.createElement("em");
        em.textContent = role.textContent.trim();
        contentContainer.appendChild(em);
      }
      const name = testimonial.querySelector(".testimonial-name");
      if (name) {
        const h4 = document.createElement("h4");
        h4.textContent = name.textContent.trim();
        contentContainer.appendChild(h4);
      }
      const quote = testimonial.querySelector(".testimonial-quote p");
      if (quote) {
        const p = document.createElement("p");
        p.textContent = quote.textContent.trim();
        contentContainer.appendChild(p);
      }
      cells.push([imgCell, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-testimonials", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/payjustnow-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#CybotCookiebotDialog",
        "#CybotCookiebotDialogBodyUnderlay",
        '[class*="cookie"]',
        ".cc-window"
      ]);
      const body = element.closest("body");
      if (body && body.style.overflow === "hidden") {
        body.style.overflow = "scroll";
      }
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer.footer",
        "nav",
        ".header",
        ".footer",
        // Commented-out sections from source
        ".section-wallet",
        // Scripts, styles, iframes, noscript
        "script",
        "style",
        "iframe",
        "link",
        "noscript",
        "svg",
        // Mobile-only toggle icons
        ".toggle.mobile-only"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-scroll");
        el.removeAttribute("data-scroll-speed");
      });
    }
  }

  // tools/importer/transformers/payjustnow-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-business-page.js
  var parsers = {
    "hero-business": parse,
    "carousel-logos": parse2,
    "cards-solutions": parse3,
    "cards-stats": parse4,
    "columns-marketing": parse5,
    "cards-resources": parse6,
    "carousel-benefits": parse7,
    "cards-channels": parse8,
    "carousel-testimonials": parse9
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "business-page",
    description: "Business landing page for PayJustNow merchant services",
    urls: [
      "https://payjustnow.com/business/"
    ],
    blocks: [
      {
        name: "hero-business",
        instances: ["section.section-hero"]
      },
      {
        name: "carousel-logos",
        instances: ["section.section-carousel.section-brands .carousel.carousel-logos"]
      },
      {
        name: "cards-solutions",
        instances: ["section.section-solutions .solutions"]
      },
      {
        name: "cards-stats",
        instances: ["section.section-statistics-scroller .statistics-scroller"]
      },
      {
        name: "columns-marketing",
        instances: ["section.section-marketing .s-inner"]
      },
      {
        name: "cards-resources",
        instances: ["section.section-resources .resources"]
      },
      {
        name: "carousel-benefits",
        instances: ["section.section-benefits .carousel.carousel-benefits"]
      },
      {
        name: "cards-channels",
        instances: ["section.section-channels .channels"]
      },
      {
        name: "carousel-testimonials",
        instances: ["section.section-testimonials .testimonials"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "section.section-hero",
        style: "dark",
        blocks: ["hero-business"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Brand Logos",
        selector: "section.section-carousel.section-brands",
        style: "dark",
        blocks: ["carousel-logos"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Solutions",
        selector: "section.section-solutions",
        style: "dark",
        blocks: ["cards-solutions"],
        defaultContent: ["section.section-solutions .s-inner > .s-content"]
      },
      {
        id: "section-4",
        name: "Statistics Scroller",
        selector: "section.section-statistics-scroller",
        style: "dark",
        blocks: ["cards-stats"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Marketing Solutions",
        selector: "section.section-marketing.section-image-stack",
        style: null,
        blocks: ["columns-marketing"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Resources",
        selector: "section.section-resources",
        style: "dark",
        blocks: ["cards-resources"],
        defaultContent: ["section.section-resources .s-inner > .s-content"]
      },
      {
        id: "section-7",
        name: "Benefits",
        selector: "section.section-benefits",
        style: null,
        blocks: ["carousel-benefits"],
        defaultContent: ["section.section-benefits .s-inner > .s-content"]
      },
      {
        id: "section-8",
        name: "Channels",
        selector: "section.section-channels",
        style: null,
        blocks: ["cards-channels"],
        defaultContent: ["section.section-channels .s-inner > .s-content"]
      },
      {
        id: "section-9",
        name: "Testimonials",
        selector: "section.section-testimonials",
        style: null,
        blocks: ["carousel-testimonials"],
        defaultContent: ["section.section-testimonials .s-inner > .s-content"]
      },
      {
        id: "section-10",
        name: "CTA Banner",
        selector: "section.section-cta",
        style: "accent",
        blocks: [],
        defaultContent: ["section.section-cta .cta"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_business_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      try {
        transform2.call(null, "afterTransform", main, __spreadProps(__spreadValues({}, payload), {
          template: PAGE_TEMPLATE
        }));
      } catch (e) {
        console.error("Section transformer failed:", e);
      }
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_business_page_exports);
})();
