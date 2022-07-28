import { PureComponent } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { connect } from "react-redux";
import "./Product.modules.css";
import TypeSwatch from "./TypeSwatch";
import TypeText from "./TypeText";
import Price from "./Price";
import Stock from "./Stock";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageId: 0,
      selectedSizeId: "",
      selectedColorId: "",
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleSizeUpdate = this.handleSizeUpdate.bind(this);
    this.handleColorUpdate = this.handleColorUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageClick(e) {
    this.setState({ imageId: e.target.id });
  }

  handleSizeUpdate(id) {
    this.setState({ selectedSizeId: id });
  }

  handleColorUpdate(id) {
    this.setState({ selectedColorId: id });
  }

  handleSubmit() {
    const { name, brand, attributes, inStock, gallery, prices } =
      this.props.data?.product;
    if (!inStock) return;
    if (
      attributes.find((item) => item.type === "swatch") &&
      !this.state.selectedColorId
    )
      return;
    if (
      attributes.find((item) => item.type === "text") &&
      !this.state.selectedSizeId
    )
      return;

    let product;
    const similarProduct = this.props.products.filter(
      (item) =>
        item.name === name &&
        item.selectedColorId === this.state.selectedColorId &&
        item.selectedSizeId === this.state.selectedSizeId
    );

    if (similarProduct.length) {
      product = { ...similarProduct[0], amount: similarProduct[0].amount + 1 };
    } else {
      product = {
        id: this.props.products.length,
        selectedColorId: this.state.selectedColorId,
        selectedSizeId: this.state.selectedSizeId,
        amount: 1,
        name,
        brand,
        attributes,
        gallery,
        prices,
      };
    }

    this.props.dispatchProduct(product);
    this.setState({ selectedSizeId: "" });
    this.setState({ selectedColorId: "" });
  }

  render() {
    const price = this.props.data.product?.prices.find(
      (item) => item.currency.label === this.props.currency
    );
    const product = this.props.data.product;

    return (
      <div className="grid-3 container">
        <div className="gallery">
          {product?.gallery.map((item, i) => (
            <div key={item} className="image">
              <img
                id={i}
                src={item}
                alt="gallery"
                onClick={this.handleImageClick}
              />
            </div>
          ))}
        </div>
        <div className="main-img">
          <img src={product?.gallery[this.state.imageId]} alt="mainImg" />
        </div>
        <div className="info">
          <h2>{product?.brand}</h2>
          <h3>{product?.name}</h3>
          {product && (
            <>
              <TypeText
                product={product}
                state={this.state}
                handleSizeUpdate={this.handleSizeUpdate}
                handleColorUpdate={this.handleColorUpdate}
                modal=""
              />
              <TypeSwatch
                product={product}
                state={this.state}
                handleSizeUpdate={this.handleSizeUpdate}
                handleColorUpdate={this.handleColorUpdate}
                modal=""
              />
            </>
          )}
          <Stock inStock={product?.inStock} />
          <Price
            symbol={price?.currency.symbol}
            amount={price?.amount}
            modal=""
          />
          <div className="button">
            <button onClick={this.handleSubmit}>Add to cart</button>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: product?.description,
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchProduct: (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  };
};

export default graphql(
  gql`
    query getProduct($id: String!) {
      product(id: $id) {
        name
        brand
        inStock
        gallery
        description
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  `,
  {
    options: (props) => ({
      variables: {
        id: props.id,
      },
    }),
  }
)(connect(mapStateToProps, mapDispatchToProps)(Product));
