import { PureComponent } from "react";

export default class ModalTotal extends PureComponent {
  render() {
    const total = this.props.products
      .map(
        (item) =>
          item.amount *
          item.prices.find(
            (item) => item.currency.symbol === this.props.currencySymbol
          ).amount
      )
      .reduce((prev, next) => prev + next, 0);

    return (
      <div className="modal-total">
        <p>Total</p>
        <p>
          {this.props.currencySymbol}
          {total.toFixed(2)}
        </p>
      </div>
    );
  }
}
