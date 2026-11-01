// Single Source of Truth for Pricing & Availability (Item 2, 6 & 13)
const SITE_PRICING_DATA = {
  availability: {
    daysLabel: 'Every Wednesday & Thursday',
    timeWindows: ['4:00 – 5:00 PM', '5:00 – 6:00 PM', '6:00 – 7:00 PM'],
    slots: [
      { value: 'wed-4pm', label: 'Wednesday 4:00 PM – 5:00 PM' },
      { value: 'wed-5pm', label: 'Wednesday 5:00 PM – 6:00 PM' },
      { value: 'wed-6pm', label: 'Wednesday 6:00 PM – 7:00 PM' },
      { value: 'thu-4pm', label: 'Thursday 4:00 PM – 5:00 PM' },
      { value: 'thu-5pm', label: 'Thursday 5:00 PM – 6:00 PM' },
      { value: 'thu-6pm', label: 'Thursday 6:00 PM – 7:00 PM' }
    ]
  },
  programmes: {
    consultation: {
      title: 'Free 15-Min Sensory Consultation',
      lines: [],
      dropdownLabel: 'Free 15-Min Sensory Consultation — Speak with Cookery Chef Anna first (£0)',
      helperHtml: '<strong>Free 15-Min Sensory Consultation:</strong> A friendly, no-obligation chat to discuss sensory preferences, routines, and goals.',
      ctaText: 'Book Free 15-Min Consultation'
    },
    group: {
      title: 'Sensory Cooking Groups',
      lines: [
        { text: '£30 per session', muted: false },
        { text: '£85 for a 5-week pass <strong>(save £15)</strong>', muted: true },
        { text: '£130 for 6 sessions <strong>(1 session free)</strong>', muted: true }
      ],
      dropdownLabel: 'Sensory Cooking Groups — £30 per session | £85 for 5-week pass (save £15) | £130 for 6 sessions (1 free)',
      helperHtml: '<strong>Sensory Cooking Groups:</strong> £30 per session, £85 for a 5-week pass (save £15), or £130 for 6 sessions (where 1 session is free). Small online groups (4–6 learners max).',
      ctaText: 'Enquire About Group Sessions'
    },
    '1to1': {
      title: '1-to-1 Culinary Mentoring',
      lines: [
        { text: '£50 per session', muted: false }
      ],
      dropdownLabel: '1-to-1 Culinary Mentoring (Online session) — £50 per session',
      helperHtml: '<strong>1-to-1 Culinary Mentoring (Online session):</strong> £50 per session. Includes "Fridge-Friendly" cooking adapted around your fridge and cupboard, and students can give suggestions!',
      ctaText: 'Enquire About 1-to-1 Mentoring'
    },
    other: {
      title: 'General Enquiry & Advice',
      lines: [],
      dropdownLabel: 'General Enquiry & Advice',
      helperHtml: '<strong>General Enquiry:</strong> Ask us any questions about our inclusive online culinary sessions for children, young people, and adults.',
      ctaText: 'Send Enquiry'
    }
  }
};

function renderPricingAndAvailability() {
  // 1. Render Programme Card Pricing Summaries
  ['group', '1to1'].forEach(key => {
    const container = document.getElementById('pricing-card-' + key);
    const prog = SITE_PRICING_DATA.programmes[key];
    if (container && prog) {
      container.innerHTML = prog.lines.map(line =>
        line.muted
          ? `<span style="color: var(--color-text-muted); font-weight: normal;">${line.text}</span>`
          : `<span>${line.text}</span>`
      ).join('');
    }
  });

  // 2. Render Availability Card Days & Time Window Badges
  const daysEl = document.getElementById('availability-days-label');
  if (daysEl) {
    daysEl.textContent = SITE_PRICING_DATA.availability.daysLabel;
  }
  const badgesEl = document.getElementById('availability-slots-badges');
  if (badgesEl) {
    badgesEl.innerHTML = SITE_PRICING_DATA.availability.timeWindows
      .map(win => `<span class="time-slot">${win}</span>`)
      .join('');
  }

  // 3. Render Form Programme Dropdown
  const interestSelect = document.getElementById('interest');
  if (interestSelect) {
    const currentVal = interestSelect.value || 'consultation';
    interestSelect.innerHTML = Object.keys(SITE_PRICING_DATA.programmes).map(key => {
      const prog = SITE_PRICING_DATA.programmes[key];
      return `<option value="${key}">${prog.dropdownLabel}</option>`;
    }).join('');
    interestSelect.value = SITE_PRICING_DATA.programmes[currentVal] ? currentVal : 'consultation';
  }

  // 4. Render Form Weekly Time Slot Dropdown
  const slotSelect = document.getElementById('group-slot');
  if (slotSelect) {
    slotSelect.innerHTML = SITE_PRICING_DATA.availability.slots
      .map(slot => `<option value="${slot.value}">${slot.label}</option>`)
      .join('');
  }
}

