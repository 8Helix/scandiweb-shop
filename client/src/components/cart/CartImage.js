import { PureComponent } from "react";
import LessThan from "../svgs/LessThan";
import GreaterThan from "../svgs/GreaterThan";

export default class CartImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageId: 0,
    };

    this.handleLess = this.handleLess.bind(this);
    this.handleGreater = this.handleGreater.bind(this);
  }

  handleLess(length) {
    if (this.state.imageId === 0) {
      this.setState({ imageId: length - 1 });
      return;
    }
    this.setState({ imageId: this.state.imageId - 1 });
  }

  handleGreater(length) {
    if (this.state.imageId === length - 1) {
      this.setState({ imageId: 0 });
      return;
    }
    this.setState({ imageId: this.state.imageId + 1 });
  }

  render() {
    return (
      <div className={`${this.props.modal}image-box`}>
        <img
          src={this.props.product.gallery[this.state.imageId]}
          alt="gallery"
        />
        {!this.props.modal && this.props.product.gallery.length > 1 && (
          <div className="img-navigation">
            <div
              className="less"
              onClick={() => this.handleLess(this.props.product.gallery.length)}
            >
              <LessThan />
            </div>
            <div
              className="greater"
              onClick={() =>
                this.handleGreater(this.props.product.gallery.length)
              }
            >
              <GreaterThan />
            </div>
          </div>
        )}
      </div>
    );
  }
}
