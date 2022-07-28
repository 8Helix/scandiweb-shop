import { PureComponent } from "react";
import Category from "./Category";
import { connect } from "react-redux";

class CategoryPortal extends PureComponent {
  render() {
    return (
      <Category category={this.props.category} currency={this.props.currency} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currency,
  };
};

export default connect(mapStateToProps)(CategoryPortal);
