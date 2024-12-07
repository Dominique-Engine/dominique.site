# Welcome to dominique.site

## Setup

Create a `.env` file by copying the `.env.example` file and filling in the
necessary values. Install the dependencies:

```bash
npm install
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app
server is production-ready.

Make sure to deploy the output of `npm run build`

-   `build/server`
-   `build/client`


### Algolia

Source algolia with:

```bash
bun ./scripts/algolia.js
```


## Scaffolding

Project is using plop to generate components, hooks, pages, and more. To generate a new component, run:

```bash
npm run plop component
```