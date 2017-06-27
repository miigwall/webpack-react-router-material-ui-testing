# Example Webpack Project with React Router

This is an example project that uses [Material-UI](https://github.com/callemall/material-ui) and [React Router](https://github.com/ReactTraining/react-router).

## Installation

After cloning the repository, install dependencies:
```sh
cd <project folder>/material-ui/examples/webpack-example
npm install
```

Now you can run your local server:
```sh
npm start
```
Server is located at http://localhost:3000

Note: To allow external viewing of the demo, change the following value in `webpack-dev-server.config.js`

```
host: 'localhost'  //Change to '0.0.0.0' for external facing server
```