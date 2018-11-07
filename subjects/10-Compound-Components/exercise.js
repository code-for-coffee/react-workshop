////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  };

  select(value) {
    this.setState({ value }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    let { defaultValue } = this.props;
    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isSelected: defaultValue === child.props.value ? true : false,
        onClick: () => {
          console.log(child.props.value);
          this.select(child.props.value);
        },
        tabIndex: "0"
      });
    });
    return <div>{children}</div>;
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    tabIndex: PropTypes.string,
    value: PropTypes.string
  };

  render() {
    let { isSelected, onClick, tabIndex } = this.props;

    return (
      <div
        onClick={onClick}
        tabIndex={tabIndex}
        onKeyDown={event => (event.keyCode === 32 ? onClick() : null)}
      >
        <RadioIcon isSelected={isSelected} /> {this.props.children}
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    );
  }
}

class App extends React.Component {
  state = {
    selectedRadio: "aux"
  };
  render() {
    let { selectedRadio } = this.state;
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>
        <h2>We are listening to {selectedRadio}</h2>

        <RadioGroup
          defaultValue={selectedRadio}
          onChange={value => {
            console.log(value);
            this.setState({ selectedRadio: value });
          }}
        >
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
