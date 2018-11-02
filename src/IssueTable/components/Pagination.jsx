import React from "react";
import { Pagination } from "semantic-ui-react";

export default ({ page, onPageChange, totalPages }) => (
  <Pagination
    activePage={page}
    onPageChange={onPageChange}
    totalPages={totalPages}
    floated="right"
  />
);
