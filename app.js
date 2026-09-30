const tabs = [...document.querySelectorAll('[data-trip]')];
let trip = 'Local ride';
let selectedPackage = 'Wayanad day trip';
function selectTrip(value) {
  trip = value;
  tabs.forEach(button => { const active = button.dataset.trip === value; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
}
tabs.forEach(button => button.addEventListener('click', () => selectTrip(button.dataset.trip)));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  selectTrip(link.dataset.service);
  if (trip === 'Airport') document.querySelector('#destination').value = 'Calicut International Airport';
  document.querySelector('#pickup').focus({preventScroll: true});
}));
document.querySelectorAll('[data-package]').forEach(button => button.addEventListener('click', () => {
  selectedPackage = button.dataset.package;
  document.querySelectorAll('[data-package]').forEach(option => { const active = option === button; option.classList.toggle('selected', active); option.setAttribute('aria-pressed', String(active)); });
}));
document.querySelector('#package-book').addEventListener('click', () => {
  selectTrip('Outstation');
  document.querySelector('#pickup').value = 'Kozhikode (Calicut)';
  document.querySelector('#destination').value = selectedPackage;
  document.querySelector('#stay').checked = true;
});
function localToday() { const today = new Date(); return [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-'); }
document.querySelector('#date').min = localToday();
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const pickup = document.querySelector('#pickup');
  const destination = document.querySelector('#destination');
  const date = document.querySelector('#date');
  for (const input of [pickup, destination]) { input.setCustomValidity(input.value.trim() ? '' : 'Please enter a location.'); if (!input.reportValidity()) return; }
  date.min = localToday();
  if (!date.reportValidity()) return;
  const message = `Hello Loyal Cab! I’d like a trip quote.\n\nJourney: ${trip}\nPickup: ${pickup.value.trim()}\nDestination: ${destination.value.trim()}\nDate: ${date.value}\nTravellers: ${document.querySelector('#passengers').value}\nSightseeing & stay assistance: ${document.querySelector('#stay').checked ? 'Yes, please discuss options' : 'Not requested'}\n\nPlease confirm availability, fare and inclusions.`;
  const url = `https://wa.me/919895703350?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Your enquiry is ready. Send it in WhatsApp to contact us. '));
  const retry = document.createElement('a'); retry.href = url; retry.target = '_blank'; retry.rel = 'noopener noreferrer'; retry.textContent = 'Open WhatsApp ↗'; retry.style.textDecoration = 'underline'; status.append(retry);
});
document.querySelectorAll('#pickup, #destination').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();

// Carry the chosen sightseeing stop into the existing enquiry form.
document.querySelectorAll('[data-destination]').forEach(link => link.addEventListener('click', () => {
  selectTrip(link.dataset.destinationTrip);
  const pickup = document.querySelector('#pickup');
  const destination = document.querySelector('#destination');
  if (!pickup.value.trim()) pickup.value = 'Kozhikode (Calicut)';
  destination.value = link.dataset.destination;
  pickup.setCustomValidity('');
  destination.setCustomValidity('');
  document.querySelector('#form-status').textContent = `${link.dataset.destination} selected. Add your date and traveller count to enquire about a sightseeing trip.`;
}));
