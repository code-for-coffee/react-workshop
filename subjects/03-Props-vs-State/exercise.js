////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make the "Go to Step 2" button work.
//
// In order to do this, you'll have to make tabs a "pure component" so that it
// no longer manages its own state. Instead add a prop to tell it which tab to
// show, and then move the state up to the <App>.
//
// Also, be sure that clicking on the individual tabs still works.
//
// Got extra time?
//
// Refactor <Tabs> from a class into a pure function that takes props as an
// argument and returns an element (JSX).
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";
import data from "./data";

const Tabs = props => {
  let { activeIndex, data, selectTab } = props;
  const tabs = data.map((item, index) => {
    const isActive = index === activeIndex;
    const style = isActive ? styles.activeTab : styles.tab;

    return (
      <div
        key={index}
        className="Tab"
        style={style}
        onClick={() => selectTab(index)}
      >
        {item.name}
      </div>
    );
  });

  const activeItem = data[activeIndex];

  return (
    <div className="Tabs">
      {tabs}
      <div className="TabPanel" style={styles.panel}>
        {activeItem && activeItem.description}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  data: PropTypes.array.isRequired,
  selectTab: PropTypes.func
};

class App extends React.Component {
  state = { activeIndex: 0 };

  changeTab = index => this.setState({ activeIndex: index });

  render() {
    return (
      <div>
        <h1>Props v. State</h1>

        <button onClick={() => this.changeTab(1)}>
          Go to "Step 2"
        </button>

        <Tabs
          activeIndex={this.state.activeIndex}
          data={this.props.tabs}
          selectTab={this.changeTab}
        />
      </div>
    );
  }
}

ReactDOM.render(<App tabs={data} />, document.getElementById("app"));

require("./tests").run();
