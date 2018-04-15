import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeOrder: PropTypes.func
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    //timeout is the animation time
    //classNames refer to the CSS animation eg. order-enter, order-exit
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the fish is loaded before we continue!
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const totalAmount = orderIds.reduce((prevTotal, key) => {
      const count = this.props.order[key];
      const fishInOrder = this.props.fishes[key];
      //stop sorry fish is unavailable from appearing before data loaded
      if (!fishInOrder) return null;
      //check if fish exists then if available
      const isAvailable = fishInOrder && fishInOrder.status === "available";
      if (isAvailable) {
        return prevTotal + count * fishInOrder.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {/* Set the animation group, component = ul tells it to be a ul element ultimately */}
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">Total: {formatPrice(totalAmount)}</div>
      </div>
    );
  }
}

export default Order;

//import trandition group and CSS transition from react-transition-group
//replace ul with transition group tag
//wrap every li in CSS transition
//enter 250 exit 250
