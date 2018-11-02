import parseLinks from "./parseLinks";

const baseUrl = "https://api.github.com/repos/facebook/react/issues";

const apiIdentifiersMap = {
  createdAt: "created",
  updatedAt: "updated",
  ascending: "asc",
  descending: "desc"
};

export default async ({
  pageSize = 10,
  page = 1,
  sortColumn = "createdAt",
  sortDirection = "descending"
} = {}) => {
  const url = new URL(baseUrl);

  const search = new URLSearchParams();
  search.set("per_page", pageSize.toString());
  search.set("page", page.toString());
  search.set("sort", apiIdentifiersMap[sortColumn]);
  search.set("direction", apiIdentifiersMap[sortDirection]);
  url.search = search.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const resetText = new Date(
      Number.parseInt(reset, 10) * 1000
    ).toLocaleString();

    if (Number.parseInt(remaining, 10) < 1) {
      throw new Error(`Rate limit exceeded, back on ${resetText}`);
    } else {
      throw new Error(response.statusText);
    }
  }

  const links = parseLinks(response.headers.get("Link"));
  const totalPages = "last" in links ? links.last.page : page;

  return { issues: await response.json(), totalPages };
};
