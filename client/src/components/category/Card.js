import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import CircleIcon from "../svgs/CircleIcon";

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.handleOver = this.handleOver.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }

  handleOver() {
    if (!this.props.product.inStock) return;
    this.setState({ hover: true });
  }

  handleOut() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <Link
        className="card-link"
        to={ROUTES.PRODUCT.replace(":id", `${this.props.product.id}`)}
      >
        <div
          className={this.state.hover ? "card card-hover" : "card"}
          onMouseOver={this.handleOver}
          onMouseOut={this.handleOut}
        >
          <div
            className={
              !this.props.product.inStock ? "card-img blur" : "card-img"
            }
          >
            <img
              src={this.props.product.gallery[0]}
              alt="Product"
              onMouseOver={this.handleOver}
              onMouseOut={this.handleOut}
            />
            {!this.props.product.inStock && (
              <p className="inStock">Out of stock</p>
            )}
            {this.state.hover && <CircleIcon />}
          </div>
          <div
            className="card-content"
            onMouseOver={this.handleOver}
            onMouseOut={this.handleOut}
          >
            <p>{this.props.product.name}</p>
            <p>
              {this.props.price.currency.symbol}
              {this.props.price.amount}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}
