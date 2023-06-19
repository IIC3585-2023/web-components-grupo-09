class TreeItem extends HTMLElement {
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
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 5px;
        }

        ul {
          list-style-type: none;
          padding-left: 25px;
        }

        li > button {
          display: none;
        }

        li.has-children > button {
          display: inline;
          margin-right: 5px;
        }

        button {
          cursor: pointer;
        }

        span {
          color: black;
        }
      </style>

      <li>
        <button>+</button>
        <span><slot></slot></span>
        <ul>
          <!-- Here goes the children elements -->
        </ul>
      </li>
    `;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    const ul = this.shadowRoot.querySelector('ul');
    const children = Array.from(this.children);

    if (children.length > 0) {
      this.shadowRoot.querySelector('li').classList.add('has-children');
      ul.append(...children);
      ul.style.display = 'none';
    }

    button.addEventListener('click', () => {
      const isExpanded = button.textContent === '-';
      button.textContent = isExpanded ? '+' : '-';
      ul.style.display = isExpanded ? 'none' : 'block';
    });
  }
}

customElements.define('tree-item', TreeItem);
