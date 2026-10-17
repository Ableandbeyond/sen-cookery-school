# Able and Beyond | SEN Cookery School

Static, accessible website for **Able and Beyond SEN Cookery School**, designed to meet **WCAG 2.2 Level AA** standards for neurodivergent learners, families, carers, and SEN schools.

---

## ⚠️ Mandatory Safeguarding & Photo Consent Note

> **IMPORTANT SAFEGUARDING REQUIREMENT:**  
> **Confirm written consent exists for every learner photo before publishing.**  
> - Never include learner first names, surnames, or identifying school badges in visible captions, filenames, or image `alt` attributes unless explicit written media consent specifically covers named publication.
> - All learner captions on the live website have been anonymised (e.g., *"A learner preparing fresh tomato sauce with tutor support"*).
> - If consent is withdrawn by a parent, carer, or adult learner at any time, remove the image from `assets/images/` and redeploy immediately.

---

## 🌐 Checklist: Moving to a Custom Domain with HTTPS (GitHub Pages)

Follow these steps when moving from `https://ableandbeyond.github.io/sen-cookery-school/` to your custom domain (e.g., `https://www.ableandbeyond.co.uk`):

- [ ] **1. Purchase Domain:** Register your domain (e.g. `ableandbeyond.co.uk`) with a domain registrar (Cloudflare, Namecheap, 123 Reg, Google/Squarespace).
- [ ] **2. Configure DNS Records at Your Registrar:**
  - Add four `A` records for the apex domain (`@`) pointing to GitHub Pages IP addresses:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`
  - Add a `CNAME` record for `www` pointing to `ableandbeyond.github.io`.
- [ ] **3. Add Custom Domain in GitHub Repository Settings:**
  - Go to **GitHub Repository → Settings → Pages → Custom domain**.
  - Enter `www.ableandbeyond.co.uk` and click **Save** (this automatically creates a `CNAME` file in the repository).
- [ ] **4. Enable HTTPS Enforcement:**
  - Wait 10–30 minutes for DNS verification and the free Let's Encrypt SSL certificate to provision.
  - Tick the **"Enforce HTTPS"** checkbox in **Settings → Pages**.
- [ ] **5. Update Canonical & Open Graph URLs in `index.html`:**
  - Replace `https://ableandbeyond.github.io/sen-cookery-school/` in `<link rel="canonical">`, `og:url`, and `og:image` meta tags with your new custom domain URL.
- [ ] **6. Set Up a Professional Email Inbox:**
  - Configure Google Workspace or Microsoft 365 for `hello@ableandbeyond.co.uk` (with SPF, DKIM, and DMARC records) and connect the enquiry form endpoint (e.g., Formspree, Web3Forms, or Netlify Forms).

---

## 📋 Placeholders You Still Need to Fill In Before Full Launch

Search the codebase for `[ADD` or `[CONFIRM` to locate every placeholder:

1. **Online Group Calendar (`index.html`):**
   - `[ADD PUBLIC GOOGLE CALENDAR URL]` — Replace with your public Google Calendar URL.
   - `[ADD DATE]` — Replace Week 1, Week 2, and Week 3 placeholders with the upcoming monthly dates.
2. **Testimonials Section (`index.html`):**
   - `[ADD REAL PARENT TESTIMONIAL 1]`, `[ADD REAL PARENT TESTIMONIAL 2]`, `[ADD REAL SCHOOL/SENDCO TESTIMONIAL 3]` — Replace with real, consented quotes.
3. **FAQ Section (`index.html`):**
   - Review all answers marked with `[CONFIRM]` (age ranges supported, parental presence rules, cancellation notice period, direct payments / EOTAS / personal budget acceptance).
4. **Enquiry Form & Recipe Newsletter Action (`index.html`):**
   - `[ADD FORM ENDPOINT URL]` — Connect `<form id="booking-form">` and `<form id="newsletter-form">` to your email form handler (e.g. Formspree).
5. **Footer & Legal Pages (`index.html`, `privacy-policy.html`, `accessibility-statement.html`):**
   - `[ADD OFFICIAL CONTACT EMAIL]`
   - `[ADD OFFICIAL PHONE / WHATSAPP]`
   - `[ADD SOCIAL MEDIA LINKS]`
   - `[ADD REGISTERED BUSINESS ADDRESS / COMPANY OR UTR DETAILS]`
   - `[ADD PUBLIC LIABILITY INSURANCE & ICO DETAILS]`
