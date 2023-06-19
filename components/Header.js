class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          background-color: #333;
          padding: 10px;
        }

        .header-content {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hamburger-menu {
          font-size: 24px;
          margin-right: 10px;
          cursor: pointer;
        }
      </style>

      <div class="header-content">
        <span class="hamburger-menu">&#9776;</span>
        <slot></slot>
      </div>
    `;

    const hamburgerMenu = this.shadowRoot.querySelector('.hamburger-menu');
    hamburgerMenu.addEventListener('click', () => {
      const sidebarComponent = document.querySelector('sidebar-component');
      sidebarComponent.classList.toggle('open');
    });
  }
}

customElements.define('header-component', HeaderComponent);
