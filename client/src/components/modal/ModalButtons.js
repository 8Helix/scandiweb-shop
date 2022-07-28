import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default class ModalButtons extends PureComponent {
  render() {
    return (
      <div className="buttons">
        <Link
          to={ROUTES.CART}
          onClick={this.props.handleClick}
          className="modal-button white-button"
        >
          <button>View bag</button>
        </Link>
        <div className="modal-button green-button">
          <button>Check out</button>
        </div>
      </div>
    );
  }
}
