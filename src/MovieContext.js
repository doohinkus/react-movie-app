import React from "react";

const DuckContext = React.createContext();

export class DuckifyProvider extends React.Component {
  state = { isADuck: false };
  render() {
    const { children } = this.props;
    return (
      < DuckContext.Provider value={this.state}>
        {children}
      </ DuckContext.Provider>
    );
  }
}

export const DuckifyConsumer = DuckContext.Consumer;
