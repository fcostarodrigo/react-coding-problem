import React from "react";
import ReactDOM from "react-dom";
import IssueTable from "./IssueTable";

describe("Issue table", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IssueTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
