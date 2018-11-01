import listIssues from "./listIssues";

describe("List issues", () => {
  it("should list issues", async () => {
    const { issues } = await listIssues();
    expect(issues.length).toBeGreaterThan(0);
  });

  it("should accept a page size parameter", async () => {
    const { issues } = await listIssues({ pageSize: 20 });
    expect(issues).toHaveLength(20);
  });

  it("should return the number of pages", async () => {
    const { totalPages } = await listIssues();
    expect(Number.isFinite(totalPages)).toBe(true);
  });

  it("should liset the issues of the last page", async () => {
    const { totalPages } = await listIssues();
    const { issues } = await listIssues({ page: totalPages });
    expect(issues.length).toBeGreaterThan(0);
  });
});
