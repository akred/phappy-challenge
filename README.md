# Phappy Challenge

This small application simulates a web app managing calls and some related functionalities.

It was bootstrapped with :

- [Create React App Typescript](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app)
- [Yarn](https://classic.yarnpkg.com/en/)
- [Bulma](https://bulma.io/documentation/overview/)
- [Font Awesome 5.15.3](https://fontawesome.com/)
- [SASS 4.14.1](https://github.com/sass/node-sass)
- [Classnames](https://github.com/JedWatson/classnames)
- [Moment](https://momentjs.com)
- [Axios](https://github.com/axios/axios)
- [React router](https://reactrouter.com/)
- [React Paginate](https://www.npmjs.com/package/react-js-pagination)

## Pre-requisites

- Git
- Node (**version 12 min required**)
- Yarn

## Project documentation

- It's mainly built with Typescript and the store is manage by `React context and hooks`
- The API calls are handled thanks to an axios wrapper (apiService).
- You can test directly the application online here :
  https://phappy-challenge.vercel.app/

<p>
<img src="https://user-images.githubusercontent.com/3393418/125238311-5d906900-e2e7-11eb-9be5-581f85aad680.png" alt="call_login" width=250>
<img src="https://user-images.githubusercontent.com/3393418/125238316-5e28ff80-e2e7-11eb-8a72-f9d1f525d6d9.png" alt="call_list" width=250>
<img src="https://user-images.githubusercontent.com/3393418/125238486-97fa0600-e2e7-11eb-87a4-42086964f7fc.png" alt="call_detail" width=250>
</p>

## Improvments / Remarks

- Handle error cases from the API
- Create more tests (jest + cypress)
- **Note** : During the coding phase, I noticed that components are render twice.
  It seems to be linked to CRA, which is a "normal" behavior on dev mode.
  Source : https://mariosfakiolas.com/blog/my-react-components-render-twice-and-drive-me-crazy/

- _Tasks done_ :
  - Login
  - List the calls
  - Archive / unarchive call
  - See call detail (with notes)
  - Routing
  - Pagination
  - Filtering
- _Missing steps_ :
  - Listen to https://frontend-test-api.aircall.io/pusher/auth (can use [EventSource](https://developer.mozilla.org/fr/docs/Web/API/EventSource))
  - Add call notes

# Startup

### Quick start : `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Tests : `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Production : `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Credits

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [React documentation](https://reactjs.org/).
- [Enzyme & typescript](https://rjzaworski.com/2018/03/testing-with-typescript-react-and-enzyme)
- Special thanks to [fettblog.eu](https://fettblog.eu/) for the understanding of React.js & Typescript :)
