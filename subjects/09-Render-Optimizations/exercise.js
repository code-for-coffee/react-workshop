////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    heightRoom: 0,
    scrollBarPosition: 0
  };

  handleScroll = event => {
    this.setState({
      scrollBarPosition: event.target.scrollTop
    });
  };

  componentDidMount() {
    this.setState({ heightRoom: this.node.clientHeight });
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const { scrollBarPosition, heightRoom } = this.state;

    const totalHeight = numRows * rowHeight;

    const startIndex = Math.floor(scrollBarPosition / rowHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(heightRoom / rowHeight) + 1,
      numRows
    );

    const items = [];

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        ref={node => (this.node = node)}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            height: totalHeight,
            paddingTop: startIndex * rowHeight
          }}
        >
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
