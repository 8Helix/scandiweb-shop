import { PureComponent } from "react";

export default class Total extends PureComponent {
  render() {
    const products = this.props.products;

    const total = products
      .map(
        (item) =>
          item.amount *
          item.prices.find(
            (item) => item.currency.symbol === this.props.currencySymbol
          ).amount
      )
      .reduce((prev, next) => prev + next, 0);

    const tax = (total * 21) / 100;

    const quantity = this.props.products
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next, 0);

    return (
      <>
        <div className="total-grid">
          <p>Tax 21&#37;:</p>
          <p>
            <strong>
              {this.props.currencySymbol}
              {tax.toFixed(2)}
            </strong>
          </p>
          <p>Quantity:</p>
          <p>
            <strong>{quantity}</strong>
          </p>
          <p>Total:</p>
          <p>
            <strong>
              {this.props.currencySymbol}
              {total.toFixed(2)}
            </strong>
          </p>
        </div>
        <div className="button">
          <button>Order</button>
        </div>
      </>
    );
  }
}
