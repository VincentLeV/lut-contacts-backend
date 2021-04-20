const path = require( "path" );

// Base file name
console.log( "Base file name: ", path.basename(__filename) );

// Directory name
console.log( "Directory name: ", path.dirname(__filename) );

// File extension
console.log( "File extension name: ", path.extname(__filename) );

// Create path object
console.log( "Path object: ", path.parse(__filename) );

// Concatenate Thai
console.log( path.join(__dirname, "test", "hello.html") );