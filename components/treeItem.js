class TreeItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // creamos shadow root
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { /* selecciona a la componente anfitriona del shadow dom en este casp es el tree component mismo*/
          display: block;
          background-color: #f2f2f2;
          padding: 10px;
        }

        ul {
          list-style-type: none;
          padding-left: 25px;
        }

        li > button { /* deja de mostrar todos los botones de los elementos */
          display: none;
        }

        li.has-children > button {/* mostramos solo si tienen hijos */
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
        <span><slot></slot></span> <!-- span para que vaya al lado del boton y slot para traer el titulo -->
        <ul>
          <!-- Aquí van los elementos children -->
        </ul>
      </li>
    `;
  }

  connectedCallback() {
    // este evento se gatilla cuando el elemento es insertado en el DOM

    const button = this.shadowRoot.querySelector('button'); // tenemos el botón del shadow dom
    const ul = this.shadowRoot.querySelector('ul'); // tenemos la lista del shadow dom
    const children = Array.from(this.children); // traemos la lista de hijos del light dom

    if (children.length > 0) {
      //  revisamos si tiene hijos
      this.shadowRoot.querySelector('li').classList.add('has-children'); // lo marcamos como que tiene hijos
      ul.append(...children); // agregamos los hijos que trajimos del light dom
      ul.style.display = 'none'; // ocultamos la lista
    }

    button.addEventListener('click', () => {
      // evento del boton de click
      const isExpanded = button.textContent === '-'; // esta expandido si su simbolo es -
      button.textContent = isExpanded ? '+' : '-'; // cambiamos el simbolo
      ul.style.display = isExpanded ? 'none' : 'block'; // cambiamos la visibilidad de la lista
    });
  }
}

customElements.define('tree-item', TreeItem);
