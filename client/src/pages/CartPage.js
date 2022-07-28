import { PureComponent } from "react";
import { connect } from "react-redux";
import "./CartPage.modules.css";
import { v4 } from "uuid";
import CartImage from "../components/cart/CartImage";
import CartAmountBox from "../components/cart/CartAmountBox";
import Total from "../components/cart/Total";
import TypeText from "../components/product/TypeText";
import TypeSwatch from "../components/product/TypeSwatch";
import Price from "../components/product/Price";

class CartPage extends PureComponent {
  render() {
    const products = this.props.products;

    const currencySymbol = products[0]?.prices.find(
      (item) => item.currency.label === this.props.currency
    ).currency.symbol;

    return (
      <div className="container">
        <h2 className="cart-heading">Cart</h2>
        <div className="cart-box">
          {products?.map((product) => (
            <div key={v4()} className="cart-element">
              <div className="info-box">
                <h2>{product.brand}</h2>
                <h3>{product.name}</h3>
                <Price
                  symbol={currencySymbol}
                  amount={
                    product.prices.find(
                      (item) => item.currency.symbol === currencySymbol
                    ).amount
                  }
                  modal=""
                />
                <TypeText
                  product={product}
                  state={{
                    selectedSizeId: product.selectedSizeId,
                    selectedColorId: product.selectedColorId,
                  }}
                  modal=""
                />
                <TypeSwatch
                  product={product}
                  state={{
                    selectedSizeId: product.selectedSizeId,
                    selectedColorId: product.selectedColorId,
                  }}
                  modal=""
                />
              </div>
              <div className="choice-box">
                <CartAmountBox product={product} modal="" />
                <CartImage product={product} modal="" />
              </div>
            </div>
          ))}
        </div>
        {products.length > 0 && (
          <Total products={products} currencySymbol={currencySymbol} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currency,
    products: state.productReducer.products,
  };
};

export default connect(mapStateToProps)(CartPage);
