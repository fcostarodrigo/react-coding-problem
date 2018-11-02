import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";

global.console.error = jest.fn();

describe("Error boundary", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ErrorBoundary>Test</ErrorBoundary>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should handle errors", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ErrorBoundary>
        {() => {
          throw new Error();
        }}
      </ErrorBoundary>,
      div
    );

    expect(global.console.error).toHaveBeenCalledTimes(1);

    ReactDOM.unmountComponentAtNode(div);
  });
});
