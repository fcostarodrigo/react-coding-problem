const url = "https://api.github.com/repos/facebook/react/issues";

export default () => fetch(url).then(r => r.json());
