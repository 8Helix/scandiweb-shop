import { PureComponent } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Brandicon from "../svgs/Brandicon";
import Carticon from "../svgs/Carticon";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { connect } from "react-redux";
import "./Header.modules.css";
import ShoppingMenu from "./ShoppingMenu";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  handleCartClick() {
    this.props.handleModal(!this.props.openModal);
  }

  render() {
    const cartNumber = this.props.products
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next, 0);

    return (
      <>
        <header className="header container">
          <nav className="main-nav">
            <ul className="main-nav-list">
              {this.props.data.categories?.map((category) => {
                const NAME = category.name.toUpperCase();
                return (
                  <NavLink
                    key={category.name}
                    to={ROUTES[NAME]}
                    className={({ isActive }) =>
                      isActive ? "active-nav nav-list-item" : "nav-list-item"
                    }
                  >
                    <li id={category.name}>{category.name}</li>
                  </NavLink>
                );
              })}
            </ul>
          </nav>
          <div className="brand-icon">
            <Brandicon />
          </div>
          <div className="shopping-menu">
            <ShoppingMenu
              currencies={this.props.data.currencies}
              currency={this.props.currency}
            />
            <div
              className="cart"
              onClick={cartNumber > 0 ? this.handleCartClick : null}
            >
              <Carticon />
              {cartNumber > 0 && (
                <div className="cart-number">
                  <span>{cartNumber}</span>
                </div>
              )}
            </div>
          </div>
        </header>
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

export default graphql(gql`
  query getQuery {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`)(connect(mapStateToProps)(Header));
