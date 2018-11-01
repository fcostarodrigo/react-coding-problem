import React from "react";
import { Table, Loader, Pagination } from "semantic-ui-react";
import IssueRow from "./IssueRow";
import listIssues from "./listIssues";

export default class IssueTable extends React.PureComponent {
  state = {
    issues: [],
    loading: true,
    totalPages: 0,
    page: 1
  };

  async componentDidMount() {
    try {
      const { page } = this.state;
      const { issues, totalPages } = await listIssues({ page });
      this.setState({ issues, totalPages });
    } finally {
      this.setState({ loading: false });
    }
  }

  handlePaginationChange = async (e, { activePage: page }) => {
    const { issues, totalPages } = await listIssues({ page });
    this.setState({ issues, totalPages, page });
  };

  render() {
    const { loading, issues, totalPages, page } = this.state;

    return loading ? (
      <Loader active inline="centered" />
    ) : (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Issue Number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>Labels</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{issues.map(IssueRow)}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Pagination
                activePage={page}
                onPageChange={this.handlePaginationChange}
                totalPages={totalPages}
                floated="right"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}
