require("dotenv").config();

const express = require( "express" );
const mongoose = require( "mongoose" );
const app = express();

const port = 3000;

mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser: true } );
const db = mongoose.connection;
db.on( "error", (err) => console.error(err) );
db.once( "open", () => console.log("Connected to Database") );

app.use( express.json() );

const contactsRouter = require("./routes/contacts");
app.use( "/contacts", contactsRouter );

app.listen(process.env.port || 3000, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = app;