// Show time slots only for 1-to-1 and consultation
function updateDynamicFields(type) {
  const helperText = document.getElementById('form-helper-text');
  const slotDiv = document.getElementById('field-slot');
  const oneToOneDiv = document.getElementById('field-1to1');
  const submitBtn = document.getElementById('submit-btn');

  if (!slotDiv || !oneToOneDiv) return;

  slotDiv.style.display = 'none';
  oneToOneDiv.style.display = 'none';

  const prog = SITE_PRICING_DATA.programmes[type] || SITE_PRICING_DATA.programmes.other;
  if (helperText) helperText.innerHTML = prog.helperHtml;
  if (submitBtn) submitBtn.textContent = prog.ctaText;

  if (type === '1to1' || type === 'consultation') {
    slotDiv.style.display = 'block';
    oneToOneDiv.style.display = 'block';
  }
}

function bookSession(type) {
  const select = document.getElementById('interest');
  if (select && SITE_PRICING_DATA.programmes[type]) {
    select.value = type;
    updateDynamicFields(type);
  }
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Item 16: Gallery Filter with aria-pressed toggle buttons
function filterGallery(category, activeBtn) {
  const tabs = document.querySelectorAll('.gallery-tab');
  tabs.forEach(tab => {
    tab.setAttribute('aria-pressed', 'false');
  });
  if (activeBtn) {
    activeBtn.setAttribute('aria-pressed', 'true');
  }

  const cards = document.querySelectorAll('.kitchen-gallery-card');
  cards.forEach(card => {
    const itemCat = card.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Make functions available globally for inline handlers
window.updateDynamicFields = updateDynamicFields;
window.bookSession = bookSession;
window.filterGallery = filterGallery;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Pricing & Check URL Query (?service=consultation)
  renderPricingAndAvailability();
  const select = document.getElementById('interest');
  try {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam && select && SITE_PRICING_DATA.programmes[serviceParam]) {
      select.value = serviceParam;
    }
  } catch (e) {
    // Ignore URL parsing errors
  }
  if (select) {
    updateDynamicFields(select.value);
  }

  // 2. Accessibility Panel State & Persistence inside try/catch (Item 15)
  const defaultA11y = {
    textSize: 'standard', // 'standard' | 'lg' | 'xl'
    wideSpacing: false,
    dyslexia: false,
    highContrast: false,
    calmMode: false
  };

  let a11yState = { ...defaultA11y };
  try {
    const saved = localStorage.getItem('ableAndBeyondA11y');
    if (saved) {
      a11yState = { ...defaultA11y, ...JSON.parse(saved) };
    }
  } catch (err) {
    // Fallback safely if localStorage is blocked
  }

  function saveA11yState() {
    try {
      localStorage.setItem('ableAndBeyondA11y', JSON.stringify(a11yState));
    } catch (err) {
      // Ignore storage write errors
    }
  }

  function applyA11yState() {
    document.body.classList.remove('text-size-lg', 'text-size-xl', 'wide-spacing', 'dyslexia-mode', 'high-contrast', 'calm-mode');
    if (a11yState.textSize === 'lg') document.body.classList.add('text-size-lg');
    if (a11yState.textSize === 'xl') document.body.classList.add('text-size-xl');
    if (a11yState.wideSpacing) document.body.classList.add('wide-spacing');
    if (a11yState.dyslexia) document.body.classList.add('dyslexia-mode');
    if (a11yState.highContrast) document.body.classList.add('high-contrast');
    if (a11yState.calmMode) document.body.classList.add('calm-mode');

    // Sync UI buttons
    document.querySelectorAll('.a11y-size-btn').forEach(btn => {
      const size = btn.getAttribute('data-size');
      btn.setAttribute('aria-pressed', size === a11yState.textSize ? 'true' : 'false');
    });

    const toggleMap = {
      'a11y-spacing-btn': a11yState.wideSpacing,
      'a11y-dyslexia-btn': a11yState.dyslexia,
      'a11y-contrast-btn': a11yState.highContrast,
      'a11y-calm-btn': a11yState.calmMode
    };
    Object.keys(toggleMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const active = Boolean(toggleMap[id]);
        el.setAttribute('aria-pressed', active ? 'true' : 'false');
        const statusSpan = el.querySelector('.a11y-status');
        if (statusSpan) statusSpan.textContent = active ? 'On' : 'Off';
      }
    });
  }

  applyA11yState();

  const a11yTrigger = document.getElementById('a11y-panel-trigger');
  const a11yPanel = document.getElementById('a11y-panel');
  const a11yClose = document.getElementById('a11y-panel-close');

  if (a11yTrigger && a11yPanel) {
    a11yTrigger.addEventListener('click', () => {
      const isExpanded = a11yTrigger.getAttribute('aria-expanded') === 'true';
      a11yTrigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
      a11yPanel.hidden = isExpanded;
    });

    if (a11yClose) {
      a11yClose.addEventListener('click', () => {
        a11yTrigger.setAttribute('aria-expanded', 'false');
        a11yPanel.hidden = true;
        a11yTrigger.focus();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !a11yPanel.hidden) {
        a11yTrigger.setAttribute('aria-expanded', 'false');
        a11yPanel.hidden = true;
        a11yTrigger.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!a11yPanel.hidden && !a11yPanel.contains(e.target) && !a11yTrigger.contains(e.target)) {
        a11yTrigger.setAttribute('aria-expanded', 'false');
        a11yPanel.hidden = true;
      }
    });
  }

  document.querySelectorAll('.a11y-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      a11yState.textSize = btn.getAttribute('data-size') || 'standard';
      applyA11yState();
      saveA11yState();
    });
  });

  const bindToggle = (id, key) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        a11yState[key] = !a11yState[key];
        applyA11yState();
        saveA11yState();
      });
    }
  };
  bindToggle('a11y-spacing-btn', 'wideSpacing');
  bindToggle('a11y-dyslexia-btn', 'dyslexia');
  bindToggle('a11y-contrast-btn', 'highContrast');
  bindToggle('a11y-calm-btn', 'calmMode');

  const resetBtn = document.getElementById('a11y-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      a11yState = { ...defaultA11y };
      applyA11yState();
      saveA11yState();
    });
  }

  // 3. FAQ Accordion (Item 10 - Accessible & Keyboard Operable)
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      trigger.setAttribute('aria-expanded', !expanded ? 'true' : 'false');
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });

  // 4. Dynamic Sticky Header Offset, Anchor Aliases & Scroll Animations (Item 7)
  const siteHeader = document.getElementById('site-header') || document.querySelector('header');
  function syncHeaderOffset() {
    if (!siteHeader) return;
    const h = Math.ceil(siteHeader.getBoundingClientRect().height) + 16;
    document.documentElement.style.setProperty('--header-offset', h + 'px');
  }
  syncHeaderOffset();
  window.addEventListener('resize', syncHeaderOffset);
  if (typeof ResizeObserver !== 'undefined' && siteHeader) {
    new ResizeObserver(syncHeaderOffset).observe(siteHeader);
  }

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Support common anchor aliases (#pricing -> #programs, #about -> #team)
  const anchorAliases = {
    '#pricing': '#programs',
    '#about': '#team',
    '#schedule': '#availability'
  };

  function resolveTargetElement(hash) {
    if (!hash || !hash.startsWith('#')) return null;
    const normalized = anchorAliases[hash.toLowerCase()] || hash;
    try {
      return document.querySelector(normalized);
    } catch (err) {
      return null;
    }
  }

  function revealAndScrollToHash(hash, smooth = true) {
    const target = resolveTargetElement(hash);
    if (!target) return false;
    // Immediately reveal the target section and its children so it never appears blank
    target.classList.add('active');
    target.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    syncHeaderOffset();
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    return true;
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = resolveTargetElement(href);
      if (target) {
        e.preventDefault();
        revealAndScrollToHash(href, true);
        if (history.pushState) {
          history.pushState(null, '', href);
        }
      }
    });
  });

  if (window.location.hash) {
    setTimeout(() => {
      revealAndScrollToHash(window.location.hash, false);
    }, 50);
  }

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id) {
        navLinks.forEach(link => {
          const isMatch = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active-section', isMatch);
          if (isMatch) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  document.querySelectorAll('main section[id]').forEach(sec => sectionObserver.observe(sec));

  // 5. Inline Validation & Accessible Form Submission (Items 3 & 13)
  const contactForm = document.getElementById('booking-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const slotInput = document.getElementById('group-slot');
    const sensoryInput = document.getElementById('sensory-notes');
    const messageInput = document.getElementById('message');
    const schoolInput = document.getElementById('school-name');
    const consentInput = document.getElementById('privacy-consent');
    const successBanner = document.getElementById('form-success-banner');

    function setError(inputEl, errorId, hasError) {
      const errEl = document.getElementById(errorId);
      if (inputEl) {
        inputEl.classList.toggle('input-invalid', hasError);
        inputEl.setAttribute('aria-invalid', hasError ? 'true' : 'false');
      }
      if (errEl) {
        errEl.classList.toggle('visible', hasError);
      }
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstInvalid = null;

      // Validate Name
      const nameEmpty = !nameInput || nameInput.value.trim().length < 2;
      setError(nameInput, 'error-name', nameEmpty);
      if (nameEmpty) {
        isValid = false;
        firstInvalid = firstInvalid || nameInput;
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      setError(emailInput, 'error-email', emailInvalid);
      if (emailInvalid) {
        isValid = false;
        firstInvalid = firstInvalid || emailInput;
      }

      // Validate School Name if School tier is selected
      const currentService = select ? select.value : 'consultation';
      if (currentService === 'school' && schoolInput) {
        const schoolEmpty = schoolInput.value.trim().length < 2;
        setError(schoolInput, 'error-school', schoolEmpty);
        if (schoolEmpty) {
          isValid = false;
          firstInvalid = firstInvalid || schoolInput;
        }
      } else if (schoolInput) {
        setError(schoolInput, 'error-school', false);
      }

      // Validate Required Privacy Consent Checkbox
      const consentUnchecked = !consentInput || !consentInput.checked;
      setError(consentInput, 'error-consent', consentUnchecked);
      if (consentUnchecked) {
        isValid = false;
        firstInvalid = firstInvalid || consentInput;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Build pre-filled mailto & WhatsApp links for admin@ableandbeyond.support and 07936 433264
      const progObj = SITE_PRICING_DATA.programmes[currentService] || SITE_PRICING_DATA.programmes.other;
      const callerName = nameInput ? nameInput.value.trim() : '';
      const callerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Not provided';
      const slotText = (slotInput && (currentService === '1to1' || currentService === 'consultation') && slotInput.options[slotInput.selectedIndex])
        ? slotInput.options[slotInput.selectedIndex].text
        : 'N/A';
      const sensoryText = sensoryInput && sensoryInput.value.trim() ? sensoryInput.value.trim() : 'None provided';
      const notesText = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'None provided';

      const subject = encodeURIComponent(`Cookery School Enquiry: ${progObj.title} — ${callerName}`);
      const bodyLines = [
        `Hello Anna & Lucas (Able & Beyond | Online Cookery School),`,
        ``,
        `I would like to enquire about: ${progObj.title}`,
        `Name: ${callerName}`,
        `Email: ${emailVal}`,
        `Phone / WhatsApp: ${callerPhone}`,
        `Preferred Slot: ${slotText}`,
        `Learner Profile & Sensory Preferences: ${sensoryText}`,
        `Additional Notes: ${notesText}`
      ];
      const mailtoHref = `mailto:admin@ableandbeyond.support?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      const waText = encodeURIComponent(`Hi Able & Beyond Cookery School! I'm ${callerName} (${emailVal}) enquiring about: ${progObj.title}. Preferred slot: ${slotText}.`);
      const waHref = `https://wa.me/447936433264?text=${waText}`;

      // Valid submission — show accessible success state with direct email & WhatsApp action links
      if (successBanner) {
        successBanner.innerHTML = `
          <div>Thank you, ${callerName}! Your enquiry details are ready—we reply within 24 hours.</div>
          <div style="margin-top: 0.65rem; font-weight: 600; font-size: 0.95rem; display: flex; flex-wrap: wrap; gap: 0.6rem;">
            <a href="${mailtoHref}" class="btn btn-primary" style="min-height: 40px; padding: 0.45rem 1rem; font-size: 0.9rem;">✉ Send via Email (admin@ableandbeyond.support)</a>
            <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-secondary" style="min-height: 40px; padding: 0.45rem 1rem; font-size: 0.9rem;">💬 Send via WhatsApp (07936 433264)</a>
          </div>
        `;
        successBanner.classList.add('visible');
        successBanner.focus();
      }
      contactForm.reset();
      if (select) {
        select.value = 'consultation';
        updateDynamicFields('consultation');
      }
    });
  }

  // 6. Recipe Hub Email Newsletter Sign-Up (Item 22)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('newsletter-email');
      const subEmail = emailEl ? emailEl.value.trim() : '';
      const msg = document.getElementById('newsletter-feedback');
      if (msg) {
        const mailtoSub = `mailto:admin@ableandbeyond.support?subject=${encodeURIComponent('Monthly Step-by-Step Recipe Sheet Subscription')}&body=${encodeURIComponent('Please add ' + subEmail + ' to the Able & Beyond Online Cookery School monthly step-by-step recipe sheets.')}`;
        msg.innerHTML = `Thank you! You are subscribed to our monthly recipe sheets. <a href="${mailtoSub}" style="color: var(--color-primary-dark); font-weight: 800;">Click here to confirm via email (admin@ableandbeyond.support)</a>.`;
        msg.style.display = 'block';
      }
      newsletterForm.reset();
    });
  }
});
