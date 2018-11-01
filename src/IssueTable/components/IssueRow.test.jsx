import React from "react";
import ReactDOM from "react-dom";
import { Table } from "semantic-ui-react";
import IssueRow from "./IssueRow";

describe("Issue row", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Table>
        <Table.Body>
          <IssueRow
            id={376181663}
            number={14053}
            title="Problem deploying"
            created_at="2018-10-31T22:17:12Z"
            updated_at="2018-10-31T22:51:15Z"
            labels={[{ name: "bug" }, { name: "doc" }]}
            state="open"
            html_url="https://github.com/facebook/react/pull/14053"
          />
        </Table.Body>
      </Table>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
