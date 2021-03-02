This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `yarn build:dist`

**_Custom Script_**

Builds the app with `yarn build` and after that, it copies files under `dist` folder.<br />
These copied files will always have the same filename, so that it's easier to embed them into other web applications without the need of worrying hashes in filenames. (This will also copy `.map` files and it keeps their original filename, as they are referenced in this way in the generated files.)

We are using `asu_react_` as a prefix in the filenames to avoid naming collisions.

Generated files are:

```
/dist
    asu_react_main.js
    asu_react_runtime-main.js
    asu_react_vendors.js
    asu_react_main.css
    asu_react_vendors.css
    *.map
```

**The order of running these files does matter.** Example usage of the application:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="asu_react_vendors.css?v=x.x.x">
    <link rel="stylesheet" href="asu_react_main.css?v=x.x.x">
</head>
<body>
    <div id="asu_react_search"></div>

    <script src="asu_react_runtime-main.js?v=x.x.x"></script>
    <script src="asu_react_vendors.js?v=x.x.x"></script>
    <script src="asu_react_main.js?v=x.x.x"></script>
</body>
</html>
```

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
