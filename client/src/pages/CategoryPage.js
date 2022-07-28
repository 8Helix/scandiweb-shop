import { Component } from "react";
import "./CategoryPage.modules.css";
import CategoryPortal from "../components/category/CategoryPortal";

class CategoryPage extends Component {
  render() {
    const category = window.location.pathname.split("/")[1]
      ? window.location.pathname.split("/")[1]
      : "all";

    return (
      <main>
        <CategoryPortal category={category} currency={this.props.currency} />{" "}
      </main>
    );
  }
}

export default CategoryPage;
