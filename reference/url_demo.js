const url = require( "url" );

const myURL = new URL( "http://mywebsite.com/hello.html?id=100&status=active" );

// Serialize URL
console.log( "My URL:", myURL.href );
console.log( "My URL:", myURL.toString() );

// Host (root domain)
console.log( "Host:", myURL.host );

// Host name
console.log( "Hostname:", myURL.hostname );

// Path name
console.log( "Path name:", myURL.pathname );

// Serialized query
console.log( "Query:", myURL.search );

// Params object
console.log( "Params object:", myURL.searchParams );

// Add param
myURL.searchParams.append( "abc", "123" );
console.log( "New params:", myURL.searchParams );

// Loop through params
myURL.searchParams.forEach( (value, name) => console.log( `${name}: ${value}`) );