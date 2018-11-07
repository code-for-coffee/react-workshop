////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    let initialFormValues = JSON.parse(localStorage.getItem("form"));
    console.log(initialFormValues);
    if (initialFormValues) this.state = { ...initialFormValues };
  }

  state = {
    billingName: "Han Solo",
    billingRegion: "Ontario, CA",
    shippingName: "Jabba the Hutt",
    shippingRegion: "California, USA",
    sameAsBilling: true
  };

  handleSubmit = event => {
    // handle form submit
    event.preventDefault();
    let form = serializeForm(event.target, { hash: true });
    console.log(form);
    if (
      this.state.billingRegion.length > 2 ||
      this.state.shippingRegion.length > 2
    )
      alert("You should use the abbreviation for state!");

    localStorage.setItem("form", JSON.stringify(form));
  };

  render() {
    let { sameAsBilling } = this.state;
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:{" "}
                <input
                  name="billingName"
                  defaultValue={this.state.billingName}
                  type="text"
                  onChange={event =>
                    this.setState({ billingName: event.target.value })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                Billing State:{" "}
                <input
                  name="billingRegion"
                  defaultValue={this.state.billingRegion}
                  type="text"
                  size="2"
                  onChange={event =>
                    this.setState({ billingRegion: event.target.value })
                  }
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                onChange={event =>
                  this.setState({ sameAsBilling: event.target.checked })
                }
                defaultChecked={sameAsBilling}
              />{" "}
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:{" "}
                <input
                  readOnly={this.state.sameAsBilling}
                  name="shippingName"
                  type="text"
                  value={
                    sameAsBilling
                      ? this.state.billingName
                      : this.state.shippingName
                  }
                  onChange={event =>
                    this.setState({
                      shippingName: event.target.value
                    })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State:{" "}
                <input
                  readOnly={this.state.sameAsBilling}
                  name="shippingRegion"
                  value={
                    sameAsBilling
                      ? this.state.billingRegion
                      : this.state.shippingRegion
                  }
                  type="text"
                  size="2"
                  onChange={event =>
                    this.setState({
                      shippingRegion: event.target.value
                    })
                  }
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
