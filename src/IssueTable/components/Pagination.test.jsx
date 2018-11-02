import React from "react";
import ReactDOM from "react-dom";
import { Table } from "semantic-ui-react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Table>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Pagination totalPages={10} page={1} onPageChange={() => {}} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
