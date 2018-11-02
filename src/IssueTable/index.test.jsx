import React from "react";
import ReactDOM from "react-dom";
import IssueTable from ".";
import listIssues from "./services/listIssues";
import IssueRow from "./components/IssueRow";
import Pagination from "./components/Pagination";
import SortableHeaderCell from "./components/SortableHeaderCell";

jest.mock("./components/IssueRow", () => jest.fn(() => null));
jest.mock("./components/Pagination", () => jest.fn(() => null));
jest.mock("./components/SortableHeaderCell", () => jest.fn(() => null));
jest.mock("./services/listIssues");

describe("Issue table", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", async () => {
    const div = document.createElement("div");
    listIssues.mockResolvedValueOnce({ totalPages: 10, issues: [{ id: 1 }] });

    ReactDOM.render(<IssueTable />, div);

    await new Promise(setTimeout);

    expect(listIssues.mock.calls).toEqual([
      [{ page: 1, sortColumn: "createdAt", sortDirection: "descending" }]
    ]);

    ReactDOM.unmountComponentAtNode(div);
  });

  it("should change page", async () => {
    const div = document.createElement("div");
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 1 }, { id: 2 }]
    });
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 3 }, { id: 4 }]
    });

    ReactDOM.render(<IssueTable />, div);

    await new Promise(setTimeout);

    expect(listIssues.mock.calls).toEqual([
      [{ page: 1, sortColumn: "createdAt", sortDirection: "descending" }]
    ]);
    expect(IssueRow.mock.calls).toEqual([
      expect.arrayContaining([expect.objectContaining({ id: 1 })]),
      expect.arrayContaining([expect.objectContaining({ id: 2 })])
    ]);

    IssueRow.mockClear();

    Pagination.mock.calls.reverse()[0][0].onPageChange(null, { activePage: 2 });

    await new Promise(setTimeout);

    expect(listIssues.mock.calls).toEqual([
      [{ page: 1, sortColumn: "createdAt", sortDirection: "descending" }],
      [{ page: 2, sortColumn: "createdAt", sortDirection: "descending" }]
    ]);
    expect(IssueRow.mock.calls).toEqual([
      expect.arrayContaining([expect.objectContaining({ id: 3 })]),
      expect.arrayContaining([expect.objectContaining({ id: 4 })])
    ]);

    ReactDOM.unmountComponentAtNode(div);
  });

  it("should sort issues", async () => {
    const div = document.createElement("div");
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 1 }, { id: 2 }]
    });
    listIssues.mockResolvedValueOnce({
      totalPages: 10,
      issues: [{ id: 3 }, { id: 4 }]
    });

    ReactDOM.render(<IssueTable />, div);

    await new Promise(setTimeout);

    expect(IssueRow.mock.calls).toEqual([
      expect.arrayContaining([expect.objectContaining({ id: 1 })]),
      expect.arrayContaining([expect.objectContaining({ id: 2 })])
    ]);

    IssueRow.mockClear();

    SortableHeaderCell.mock.calls
      .reverse()
      .find(([{ sortDirection }]) => sortDirection === null)[0]
      .onClick();

    expect(listIssues.mock.calls).toEqual([
      [{ page: 1, sortColumn: "createdAt", sortDirection: "descending" }],
      [{ page: 1, sortColumn: "updatedAt", sortDirection: "ascending" }]
    ]);

    await new Promise(setTimeout);

    expect(IssueRow.mock.calls).toEqual([
      expect.arrayContaining([expect.objectContaining({ id: 3 })]),
      expect.arrayContaining([expect.objectContaining({ id: 4 })])
    ]);

    ReactDOM.unmountComponentAtNode(div);
  });
});
