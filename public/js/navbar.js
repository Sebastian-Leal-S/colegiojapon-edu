// Delegated navbar toggling so it works across client-side navigations
const NAV_TOGGLE_SELECTOR = '#nav-toggle';
const MOBILE_MENU_ID = 'mobile-menu';
const ICON_OPEN_ID = 'icon-open';
const ICON_CLOSE_ID = 'icon-close';

function get(id) { return document.getElementById(id); }

function openMenu() {
  const menu = get(MOBILE_MENU_ID);
  const toggle = get('nav-toggle');
  const iconOpen = get(ICON_OPEN_ID);
  const iconClose = get(ICON_CLOSE_ID);
  if (!menu || !toggle) return;
  menu.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  if (iconOpen) iconOpen.classList.add('hidden');
  if (iconClose) iconClose.classList.remove('hidden');
}

function closeMenu() {
  const menu = get(MOBILE_MENU_ID);
  const toggle = get('nav-toggle');
  const iconOpen = get(ICON_OPEN_ID);
  const iconClose = get(ICON_CLOSE_ID);
  if (!menu || !toggle) return;
  menu.classList.add('hidden');
  toggle.setAttribute('aria-expanded', 'false');
  if (iconOpen) iconOpen.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
}

function toggleMenu() {
  const menu = get(MOBILE_MENU_ID);
  if (!menu) return;
  if (menu.classList.contains('hidden')) openMenu(); else closeMenu();
}

// Use event delegation so the listener remains after client-side navigation
document.addEventListener('click', (event) => {
  const target = event.target;
  // Toggle button
  if (target.closest && target.closest(NAV_TOGGLE_SELECTOR)) {
    event.preventDefault();
    toggleMenu();
    return;
  }

  // Click on a mobile menu link -> close menu
  const mobileLink = target.closest && target.closest(`#${MOBILE_MENU_ID} a`);
  if (mobileLink) {
    // let the navigation proceed, then close the menu
    // close synchronously so UI updates immediately
    closeMenu();
  }
});

// Close with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
