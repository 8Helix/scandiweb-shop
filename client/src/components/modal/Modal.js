import { PureComponent } from "react";
import { v4 } from "uuid";
import { connect } from "react-redux";
import CartImage from "../cart/CartImage";
import CartAmountBox from "../cart/CartAmountBox";
import TypeText from "../product/TypeText";
import TypeSwatch from "../product/TypeSwatch";
import "./Modal.modules.css";
import Price from "../product/Price";
import ModalTotal from "./ModalTotal";
import ModalButtons from "./ModalButtons";

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleModal(!this.props.openModal);
  }

  render() {
    const products = this.props.products;

    const currencySymbol = products[0]?.prices.find(
      (item) => item.currency.label === this.props.currency
    ).currency.symbol;

    const items = this.props.products
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next, 0);

    return (
      <>
        {items > 0 && (
          <div className="modal-container">
            <div className="cart-modal">
              <div className="cart-box">
                <div className="modal-description">
                  <strong>My Bag,</strong> {items} items
                </div>
                {products?.map((product) => (
                  <div key={v4()} className="modal-element">
                    <div className="modal-info">
                      <h2>{product.brand}</h2>
                      <h3>{product.name}</h3>
                      <Price
                        symbol={currencySymbol}
                        amount={
                          product.prices.find(
                            (item) => item.currency.symbol === currencySymbol
                          ).amount
                        }
                        modal="modal-"
                      />
                      <TypeText
                        product={product}
                        state={{
                          selectedSizeId: product.selectedSizeId,
                          selectedColorId: product.selectedColorId,
                        }}
                        modal="modal-"
                      />
                      <TypeSwatch
                        product={product}
                        state={{
                          selectedSizeId: product.selectedSizeId,
                          selectedColorId: product.selectedColorId,
                        }}
                        modal="modal-"
                      />
                    </div>
                    <div className="choice-box">
                      <CartAmountBox product={product} modal="modal-" />
                      <CartImage product={product} modal="modal-" />
                    </div>
                  </div>
                ))}
                <ModalTotal
                  currencySymbol={currencySymbol}
                  products={products}
                />
                <ModalButtons handleClick={this.handleClick} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currency,
    products: state.productReducer.products,
  };
};

export default connect(mapStateToProps)(Modal);
