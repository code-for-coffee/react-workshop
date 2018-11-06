////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `DATA.title` in an <h1>
// - Render a <ul> with each of `DATA.items` as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a <select> dropdown to make filtering on `type` dynamic
// - Add a <button> to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

const Form = props => {
  return (
    <React.Fragment>
      <select onChange={props.onChange}>{props.uniqueTypes}</select>
    </React.Fragment>
  );
};

function Menu(props) {
  // initial challenge
  let listItems = DATA.items
    .filter(data => data.type === props.type)
    .sort(sortBy("name"))
    .map(item => {
      return <li key={item.id}>{item.name}</li>;
    });

  // bonus
  let uniqueTypes = Array.from(
    new Set(
      DATA.items.map(item => {
        return item.type;
      })
    )
  ).map(item => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div>
      <h1>{DATA.title}</h1>
      <ul>{listItems}</ul>
      <Form
        uniqueTypes={uniqueTypes}
        onChange={evt => {
          updateThePage(evt.target.value);
        }}
      />
    </div>
  );
}

function updateThePage(type) {
  ReactDOM.render(<Menu type={type} />, document.getElementById("app"));
}

ReactDOM.render(
  <Menu type="mexican" />,
  document.getElementById("app")
);

require("./tests").run();
