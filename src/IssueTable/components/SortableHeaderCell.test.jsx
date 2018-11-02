import React from "react";
import ReactDOM from "react-dom";
import { Table } from "semantic-ui-react";
import SortableHeaderCell from "./SortableHeaderCell";

describe("Sortable header cell", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Table celled selectable sortable fixed>
        <Table.Header>
          <Table.Row>
            <SortableHeaderCell onClick={() => {}} sorted="ascending">
              Created At
            </SortableHeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
