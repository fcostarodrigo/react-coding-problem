import React from "react";
import ReactDOM from "react-dom";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { Pagination } from "semantic-ui-react";
import IssueTable from "./IssueTable";
import listIssues from "./listIssues";
import IssueRow from "./IssueRow";

jest.mock("./IssueRow");
jest.mock("./listIssues");

describe("Issue table", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", done => {
    const div = document.createElement("div");
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 1 }, { id: 2 }]
    });

    ReactDOM.render(<IssueTable />, div);
    setImmediate(() => {
      expect(listIssues.mock.calls).toEqual([[{ page: 1 }]]);
      ReactDOM.unmountComponentAtNode(div);
      done();
    });
  });

  it("should change page", done => {
    const div = document.createElement("div");
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 1 }, { id: 2 }]
    });
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 3 }, { id: 4 }]
    });

    const component = ReactDOM.render(<IssueTable />, div);

    setImmediate(() => {
      expect(listIssues.mock.calls).toEqual([[{ page: 1 }]]);
      expect(IssueRow.mock.calls).toEqual([
        expect.arrayContaining([expect.objectContaining({ id: 1 })]),
        expect.arrayContaining([expect.objectContaining({ id: 2 })])
      ]);

      IssueRow.mockClear();
      const pagination = findRenderedComponentWithType(component, Pagination);
      pagination.props.onPageChange(null, { activePage: 2 });

      setImmediate(() => {
        expect(listIssues.mock.calls).toEqual([[{ page: 1 }], [{ page: 2 }]]);
        expect(IssueRow.mock.calls).toEqual([
          expect.arrayContaining([expect.objectContaining({ id: 3 })]),
          expect.arrayContaining([expect.objectContaining({ id: 4 })])
        ]);

        ReactDOM.unmountComponentAtNode(div);
        done();
      });
    });
  });
});
