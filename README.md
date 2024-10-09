# Mapster-Cloud: Coursework for DevOps @ HTW Berlin

Team **Mapster-Cloud**: [Laura Hartstein](https://github.com/bibifant) & [Bettina Justus](https://github.com/Bettinaju) :octocat:

Mapster-Cloud is an extension of Mapster into a Dev Ops project, to develop end to end through the dev ops lifecycle. 

Mapster-Cloud is an extension of Mapster in which the Single Page Application was containerized and a CI CD pipeline was created.

The following has been adjusted for this:

- project was containerized with Docker
- deployed twice to have a stage and a production environment using Google Cloud Platform
- CI/CD pipeline via GitHub Actions has been added

### Information: Project is not live anymore, because the GCP budget limit for the semester has been reached!

### Setup

- `frontend/...` runs in the browser without special requirements
- `backend/...` is an npm project that has to be kicked-off:
  - Enter with `cd backend/` and run `npm i` to install dependencies
  - Run `npm run dev` to run the backend using [nodemon](https://www.npmjs.com/package/nodemon) for hot reloading
    - Alternatively, run `npm start` to run the backend in production mode, without hot reloading

### Backend Dependencies

- **express** to streamline node server development
- **morgan** to add simple & concise server logs
- **cors** to enable local cross-origin development
- **mongoose** as an ORM for mongoDB
- **nodemon** as local dev environment with hot-reloading
- **eslint** for linting & formatting

### Environment Variables

In order to get a locally working dev environment, you first need to setup the env variables.
To do this, simply create a new file called `.env` in the root directory and copy the content of `.env.example` into it.

It contains the `PORT` for express to listen to, as well as the MongoDB Atlas URL.
In order to use this Atlas instance, you need a username && password.

### Setup local MongoDB using Docker

- Install `docker`
- Pull the free mongodb image: `docker pull mongodb/mongodb-community-server`
- Run image as container and expose the default port: `docker run -d -p 27017:27017 --name my-mongo -d mongodb/mongodb-community-server:latest`
- Verify that container is running via `docker ps`
- Open the database in mongoDB Compass using the default connection settings
- After this setup, you can start & stop your container using `docker start my-mongo` and `docker stop my-mongo`

### Git Flow

1. Never work directly on `main` -- new feature, new branch
2. We use a `merge`-based flow, so avoid `rebase` on main
3. No local merge&push -- Pull Requests only
5. PR has to be approved and the tests have to run successfully before merging into staging or main
6. Keep your commit message short, expand to multi-line if necessary

### Miscellanious

- The `/.gitignore` was created using [gitignore.io](https://gitignore.io) and ignores all binary/config files related vim, vscode, nodeJS, and macOS.
