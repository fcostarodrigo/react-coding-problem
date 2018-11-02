import listIssues from "./listIssues";

describe("List issues", () => {
  it("should list issues", async () => {
    const { issues } = await listIssues();
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          number: expect.any(Number),
          title: expect.any(String),
          updated_at: expect.any(String),
          created_at: expect.any(String),
          state: expect.any(String),
          labels: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String)
            })
          ]),
          html_url: expect.any(String)
        })
      ])
    );
  });

  it("should accept a page size parameter", async () => {
    const { issues } = await listIssues({ pageSize: 20 });
    expect(issues).toHaveLength(20);
  });

  it("should return the number of pages", async () => {
    const { totalPages } = await listIssues();
    expect(Number.isFinite(totalPages)).toBe(true);
  });

  it(
    "should list the issues of the last page",
    async () => {
      const { totalPages } = await listIssues();
      const { issues } = await listIssues({ page: totalPages });
      expect(issues.length).toBeGreaterThan(0);
    },
    5000 * 2
  );

  it("should sort issues", async () => {
    const { issues } = await listIssues({
      sortColumn: "updatedAt",
      sortDirection: "ascending"
    });

    const first = new Date(issues[0].updated_at).valueOf();
    const last = new Date(issues[issues.length - 1].updated_at).valueOf();

    expect(first).toBeLessThanOrEqual(last);
  });
});
