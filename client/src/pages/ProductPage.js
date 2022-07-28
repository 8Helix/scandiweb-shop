import { PureComponent } from "react";
import Product from "../components/product/Product";
import { connect } from "react-redux";

class ProductPage extends PureComponent {
  render() {
    const id = window.location.pathname.split("/")[2];
    return (
      <section>
        <Product currency={this.props.currency} id={id} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currency,
  };
};

export default connect(mapStateToProps)(ProductPage);
