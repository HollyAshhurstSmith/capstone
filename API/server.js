const express = require('express');
const cors = require('cors'); 
const recipeRouter = require('./routes/recipeRoutes');

const app = express();
const PORT = 3001;

//middleware
app.use(cors()); // cross origin resource sharing
app.use(express.json()); 
app.use("/", express.static("views"));
app.use('/recipes', recipeRouter); //router middleware

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Entry point. Sets up the express app, middleware, and routes.

