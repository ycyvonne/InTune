# InTune

## Setting up environment for the first time

- For Mac users:
  1. Install [Homebrew](https://brew.sh/) if you haven't already.
  2. `brew install docker`
  3. `brew install docker-compose`
  4. `brew install node`
  5. Navigate to the root of this project directory and run `./scripts/setup.sh`
- For windows users:
  1. Go to https://docs.docker.com/docker-for-windows/install/ to install Docker.
  2. Go to https://docs.docker.com/compose/install/#install-compose to install Docker Compose.
  3. Go to https://nodejs.org/en/download/ to install node.js
  4. Navigate to the root of this project directory and run `./scripts/setup.sh`

### Preferred IDE: [VS Code](https://code.visualstudio.com/)

## Overall Development Workflow

This workflow is for if you want to run the entire application using Docker.

1. Navigate to the project directory
2. Make sure your Docker Daemon is running. For Mac, you'll see the whale icon on the top right corner which is the daemon, so make sure that is running.
3. Run `docker-compose up --build` when you've made changes to the code. Or omit the `--build` flag if you have made no changes.
4. Go to http://localhost:3000/

## React.js Development Workflow

It is often slow to do front-end development in a Docker container and wait for code to build. If you are only working on the frontend, run only the backend services through docker-compose, and run the frontend locally.

#### Steps:

1. Comment out the `client` configs in `docker-compose.yml`.
2. `cd client`
3. `npm install` (do this only the first time or if you change `client/package.json`)
4. `npm start`

## Git Development Workflow

1. `git checkout -b <your-name>/<feature-name>`
2. Code until you hit a good checkpoint. Make sure there are no errors/broken builds.
3. `git status` shows you what files you have changed.
4. Commit your files
   - If you want to commit all modified files:
     ```
     git add -A
     ```
   - Otherwise to add the particular files you want to commit:
     ```
     git add <file1> <file2> <...>
     ```
5. `git commit -m "some commit message"`
6. Push your branch
   - For brand new branches:
     ```
     git push -u origin <branch name>
     ```
   - For previously pushed branches:
     ```
     git push
     ```
   - you can find your branch names with `git branch`

## Pull Request Workflow

- Make a new branch formatted `<your-name>/<feature-name>` to submit a pull request to master.
- Notify team that a PR has been made :)
- After a pull request is approved, rebase and squash commits before merging into master

  1. Checkout to master

  ```shell
  git checkout master
  ```

  2. Pull the most recent changes from master

  ```shell
  git pull
  ```

  3. Check into the branch of the PR

  ```shell
  git checkout <your branch name>
  ```

  4. Rebase and squash commits:

  ```shell
  git rebase master
  ```

  5. Push changes to GitHub.

  ```shell
  git push -f
  ```

  **Do _NOT_ force push to other people's branches or shared branches**

## Documentation
* We are using [jsdoc](https://www.npmjs.com/package/jsdoc) to document code.

Example documentation with express routing:

```
/** Express router providing user related routes
 * @module routers/users
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
const router = express.Router();

/**
 * Route serving login form.
 * @name get/login
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login', message: 'You must login'});
});
```

## Testing
We have created test scenarios for both our front end and our back end. Front end tests are focused on testing logic related to maintaining the Redux state and testing the logic for rendering our pages. Back end tests are focused on testing that our matching heuristic behaves in a logical way and that our Express routes work properly and can handle errors as expected. We tested both front end and back end with Jest, used Jest with Enzyme for testing React components and Jest with Mocha for testing our Express routes. 


### [Front End Tests](client/src/tests)

#### Test Scenario 1  - Front End Maintains State
  [Test the action creation module](client/src/tests/actionCreator.test.js) :
  * when `authorize(code)` is called  it should create a function for dispatching an 
  action of type `AUTHORIZE` to the Redux user reducer

  [Test the user reducer module](client/src/tests/userReducer.test.js):
  * When not given a state / given an empty state it should not update the Redux state

  * When an action of type `AUTHORIZE` with no errors is dispatched to the user reducer, the user controller should update the user.SpotifyData prop with the action’s contents and with field `fetched: true`
  
  * When an action of type `AUTHORIZE` with an error is dispatched to the user reducer, the user controller should not updated the Redux state 

#### Test Scenario 2 - Front End React Pages Should Render Properly
  [Test the Profile page](client/src/tests/profile.test.js):
  * If the profile page’s user prop has `SpotifyData` with an error it should not render

  * If the profile page’s user prop has `SpotifyData` that is valid (has field fetched: true) it should render 

  [Test the Home page](client/src/tests/home.test.js):
  * The Home page should be able to render when provided with props


### [Back End Tests](api/tests)

#### Test Scenario 3 - [Test Matching Heuristic](api/tests/match.test.js)
* If the user profiles given to the matching heuristic have no similarities (no genres, artists, or songs in common) then the score given to their similarity should be 0

* When comparing user profiles, a pair of profiles that have more similarities should receive a higher score than a pair of profiles that have fewer similarities.

* When comparing user profiles, if a profile is empty (i.e. doesn’t contain any music interest), then the score of their similarity should be 0

* When comparing user profiles, if a profile is null, then the score of their similarity should be 0

#### Test Scenario 4 - [Test Express Routing & Adapter Responses](api/tests/spec.js)
  Root path: 
  * The root path should be considered a valid path and respond with 200 

  User Routes:
  * `/user` should be considered a valid path and respond with 200

  * When the `/user/token` route tries to get a token and it is not valid, `SpotifyAdapter `should be able to handle invalid_token error and return the error 

  Concert Routes:
  * `/concert` should be considered a valid path and respond with 200

  * `/concert` should be able to retrieve a list of Songkick events for a given metro area using the `SongkickAdapter`client/src/tests/ and the adapter function should return a response with status ‘ok’ and a list of Songkick events




