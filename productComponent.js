import { LitElement, html, css } from "lit";

class RatingComponent extends LitElement {
    static styles = css `
    .product {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
      height: 100px;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-price {
      display: flex;
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
    }

    .product-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ff9900;
      color: #fff;
      border: none;
      padding: 10px 0;
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
        };
    }

    constructor() {
        super();
        this.rating = 0;
        this.discount = 0;
        this.image = "";
        this.title = "";
        this.description = "";
        this.price = 0;
    }
    firstUpdated() {
        this.setRating(this.rating);
    }

    setRating(rating) {
        let stars = this.shadowRoot.getElementById("stars").children;

        for (let i = 0; i < stars.length; i++) {
            if (i < rating) {
                stars[i].classList.remove("fa-star-o");
                stars[i].classList.add("fa-star");
            } else {
                stars[i].classList.remove("fa-star");
                stars[i].classList.add("fa-star-o");
            }
        }
    }

    render() {
        return html `
      <div>
        <div class="product">
          <div class="product-image">
            <img src=${this.image} alt="Product 1" />
          </div>
          <div class="product-title">${this.title}</div>
          <div class="product-description">${this.description}</div>
          <div class="product-price">
            <span class="dolar-tag">$</span>
            <span class="price-tag">${this.price}</span>
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
          <span class="discount">${this.discount}% OFF</span>
        </div>
      </div>
    `;
    }
}

customElements.define("rating-component", RatingComponent);
customElements.define("rating-component", RatingComponent);