const express = require( "express" );
const path = require( "path" );
const hbs = require( "express-handlebars" );
const members = require( "./Members" );

const app = express();

// Init middleware
// app.use( logger );

// Handlebars Middleware
app.engine( "handlebars", hbs({ defaultLayout: "main" }) );
app.set( "view engine", "handlebars" );     

// Body Parser Middleware
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

// Homepage Route
app.get( "/", (req, res) => res.render("index", {
    title: "Member App",
    members
}));

// Set a static folder
app.use( express.static(path.join(__dirname, "public")) );

// Members API routes
app.use( "/api/members", require("./routes/api/members") );

const port = process.env.port || 5000;

app.listen( port, () => console.log(`Server started on port ${port}`) );