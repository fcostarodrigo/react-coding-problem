import React from "react";
import { Table } from "semantic-ui-react";

export default ({ onClick, sortDirection, children }) => (
  <Table.HeaderCell selectable onClick={onClick} sorted={sortDirection}>
    {children}
  </Table.HeaderCell>
);
