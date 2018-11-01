export default links => {
  const parsed = {};

  links.split(",").forEach(link => {
    const [rawUrl, rawRelation] = link.split(";");
    const url = new URL(rawUrl.trim().slice(1, -1));
    const [, relation] = rawRelation.match(/rel="([^"]+)"/);
    const search = new URLSearchParams(url.search);

    parsed[relation] = {
      page: Number.parseInt(search.get("page"), 10),
      pageSize: Number.parseInt(search.get("per_page"), 10),
      relation,
      url: url.toString()
    };
  });

  return parsed;
};
