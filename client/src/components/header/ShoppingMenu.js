import { PureComponent } from "react";
import DropDown from "../svgs/DropDown";
import { connect } from "react-redux";

class ShoppingMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drop: false,
    };

    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop() {
    this.setState({ drop: !this.state.drop });
  }

  handleCurrency(e) {
    this.props.dispatchCurrency(e.currentTarget.id);
    this.setState({ drop: !this.state.drop });
  }

  render() {
    const currencySymbol = this.props.currencies?.find(
      (item) => item.label === this.props?.currency
    ).symbol;

    return (
      <div className="select-box">
        <div className="selected" onClick={this.handleDrop}>
          <span>{currencySymbol}</span>
          <DropDown options={this.state.drop} />
        </div>
        <div
          className={
            this.state.drop ? "currency-container active" : "currency-container"
          }
        >
          {this.props.currencies?.map((currency) => (
            <div
              key={currency.label}
              className="currency-option"
              id={currency.label}
              onClick={this.handleCurrency}
            >
              <input
                type="radio"
                className="radio"
                id={currency.label}
                name="currency"
              />

              <label htmlFor={currency.label}>
                {currency.symbol} {currency.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (currency) => {
    dispatch({ type: "CHANGE_CURRENCY", payload: currency });
  },
});

export default connect(null, mapDispatchToProps)(ShoppingMenu);
