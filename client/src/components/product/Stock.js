import { PureComponent } from "react";

export default class Stock extends PureComponent {
  render() {
    return (
      <div className="stock">
        {this.props.inStock ? (
          <h4 style={{ color: "green" }}>In Stock</h4>
        ) : (
          <h4 style={{ color: "red" }}>Out Of Stock</h4>
        )}
      </div>
    );
  }
}
