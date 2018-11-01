import React from "react";
import { Table, Loader } from "semantic-ui-react";
import IssueRow from "./IssueRow";
import listIssues from "./listIssues";

export default class IssueTable extends React.PureComponent {
  state = {
    issues: [],
    loading: true
  };

  async componentDidMount() {
    try {
      this.setState({ issues: await listIssues() });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, issues } = this.state;

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
      </Table>
    );
  }
}
