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
        { text: '£20 / 60-min session', muted: false },
        { text: '£85 for 5-week pass <strong>(Save £15)</strong>', muted: true }
      ],
      dropdownLabel: 'Sensory Cooking Groups — £20 / 60-min session or £85 for 5-week pass (Save £15)',
      helperHtml: '<strong>Sensory Cooking Groups:</strong> £20 / 60-min session or £85 for 5-week pass (Save £15). Small groups (4–6 learners max).',
      ctaText: 'Enquire About Group Sessions'
    },
    '1to1': {
      title: '1-to-1 Culinary Mentoring',
      lines: [
        { text: 'Online: £50 / 60-min session', muted: false },
        { text: 'In-Person Home Visit (London): £80 / 1.5-hr session', muted: false }
      ],
      dropdownLabel: '1-to-1 Culinary Mentoring — Online: £50 / 60-min session | In-Person Home Visit (London): £80 / 1.5-hr session',
      helperHtml: '<strong>1-to-1 Culinary Mentoring:</strong> Online: £50 / 60-min session | In-Person Home Visit (London): £80 / 1.5-hr session.',
      ctaText: 'Enquire About 1-to-1 Mentoring'
    },
    school: {
      title: 'School & Specialist Workshops',
      lines: [
        { text: 'From £150 / 2-hr workshop', muted: false }
      ],
      dropdownLabel: 'School & Specialist Workshops — From £150 / 2-hr workshop',
      helperHtml: '<strong>School &amp; Specialist Workshops:</strong> From £150 / 2-hr workshop with full risk assessment and dietary adaptation.',
      ctaText: 'Request School Workshop Pack'
    },
    other: {
      title: 'General Enquiry & Advice',
      lines: [],
      dropdownLabel: 'General Enquiry & Advice',
      helperHtml: '<strong>General Enquiry:</strong> Ask us any questions about our inclusive culinary sessions for children, young people, and adults.',
      ctaText: 'Send Enquiry'
    }
  }
};

function renderPricingAndAvailability() {
  // 1. Render Programme Card Pricing Summaries
  ['group', '1to1', 'school'].forEach(key => {
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

// Item 13: Show time slots only for 1-to-1 and consultation; show School field only for schools
function updateDynamicFields(type) {
  const helperText = document.getElementById('form-helper-text');
  const slotDiv = document.getElementById('field-slot');
  const oneToOneDiv = document.getElementById('field-1to1');
  const schoolDiv = document.getElementById('field-school');
  const submitBtn = document.getElementById('submit-btn');

  if (!slotDiv || !oneToOneDiv || !schoolDiv) return;

  slotDiv.style.display = 'none';
  oneToOneDiv.style.display = 'none';
  schoolDiv.style.display = 'none';

  const prog = SITE_PRICING_DATA.programmes[type] || SITE_PRICING_DATA.programmes.other;
  if (helperText) helperText.innerHTML = prog.helperHtml;
  if (submitBtn) submitBtn.textContent = prog.ctaText;

  if (type === '1to1' || type === 'consultation') {
    slotDiv.style.display = 'block';
    oneToOneDiv.style.display = 'block';
  } else if (type === 'school') {
    schoolDiv.style.display = 'block';
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

  // 4. Scroll Animations & Active Section Highlighting in Sticky Nav (Item 7)
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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
  }, { rootMargin: '-25% 0px -60% 0px' });

  document.querySelectorAll('main section[id]').forEach(sec => sectionObserver.observe(sec));

  // 5. Inline Validation & Accessible Form Submission (Items 3 & 13)
  const contactForm = document.getElementById('booking-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
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
      const currentService = select ? select.value : '';
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

      // Valid submission — show accessible success state
      if (successBanner) {
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
      const msg = document.getElementById('newsletter-feedback');
      if (msg) {
        msg.style.display = 'block';
      }
      newsletterForm.reset();
    });
  }
});
