/**
 * components.js
 * Carga e inyecta los componentes compartidos (header y footer)
 * en todas las páginas del sitio.
 */

/**
 * Carga un archivo HTML y lo inyecta en el elemento con el id indicado.
 * @param {string} id - ID del elemento donde se inyecta el componente
 * @param {string} path - Ruta al archivo HTML del componente
 */
async function loadComponent(id, path) {
  try {
    const response = await fetch(path)

    if (!response.ok) {
      throw new Error(`Error cargando ${path}: ${response.status}`)
    }

    const html = await response.text()
    document.getElementById(id).innerHTML = html

  } catch (error) {
    console.error(`loadComponent falló para #${id}:`, error)
  }
}

/**
 * Marca el enlace activo en la navegación
 * según la página actual.
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  const navLinks = document.querySelectorAll('.site-header__nav-link')

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href')
    if (linkPage === currentPage) {
      link.classList.add('site-header__nav-link--active')
      link.setAttribute('aria-current', 'page')
    }
  })
}

/**
 * Actualiza el año del copyright en el footer
 * automáticamente.
 */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year')
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear()
  }
}

/**
 * Inicializa todos los componentes.
 * El nav activo y el año se marcan después de cargar
 * los componentes, por eso usamos await.
 */
async function initComponents() {
  await loadComponent('site-header', 'components/header.html')
  await loadComponent('site-footer', 'components/footer.html')

  setActiveNavLink()
  setFooterYear()
}

initComponents()