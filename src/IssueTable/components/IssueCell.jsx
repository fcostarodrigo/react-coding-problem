import React from "react";
import { Table } from "semantic-ui-react";

export default ({ text, href }) => (
  <Table.Cell selectable>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  </Table.Cell>
);
