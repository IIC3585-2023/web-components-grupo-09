class TreeItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isOpen = false;
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    addEventListeners() {
      this.shadowRoot.querySelector('.toggle').addEventListener('click', () => {
        this.toggleOpen();
        this.render();
      });
    }
  
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  
    render() {
      const template = `
        <style>
          ul {
            list-style-type: none;
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
            content: url(public/arrow.png);;
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
        </style>
        <ul class="tree">
          <li class="tree-item ${this.isOpen ? 'open' : ''}">
            <span class="toggle"></span>
            <slot></slot>
            <ul class="children ${this.isOpen ? 'open' : ''}">
              <slot name="tree-item"></slot>
            </ul>
          </li>
        </ul>
      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  customElements.define('tree-item', TreeItem);