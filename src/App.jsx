import React from "react";
import { Header, Icon, Segment, Container } from "semantic-ui-react";
import IssueTable from "./IssueTable";
import ErrorBoundary from "./ErrorBoundary";

export default () => (
  <React.Fragment>
    <Header as="h1" icon textAlign="center">
      <Icon name="react" circular />
      <Header.Content>React issue status from GitHub</Header.Content>
    </Header>
    <Container>
      <Segment raised>
        <ErrorBoundary>
          <IssueTable />
        </ErrorBoundary>
      </Segment>
    </Container>
  </React.Fragment>
);
