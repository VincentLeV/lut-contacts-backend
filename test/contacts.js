const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const app = require( "../src/index" );

chai.should();
chai.use( chaiHttp );

describe("GET contacts", () => {
    it("Fetch all contacts", (done) => {
        chai.request( app )
            .get( "/contacts" ) 
            .end( (err, res) => {
            res.should.have.status( 200 );
            res.body.should.be.a( "array" );
            // res.body.length.should.be.eql(3);
            done();
        });
    });

    it("Wrong routing address", (done) => {
        chai.request( app )
            .get( "/contact" ) 
            .end( (err, res) => {
            res.should.have.status( 404 );
            done();
        });
    });
});

describe("GET contact by ID", () => {
    it("Fetch a task", (done) => {
        chai.request( app )
            .get( "/contacts/607db6f3c5a06b628aa2a377" ) 
            .end( (err, res) => {
            res.should.have.status( 200 );
            res.body.should.be.a( "object" );
            res.body.should.have.property( "name" );
            res.body.should.have.property( "email" );
            res.body.should.have.property( "_id" ).eq("607db6f3c5a06b628aa2a377");
            done();
        });
    });

    it("Wrong contact's Id", (done) => {
        chai.request( app )
            .get( "/contacts/607db6f3c5a06b628aa2a370" ) 
            .end( (err, res) => {
            res.should.have.status( 404 );
            res.body.should.be.a( "object" );
            res.body.should.have.property( "msg" ).eq("Contact with id 607db6f3c5a06b628aa2a370 couldn't be found.");
            done();
        });
    });
});

describe("POST contacts", () => {
    it("Add new contact", (done) => {
        const newContact = {
            name: "New Person",
            email: "new.person@gmail.com",
            phone: "+358488902919",
            address: "TestingStreet 25, 00100 HELSINKI"
        }

        chai.request( app )
        .post( "/contacts" )
        .set( "Content-Type", "application/json" )
        .send( JSON.stringify(newContact) )
        .end( (err, res) => {
            res.should.have.status( 201 ); 
            res.body.should.be.a( "object" );
            res.body.should.have.property( "name" ).eq( "New Person" );
            res.body.should.have.property( "email" ).eq( "new.person@gmail.com" );
            done();
        });
    });

    it("Don't pass required name value", (done) => {
        const newContact = {
            email: "new.person@gmail.com",
            phone: "+358488902919",
            address: "TestingStreet 25, 00100 HELSINKI"
        }

        chai.request( app )
        .post( "/contacts" )
        .set( "Content-Type", "application/json" )
        .send( JSON.stringify(newContact) )
        .end( (err, res) => {
            res.should.have.status( 400 ); 
            res.body.should.be.a( "object" );
            res.body.should.have.property( "msg" ).eq("Contact validation failed: name: Path `name` is required.");
            done();
        });
    });
});

describe("PATCH contacts", () => {
    it("Update a contact", (done) => {
        const updatedContact = {
            "name": "Updated Tom Smith",
        }
        chai.request( app )
        .patch( "/contacts/607db6f3c5a06b628aa2a379" )
        .set( "Content-Type", "application/json" )
        .send( JSON.stringify(updatedContact) )
        .end( (err, res) => {
            res.should.have.status( 200 ); 
            res.body.should.be.a( "object" );
            res.body.should.have.property( "name" ).eq( "Updated Tom Smith" );
            done();
        });
    });

    it("Wrong contact's id", (done) => {
        const updatedContact = {
            "name": "Patched Tom Smith",
        }
        chai.request( app )
        .patch( "/contacts/607db6f3c5a06b628aa2a370" )
        .set( "Content-Type", "application/json" )
        .send( JSON.stringify(updatedContact) )
        .end( (err, res) => {
            res.should.have.status( 404 ); 
            res.body.should.be.a( "object" );
            res.body.should.have.property( "msg" ).eq("Contact with id 607db6f3c5a06b628aa2a370 couldn't be found.");
            done();
        });
    });
});
