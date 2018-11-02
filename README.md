# React coding problem

React issue status from GitHub.

## Features

- Sort by created at and updated at.
- Click on issue to go to its page.
- Pagination.
- Error boundary.
- Show spinner when loading.
- Automated tests.

## Setup

```bash
yarn install
```

## Running locally

```bash
yarn start
```

## Creating build

```bash
yarn run build
```

Build is saved at the build folder.

## Running tests

```bash
yarn test
```

## Troubleshoot

The [GitHub API](https://developer.github.com/v3/) used in this project to fetch issues is public, but it has some [rate limits](https://developer.github.com/v3/#rate-limiting).

> For unauthenticated requests, the rate limit allows for up to 60 requests per hour.

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)