import React from "react";
import { formatPrice } from "../helpers";
class Order extends React.Component {
  renderTo = (orderId, fishes) => {
    return orderId.map(key => {
      const count = this.props.order[key];
      const fish = fishes[key];
      let isAvailable = fish.status === "available";
      if (!isAvailable) {
        return (
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        );
      }
      return (
        <li key={key}>
          {count} lbs {fish.name}
          <p>{formatPrice(count * fish.price)}</p>
        </li>
      );
    });
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const totalAmount = orderIds.reduce((prevTotal, key) => {
      const count = this.props.order[key];
      const fishInOrder = this.props.fishes[key];
      const isAvailable = fishInOrder.status === "available";
      if (isAvailable) {
        return prevTotal + count * fishInOrder.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{this.renderTo(orderIds, this.props.fishes)}</ul>
        <div className="total">Total: {formatPrice(totalAmount)}</div>
      </div>
    );
  }
}

export default Order;
