import parseLinks from "./parseLinks";

describe("Link parser", () => {
  it("parse link header", () => {
    const parsed = parseLinks(
      '<https://api.github.com/repos?page=3&per_page=100>; rel="next", <https://api.github.com/repos?page=50&per_page=100>; rel="last"'
    );

    expect(parsed).toEqual({
      next: {
        page: 3,
        pageSize: 100,
        relation: "next",
        url: "https://api.github.com/repos?page=3&per_page=100"
      },
      last: {
        page: 50,
        pageSize: 100,
        relation: "last",
        url: "https://api.github.com/repos?page=50&per_page=100"
      }
    });
  });
});
