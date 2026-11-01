# Able & Beyond | Online Cookery School

Static, accessible website for **Able & Beyond | Online Cookery School** (`https://cookeryschool.ableandbeyond.support/`), integrated into the **Able & Beyond** digital ecosystem (`https://ableandbeyond.support/`) and designed to meet **WCAG 2.2 Level AA** standards for neurodivergent learners, families, carers, and SEN educators.

- **Main Hub:** [https://ableandbeyond.support/](https://ableandbeyond.support/)
- **Online Cookery School:** [https://cookeryschool.ableandbeyond.support/](https://cookeryschool.ableandbeyond.support/)
- **Life Skills Arcade:** [https://games.ableandbeyond.support/](https://games.ableandbeyond.support/)
- **SEN Reports Portal:** [https://reports.ableandbeyond.support/](https://reports.ableandbeyond.support/)
- **Official Contact Email:** `admin@ableandbeyond.support`
- **Official Phone / WhatsApp:** `07936 433264` (`+44 7936 433264`)

---

## ⚠️ Mandatory Safeguarding & Photo Consent Note

> **IMPORTANT SAFEGUARDING REQUIREMENT:**  
> **Confirm written consent exists for every learner photo before publishing.**  
> - Never include learner surnames or identifying school badges in visible captions, filenames, or image `alt` attributes unless explicit written media consent specifically covers publication.
> - If consent is withdrawn by a parent, carer, or adult learner at any time, remove the image from `assets/images/` and redeploy immediately.

---

## 🌐 Custom Subdomain Configuration (`cookeryschool.ableandbeyond.support`)

This repository includes a root `CNAME` file configured for **`cookeryschool.ableandbeyond.support`**.

To complete or verify DNS setup at your domain registrar (for `ableandbeyond.support`):
1. **Add a `CNAME` DNS Record:**
   - **Type:** `CNAME`
   - **Name / Host:** `cookeryschool`
   - **Target / Value:** `ableandbeyond.github.io`
   - **TTL:** Automatic / 3600
2. **GitHub Repository Settings:**
   - Go to **GitHub Repository (`Ableandbeyond/sen-cookery-school`) → Settings → Pages**.
   - Confirm **Custom domain** is set to `cookeryschool.ableandbeyond.support`.
   - Once DNS verification completes, tick **"Enforce HTTPS"**.
