import { PureComponent } from "react";
import { connect } from "react-redux";

class CartAmountBox extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
  }

  handleAdd(id) {
    const amount =
      this.props.products.find((item) => item.id === id).amount + 1;
    this.props.dispatchAmount(id, amount);
  }

  handleSubtract(id) {
    const amount =
      this.props.products.find((item) => item.id === id).amount - 1;
    if (amount > 0) {
      this.props.dispatchAmount(id, amount);
    } else {
      this.props.deleteProduct(id);
    }
  }

  render() {
    return (
      <div className={`${this.props.modal}amount-box`}>
        <div
          className={`${this.props.modal}plus-sign`}
          onClick={() => this.handleAdd(this.props.product.id)}
        ></div>
        <span className={`${this.props.modal}amount`}>
          {this.props.product.amount}
        </span>
        <div
          className={`${this.props.modal}minus-sign`}
          onClick={() => this.handleSubtract(this.props.product.id)}
        ></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAmount: (id, amount) => {
    dispatch({ type: "UPDATE_AMOUNT", payload: { id, amount } });
  },
  deleteProduct: (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: { id } });
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartAmountBox);
