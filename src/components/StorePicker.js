import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  //this createRef lets you access members of the DOM
  myInput = React.createRef();

  //binding this as a property means this is bound to the instance NOT
  //definition so you don't need to .bind(this) in constructor
  goToStore = event => {
    event.preventDefault();
    let storeName = this.myInput.value.value;
    // console.log(this.myInput.value.value)
    //StorePicker gets history as a child in ReactRouter
    this.props.history.push(`store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          ref={this.myInput}
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store =></button>
      </form>
    );
  }
}

export default StorePicker;
