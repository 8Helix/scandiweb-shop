import React, { Component } from "react";

export default class TypeSwatch extends Component {
  constructor(props) {
    super(props);

    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(e) {
    console.log("ssss");
    const { inStock } = this.props.product;
    if (!inStock) return;
    if (this.props.state.selectedColorId === e.target.id) {
      this.props.handleColorUpdate("");
    } else {
      this.props.handleColorUpdate(e.target.id);
    }
  }

  render() {
    const product = this.props.product;
    return (
      <>
        {product.attributes.find((item) => item.type === "swatch") && (
          <div className={`${this.props.modal}type`}>
            <p>Color:</p>
            <div className={`${this.props.modal}color-box`}>
              {product.attributes
                .find((item) => item.type === "swatch")
                .items.map((obj, i) => (
                  <div
                    key={obj.id}
                    className={
                      this.props.state.selectedColorId === i.toString()
                        ? `${this.props.modal}swatch selected-swatch`
                        : `${this.props.modal}swatch`
                    }
                    id={i}
                    onClickCapture={this.handleColorClick}
                  >
                    <div id={i} style={{ backgroundColor: obj.value }}></div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
