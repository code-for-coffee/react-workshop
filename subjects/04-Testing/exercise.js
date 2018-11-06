////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import data from "./data";
import Tabs from "./components/Tabs";

describe("when <Tabs> is rendered", () => {
  let node;
  beforeEach(() => {
    node = document.createElement("div");
    ReactDOM.render(<Tabs data={data} />, node);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].innerText).toEqual(data[0].name);
  });

  it("renders the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].innerText).toEqual(data[1].name);
  });

  it("renders the third tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[2].innerText).toEqual(data[2].name);
  });

  it("activates the first tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[0].style["border-bottom-color"]).toEqual(
      "rgb(0, 0, 0)"
    );
  });

  it("does not activate the second tab", () => {
    const tabs = node.querySelectorAll(".Tab");
    expect(tabs[1].style["border-bottom-color"]).toEqual(
      "rgb(204, 204, 204)"
    );
  });

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      const tabs = node.querySelectorAll(".Tab");
      Simulate.click(tabs[1]);
    });

    it("activates the second tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[1].style["border-bottom-color"]).toEqual(
        "rgb(0, 0, 0)"
      );
    });

    it("deactivates the first tab", () => {
      const tabs = node.querySelectorAll(".Tab");
      expect(tabs[0].style["border-bottom-color"]).toEqual(
        "rgb(204, 204, 204)"
      );
    });

    it("puts the correct content in the panel", () => {
      const tabs = node.querySelectorAll(".TabPanel");
      expect(tabs[0].innerText).toEqual(data[1].description);
    });
  });
});
