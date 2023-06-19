import { LitElement, html, css } from 'lit';

class ProductComponent extends LitElement {
  static styles = css`
    .product {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .product-image {
      margin-bottom: 10px;
      width: 200px;
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-title {
      color: #666;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
      align-self: start;
    }

    .product-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      align-self: start;
      height: 110px;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-price {
      display: flex;
    }

    .discounted-price {
      font-size: 18px;
      color: #999;
      text-decoration: line-through;
      margin-top: 5px;
    }

    .dolar-tag {
      margin-top: 2px;
      font-size: 16px;
      font-weight: light;
      color: #222;
      margin-right: 2px; /* Add a small margin to separate the dollar tag from the price tag */
    }

    .price-tag {
      font-size: 24px;
      font-weight: bold;
      color: #222;
    }

    .discount {
      font-size: 24px;
      font-weight: bold;
      color: #222;
      border: 2px solid brown;
      background-color: rgba(255, 255, 0, 0.2);
      padding: 5px;
      margin-top: 5px;
      margin-bottom: 10px;
    }

    .product-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ff9900;
      color: #fff;
      border: none;
      padding: 10px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    .fa {
      color: orange;
    }

    #stars {
      display: flex;
      justify-content: flex-start;
    }
  `;

  static get properties() {
    return {
      rating: { type: Number },
      discount: { type: Number },
      image: { type: String },
      title: { type: String },
      description: { type: String },
      price: { type: Number },
      discountedPrice: { type: Number },
    };
  }

  constructor() {
    super();
    this.rating = 0;
    this.discount = 0;
    this.image = '';
    this.title = '';
    this.description = '';
    this.price = 0;
    this.discountedPrice = 0;
  }

  firstUpdated() {
    this.setRating(this.rating);
    this.discountedPrice = this.price - (this.price * this.discount) / 100;
  }

  setRating(rating) {
    let stars = this.shadowRoot.getElementById('stars').children;

    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.remove('fa-star-o');
        stars[i].classList.add('fa-star');
      } else {
        stars[i].classList.remove('fa-star');
        stars[i].classList.add('fa-star-o');
      }
    }
  }

  render() {
    return html`
      <div>
        <div class="product">
          <span class="discount">${this.discount}% OFF</span>
          <div class="product-image">
            <img src=${this.image} alt="Product 1" />
          </div>
          <div class="product-title">${this.title}</div>
          <div class="product-description">${this.description}</div>
          <div class="product-price">
            <span class="dolar-tag">$</span>
            <span class="price-tag">${this.discountedPrice.toFixed(2)}</span>
          </div>
          <div class="product-price">
            <span class="dolar-tag">$</span>
            <span class="discounted-price">${this.price}</span>
          </div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div id="stars">
            <span class="fa fa-star-o"></span>
            <span class="fa fa-star-o"></span>
            <span class="fa fa-star-o"></span>
            <span class="fa fa-star-o"></span>
            <span class="fa fa-star-o"></span>
          </div>
          <button class="product-button">Add to Cart</button>
        </div>
      </div>
    `;
  }
}

customElements.define('product-component', ProductComponent);
