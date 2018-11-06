////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each sport with its name in the tab
// - When you click on a tab, make it appear to be active while
//   the others appear inactive
// - Render the description for the selected tab in the panel
//
// Got extra time?
//
// - Add descriptive propTypes to <App> and <Tabs>
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const styles = {};

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10
};

class Tabs extends React.Component {
  static propTypes = {
    data: PropTypes.array
  };
  state = { openTab: 0 };

  changeTab(id) {
    this.setState({ openTab: id });
  }

  render() {
    const { data } = this.props;
    const { openTab } = this.state;
    let tabs = data.map((sport, index) => {
      let isActive = index === openTab;
      let style = isActive ? styles.activeTab : styles.tab;
      return (
        <div
          className="Tab"
          key={sport.name}
          style={style}
          onClick={() => this.changeTab(index)}
        >
          {sport.name}
        </div>
      );
    });

    let activeTab = this.props.data[this.state.openTab];

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {activeTab && activeTab.description}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  static propTypes = {
    sports: PropTypes.array
  };
  render() {
    return (
      <div>
        <h1>Sports</h1>
        <Tabs data={this.props.sports} />
      </div>
    );
  }
}

const DATA = [
  {
    id: 1,
    name: "Soccer",
    description:
      "Association football, more commonly known as football or soccer, is a team sport played between two teams of eleven players with a spherical ball. It is played by 250 million players in over 200 countries and dependencies, making it the world's most popular sport."
  },
  {
    id: 2,
    name: "Baseball",
    description:
      "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding. The game proceeds when a player on the fielding team, called the pitcher, throws a ball which a player on the batting team tries to hit with a bat."
  },
  {
    id: 3,
    name: "Tennis",
    description:
      "Tennis is a racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles). Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponent's court."
  }
];

ReactDOM.render(<App sports={DATA} />, document.getElementById("app"));

require("./tests").run();
