import listIssues from "./service";

describe("Issue table service", () => {
  describe("List issues", () => {
    it("should list issues", async () => {
      const issues = await listIssues();
      expect(issues.length).toBeGreaterThan(0);
    });
  });
});
