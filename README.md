StayFeed is a full-stack, server-rendered HackerNews client and community platform, built to showcase modern web-app patterns and deliver a polished user experience:

Backend (StayFeed-API)

Node.js & Express proxy to the HackerNews Firebase API and Algolia search

MongoDB (Mongoose) for persisting user ratings and threaded comments

Firebase Admin SDK for secure user authentication and token verification

Exposes REST endpoints:

GET /api/topstories (proxy top HN stories)

GET /api/search?q= (search HN via Algolia)

POST/GET/PUT/DELETE /api/ratings (per-user star ratings)

POST/GET/PUT/DELETE /api/comments (threaded comments with replies)

Frontend (StayFeed-Web)

Create React App SPA with React Router for protected routes

Firebase JS SDK for signup, login, and token management

Axios service layer to call your API (with automatic auth headers)

Custom UI Components:

SearchBar with debounce and accessibility

NewsCard with glass-morphism styling, live previews, and hover effects

Rating widget using react-icons, supporting create/update/delete of stars

Comments component with recursive, threaded replies, edit/delete, and polished animations

Key Highlights

Fully type-safe and testable: small components, mockable API layer, unit & integration tests with Jest/RTL & Supertest

Environment-driven configuration for seamless local, staging, and production deployments

Serverless-ready: backend on Render, frontend on Vercel, and Cloud-hosted MongoDB Atlas

Includes CI hooks for linting, testing, and health-check pings to keep the API warm



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
