import React from "react";
import { Table } from "semantic-ui-react";

export default ({
  number,
  title,
  created_at: createdAt,
  updated_at: updatedAt,
  state,
  labels
}) => (
  <Table.Row>
    <Table.Cell>{number}</Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{new Date(createdAt).toLocaleString()}</Table.Cell>
    <Table.Cell>{new Date(updatedAt).toLocaleString()}</Table.Cell>
    <Table.Cell>{labels.map(label => label.name).join(", ")}</Table.Cell>
    <Table.Cell>{state}</Table.Cell>
  </Table.Row>
);
