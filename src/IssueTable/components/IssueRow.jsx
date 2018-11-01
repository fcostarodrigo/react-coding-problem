import React from "react";
import { Table } from "semantic-ui-react";
import IssueCell from "./IssueCell";

export default ({
  id,
  number,
  title,
  created_at: createdAt,
  updated_at: updatedAt,
  state,
  labels,
  html_url: href
}) => (
  <Table.Row key={id}>
    <IssueCell href={href} text={number} />
    <IssueCell href={href} text={title} />
    <IssueCell href={href} text={new Date(createdAt).toLocaleString()} />
    <IssueCell href={href} text={new Date(updatedAt).toLocaleString()} />
    <IssueCell href={href} text={labels.map(label => label.name).join(", ")} />
    <IssueCell href={href} text={state} />
  </Table.Row>
);
