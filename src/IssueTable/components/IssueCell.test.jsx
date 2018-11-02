import React from "react";
import ReactDOM from "react-dom";
import { Table } from "semantic-ui-react";
import IssueCell from "./IssueCell";

describe("Issue cell", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Table>
        <Table.Body>
          <Table.Row>
            <IssueCell
              href="https://example.com"
              text="Help it does not work!"
            />
          </Table.Row>
        </Table.Body>
      </Table>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
