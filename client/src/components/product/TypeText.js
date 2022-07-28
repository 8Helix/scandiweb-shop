import React, { Component } from "react";

export default class TypeText extends Component {
  constructor(props) {
    super(props);

    this.handleSizeClick = this.handleSizeClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e) {
    if (Object.keys(this.props).length > 2)
      e.target.classList.add(`${e.target.classList[0]}-hover`);
  }

  handleMouseOut(e) {
    if (Object.keys(this.props).length > 2)
      e.target.classList.remove(`${e.target.classList[0]}-hover`);
  }

  handleSizeClick(e) {
    const { inStock } = this.props.product;
    if (!inStock) return;
    if (this.props.state.selectedSizeId === e.target.id) {
      this.props.handleSizeUpdate("");
      return;
    }
    this.props.handleSizeUpdate(e.target.id);
  }

  render() {
    const product = this.props.product;
    return (
      <>
        {product.attributes.find((item) => item.type === "text") && (
          <div className={`${this.props.modal}type`}>
            <p>Size:</p>
            <div className={`${this.props.modal}text-box`}>
              {product.attributes
                .find((item) => item.type === "text")
                .items.map((obj, i) => (
                  <div
                    key={obj.id}
                    id={i}
                    className={
                      this.props.state.selectedSizeId === i.toString()
                        ? `${this.props.modal}text selected-text `
                        : `${this.props.modal}text`
                    }
                    onClick={this.handleSizeClick}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                  >
                    {obj.value}
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
