import parseLinks from "./parseLinks";

const baseUrl = "https://api.github.com/repos/facebook/react/issues";

export default async ({ pageSize = 10, page = 1 } = {}) => {
  const url = new URL(baseUrl);

  url.search = new URLSearchParams([
    ["per_page", pageSize.toString()],
    ["page", page.toString()]
  ]).toString();

  const response = await fetch(url.toString());

  const links = parseLinks(response.headers.get("Link"));
  const totalPages = "last" in links ? links.last.page : page;

  return { issues: await response.json(), totalPages };
};
