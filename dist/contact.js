const PACKAGES = ['Digital Launch', 'Lead Growth System', 'AI Business Starter'];
const ENDPOINT = 'https://formsubmit.co/ajax/supportnyxra@gmail.com';

/** Render once per page; initialization handles validation and submission. */
export function renderContact() {
  return `
    <section class="contact-section" id="contact" aria-labelledby="contact-heading">
      <div class="contact-intro">
        <p class="contact-eyebrow">Start a conversation</p>
        <h1 id="contact-heading">Tell us what you have in mind.</h1>
        <p class="contact-description">A new website, a better one, or a simpler way to handle enquiries. Let’s work out what fits.</p>
      </div>
      <div class="contact-layout">
        <form class="contact-form" method="post" novalidate aria-label="Project enquiry">
          <fieldset class="contact-fields">
            <legend class="contact-legend">A little about your business.</legend>
            <div class="contact-grid">
              <div class="contact-field">
                <label for="contact-name">Your name <span aria-hidden="true">*</span></label>
                <input id="contact-name" name="name" autocomplete="name" maxlength="100" required placeholder="Your name">
              </div>
              <div class="contact-field">
                <label for="contact-business">Business name <span aria-hidden="true">*</span></label>
                <input id="contact-business" name="business" autocomplete="organization" maxlength="150" required placeholder="Your business">
              </div>
              <div class="contact-field">
                <label for="contact-email">Email <span aria-hidden="true">*</span></label>
                <input id="contact-email" type="email" name="email" autocomplete="email" maxlength="254" required placeholder="you@business.com">
              </div>
              <div class="contact-field">
                <label for="contact-phone">Phone / WhatsApp <span class="contact-optional">(optional)</span></label>
                <input id="contact-phone" type="tel" name="phone" autocomplete="tel" maxlength="30" placeholder="Your contact number">
              </div>
              <div class="contact-field">
                <label for="contact-category">Business type <span aria-hidden="true">*</span></label>
                <select id="contact-category" name="category" required>
                  <option value="">Select your business</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Gym / fitness">Gym / fitness</option>
                  <option value="Tuition / coaching">Tuition / coaching</option>
                  <option value="Other local business">Other local business</option>
                </select>
              </div>
              <div class="contact-field">
                <label for="contact-package">Interested in</label>
                <select id="contact-package" name="package">
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="Digital Launch">Digital Launch</option>
                  <option value="Lead Growth System">Lead Growth System</option>
                  <option value="AI Business Starter">AI Business Starter</option>
                </select>
              </div>
              <div class="contact-field contact-field-wide">
                <label for="contact-requirements">What would you like your website to do? <span aria-hidden="true">*</span></label>
                <textarea id="contact-requirements" name="requirements" rows="4" minlength="10" maxlength="3000" required placeholder="Tell us about your services and what customers need to find or do." aria-describedby="contact-data-note"></textarea>
              </div>
            </div>
            <div class="contact-honeypot" hidden aria-hidden="true">
              <label for="contact-website-check">Leave this empty</label>
              <input id="contact-website-check" name="website_check" tabindex="-1" autocomplete="off">
            </div>
            <label class="contact-consent" for="contact-consent">
              <input id="contact-consent" type="checkbox" name="consent" value="Agreed" required>
              <span>I agree to be contacted about my enquiry. Read the <a href="#privacy" data-policy="privacy">privacy notice</a>.</span>
            </label>
          </fieldset>
          <button class="contact-submit" type="submit"><span class="contact-submit-label">Send my enquiry</span><span aria-hidden="true">↗</span></button>
          <p class="contact-status" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"></p>
          <p class="contact-data-note" id="contact-data-note">Please don’t include patient records, passwords or payment details.</p>
        </form>
        <aside class="contact-aside" aria-label="Before we begin">
          <span class="contact-symbol" aria-hidden="true">✳</span>
          <p class="contact-eyebrow">A conversation, not a commitment.</p>
          <h3>Let’s find the right fit.</h3>
          <p>Nyxra Team reviews your requirements and discusses the scope with you. Price, timing and payment terms are agreed in writing before work starts.</p>
          <a class="contact-email" href="mailto:supportnyxra@gmail.com"><span>Prefer email?</span>supportnyxra@gmail.com <span aria-hidden="true">↗</span></a>
          <p class="contact-fine-print">No fixed delivery time or business result is promised by submitting this form.</p>
        </aside>
      </div>
    </section>`;
}

