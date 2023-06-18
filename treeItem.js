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
    }

    .toggle {
      cursor: pointer;
    }

    .toggle::before {
      content: '▶';
      display: inline-block;
      margin-right: 0.5em;
      transform: rotate(90deg);
      transition: transform 0.3s;
    }

    .open .toggle::before {
      transform: rotate(0deg);
    }
  `;

  toggleOpen() {
    this.open = !this.open;
  }

  render() {
    return html`
      <ul class="tree">
        <li class="tree-item ${this.open ? 'open' : ''}">
          <span class="toggle" @click="${this.toggleOpen}"></span>
          <slot></slot>
          ${this.open
            ? html`
                <ul class="tree">
                  <slot name="tree-item"></slot>
                </ul>
              `
            : ''}
        </li>
      </ul>
    `;
  }
}

customElements.define('tree-item', TreeItem);
