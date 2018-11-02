import React from "react";
import { Table, Loader } from "semantic-ui-react";
import IssueRow from "./components/IssueRow";
import listIssues from "./services/listIssues";
import Pagination from "./components/Pagination";
import SortableHeaderCell from "./components/SortableHeaderCell";

const sortDirections = ["ascending", "descending"];

export default class IssueTable extends React.PureComponent {
  state = {
    issues: [],
    loading: true,
    totalPages: 0,
    page: 1,
    sortColumn: "createdAt",
    sortDirection: "descending",
    error: null
  };

  componentDidMount() {
    const { page, sortColumn, sortDirection } = this.state;
    this.load({ page, sortColumn, sortDirection });
  }

  handleSort = column => {
    const { sortColumn, page } = this.state;
    let { sortDirection } = this.state;

    if (column === sortColumn) {
      const index = sortDirections.indexOf(sortDirection);
      sortDirection = sortDirections[(index + 1) % sortDirections.length];
    } else {
      [sortDirection] = sortDirections;
    }

    this.load({ page, sortColumn: column, sortDirection });
  };

  handleCreatedAtSort = () => this.handleSort("createdAt");

  handleUpdatedAtSort = () => this.handleSort("updatedAt");

  handlePaginationChange = (e, { activePage: page }) => {
    const { sortColumn, sortDirection } = this.state;
    this.load({ page, sortColumn, sortDirection });
  };

  async load({ page, sortColumn, sortDirection }) {
    try {
      const { issues, totalPages } = await listIssues({
        page,
        sortColumn,
        sortDirection
      });

      this.setState({
        issues,
        totalPages,
        page,
        sortDirection,
        sortColumn,
        loading: false
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const {
      loading,
      issues,
      totalPages,
      page,
      sortColumn,
      sortDirection,
      error
    } = this.state;

    if (error) throw error;

    return loading ? (
      <Loader active inline="centered" />
    ) : (
      <Table celled selectable sortable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Issue Number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <SortableHeaderCell
              onClick={this.handleCreatedAtSort}
              sortDirection={sortColumn === "createdAt" ? sortDirection : null}
            >
              Created At
            </SortableHeaderCell>
            <SortableHeaderCell
              onClick={this.handleUpdatedAtSort}
              sortDirection={sortColumn === "updatedAt" ? sortDirection : null}
            >
              Updated At
            </SortableHeaderCell>
            <Table.HeaderCell>Labels</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{issues.map(IssueRow)}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Pagination
                page={page}
                onPageChange={this.handlePaginationChange}
                totalPages={totalPages}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}
