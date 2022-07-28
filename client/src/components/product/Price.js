import { PureComponent } from "react";

export default class Price extends PureComponent {
  render() {
    return (
      <div className={`${this.props.modal}price`}>
        {!this.props.modal && <h4>Price: </h4>}
        <h4>
          {this.props.symbol}
          {this.props.amount}
        </h4>
      </div>
    );
  }
}
