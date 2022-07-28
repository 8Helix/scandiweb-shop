import { PureComponent } from "react";

export default class DropDown extends PureComponent {
  render() {
    return (
      <svg
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={this.props.options ? "drop-down drop-up" : "drop-down"}
      >
        <path
          d="M1 0.5L4 3.5L7 0.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
