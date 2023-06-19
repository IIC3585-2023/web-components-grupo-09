class SidebarComponent extends HTMLElement {
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
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-in-out;
          background-color: rgba(0, 0, 0, 0.6);
        }

        :host(.open) {
          opacity: 1;
          pointer-events: auto;
        }

        .sidebar-container {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 400px;
          background-color: #f2f2f2;
          overflow-y: auto;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        :host(.open) .sidebar-container {
          transform: translateX(0);
        }

        .sidebar-content {
          padding: 20px;
          margin-top: 30px;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          font-family: 'FontAwesome', sans-serif;
          font-size: 18px;
          color: #333;
        }
      </style>

      <div class="sidebar-container">
        <div class="sidebar-content">
          <slot></slot>
        </div>
        <button class="close-button" aria-label="Close Sidebar">&#xf00d;</button>
      </div>
    `;

    const closeButton = this.shadowRoot.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
      this.classList.remove('open');
    });

    this.addEventListener('click', (event) => {
      // Close the sidebar when clicking outside of it
      if (event.target === this) {
        this.classList.remove('open');
      }
    });
  }
}

customElements.define('sidebar-component', SidebarComponent);