/** Bind a rendered form. The returned controller supports package CTA links. */
export function initContact(container = document) {
  const form = container.matches?.('.contact-form') ? container : container.querySelector('.contact-form');
  if (!form) return null;
  if (form.contactController) return form.contactController;

  const fields = form.querySelector('.contact-fields');
  const submit = form.querySelector('.contact-submit');
  const label = form.querySelector('.contact-submit-label');
  const status = form.querySelector('.contact-status');
  const packageField = form.elements.namedItem('package');
  let sending = false;
  let destroyed = false;
  let activeRequest = null;

  const setStatus = (message, state = '') => {
    status.textContent = message;
    status.dataset.state = state;
  };
  const setPackage = (name) => {
    if (sending || !PACKAGES.includes(name)) return false;
    packageField.value = name;
    return true;
  };
  const queryPackage = new URLSearchParams(window.location.search).get('package');
  const suppliedPackage = container.dataset?.package || form.closest('[data-package]')?.dataset.package;
  setPackage(suppliedPackage || queryPackage);

  function onInput(event) {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    if (!sending && status.dataset.state === 'success') setStatus('');
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (sending || destroyed) return;
    if (form.elements.namedItem('website_check').value) return;

    for (const name of ['name', 'business', 'requirements']) {
      const field = form.elements.namedItem(name);
      const minimum = name === 'requirements' ? 10 : 1;
      field.setCustomValidity(field.value.trim().length < minimum
        ? (minimum === 10 ? 'Please tell us a little more, using at least 10 characters.' : 'Please complete this field.')
        : '');
    }
    if (!form.checkValidity()) {
      setStatus('Please complete the required fields and agree to be contacted.', 'error');
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    for (const key of ['name', 'business', 'email', 'phone', 'requirements']) payload[key] = String(payload[key] || '').trim();
    payload._subject = `Nyxra website enquiry: ${payload.business}`;
    payload._template = 'table';
    sending = true;
    fields.disabled = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    label.textContent = 'Sending your enquiry';
    setStatus('Sending your enquiry…', 'sending');
    activeRequest = new AbortController();
    const timeout = window.setTimeout(() => activeRequest?.abort(), 15000);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: activeRequest.signal,
      });
      const result = await response.json();
      if (destroyed) return;
      const accepted = result.success === true || result.success === 'true';
      if (!accepted && /needs activation/i.test(String(result.message || ''))) {
        setStatus('The enquiry service is not ready to receive messages. Your details are still here. Please email supportnyxra@gmail.com.', 'error');
        return;
      }
      if (!response.ok || !accepted) throw new Error('Receipt was not confirmed');
      form.reset();
      setStatus('Thank you. The form service accepted your enquiry for Nyxra Team. You can also reach us at supportnyxra@gmail.com.', 'success');
    } catch (error) {
      if (destroyed) return;
      setStatus(error.name === 'AbortError'
        ? 'The request timed out, so we couldn’t confirm receipt. Your details are still here. Please try again or email supportnyxra@gmail.com.'
        : 'We couldn’t confirm receipt of your enquiry. Your details are still here. Please try again or email supportnyxra@gmail.com.', 'error');
    } finally {
      window.clearTimeout(timeout);
      activeRequest = null;
      sending = false;
      fields.disabled = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      label.textContent = 'Send my enquiry';
    }
  }

  form.addEventListener('input', onInput);
  form.addEventListener('submit', onSubmit);
  const controller = {
    setPackage,
    focus() { form.elements.namedItem('name').focus({ preventScroll: true }); },
    destroy() {
      destroyed = true;
      activeRequest?.abort();
      form.removeEventListener('input', onInput);
      form.removeEventListener('submit', onSubmit);
      delete form.contactController;
    },
  };
  form.contactController = controller;
  return controller;
}
