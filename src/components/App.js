import React from "react";
import aBase from "../base";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    //check location for local storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );

    //set state from local storage if it exists
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    //sync App with rebase if it exists
    this.ref = aBase.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    //when state gets updated, store order obj in local storage
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    aBase.removeBinding(this.ref);
  }

  addFish = newFish => {
    //1. first, copy existing state state
    const fishes = { ...this.state.fishes };
    //2. add new fish the newly created fishes variable
    fishes[`fish${Date.now()}`] = newFish;
    //2. call setState to set old state object as new one
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //1. copy current state
    const order = { ...this.state.order };
    //2. either update an existing order object property with +1 OR set it to 1
    order[key] = order[key] + 1 || 1;
    //3. update state with the new object
    this.setState({
      order: order
    });
  };

  removeOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({
      order: order
    });
  };

  updateFish = (key, updatedFish) => {
    const currentFishes = this.state.fishes;
    currentFishes[key] = updatedFish;

    this.setState({
      fishes: currentFishes
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market" age={100} />
          <ul>
            {/* Loop over each key inside the fishes object */}
            {Object.keys(this.state.fishes).map(key => {
              return (
                <Fish
                  key={key}
                  index={key}
                  orderSubmit={this.addToOrder}
                  details={this.state.fishes[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeOrder={this.removeOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;

//cmd shift L = all instances
//cmd shift arrow = whole line
//cmd alt arrow = multiple lines
//alt arrow = move line

//Deleting fish
//create deletefish function
//pass deletefish function to <EditFishForm>
