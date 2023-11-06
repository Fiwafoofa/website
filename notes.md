Converting Simon to a service involved the following steps.

1. Move all the previous deliverable code files (_.html, _.js, \*.css, favicon.ico, and assets) into a sub-directory named `public`. We will use the HTTP Node.js based service to host the frontend application files. This is done with the static file middleware that we will add our service `index.js`.

   ```js
   app.use(express.static('public'));
   ```

   When running our service the static file middleware takes care of reading the frontend code from the `public` directory and returning it to the browser. The service only directly handles the endpoint requests.

   ![Simon service](../simonReact/simonProduction.jpg)

1. Within the project directory run `npm init -y`. This configures the directory to work with **node.js**.
1. Modify or create `.gitignore` to ignore `node_modules`.
1. Install the Express package by running `npm install express`. This will write the Express package dependency in the `package.json` file and install all the Express code to the `node_modules` directory.
1. Create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call when you run your web service.
1. Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

   ```js
   const express = require('express');
   const app = express();

   // The service port. In production the frontend code is statically hosted by the service on the same port.
   const port = process.argv.length > 2 ? process.argv[2] : 3000;

   // JSON body parsing using built-in middleware
   app.use(express.json());

   // Serve up the frontend static content hosting
   app.use(express.static('public'));

   // Router for service endpoints
   const apiRouter = express.Router();
   app.use(`/api`, apiRouter);

   // GetScores
   apiRouter.get('/scores', (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', (req, res) => {
     scores = updateScores(req.body, scores);
     res.send(scores);
   });

   // Return the application's default page if the path is unknown
   app.use((_req, res) => {
     res.sendFile('index.html', { root: 'public' });
   });

   app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });
   ```

1. Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.

   ```js
   async function loadScores() {
     const response = await fetch("/api/scores")
     const scores = await response.json()

     // Modify the DOM to display the scores
   ```