import { html, css, LitElement } from 'lit';

class TreeItem extends LitElement {
    static styles = css`
    .tree {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .tree-item {
      margin-left: 1em;
      background-color: #f1f1f1;
      color: #000;
      transition: background-color 0.3s;
    }

    .tree-item:hover {
      background-color: #e8e8e8;
    }

    .toggle {
      cursor: pointer;
    }

    .toggle::before {
      content: '▶';
      display: inline-block;
      margin-right: 0.5em;
      transition: transform 0.3s;
    }

    .open .toggle::before {
      transform: rotate(90deg);
    }

    .children {
      display: none;
    }

    .open .children {
      display: block;
    }
  `;

  static properties = {
    open: { type: Boolean },
  };

  constructor() {
    super();
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  render() {
    return html`
      <ul class="tree">
        <li class="tree-item ${this.open ? 'open' : ''}">
          <span class="toggle" @click="${this.toggleOpen}"></span>
          <slot></slot>
          <ul class="children ${this.open ? 'open' : ''}">
            <slot name="tree-item"></slot>
          </ul>
        </li>
      </ul>
    `;
  }
}

customElements.define('tree-item', TreeItem);
