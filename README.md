# **Contacts Backend Project**

This project is created for a school assignment which proves knowledge of backend development skills.

## **Tech Used**

1. NodeJS
2. ExpressJS
3. MongoDB

## **Testing Libraries**

1. Mocha
2. Chai
3. Chai Http

<br/>

## **Running The Server**

Installing the dependencies and packages

> npm install

Running the server

> npm run dev

<br/>

### **Postman**

1. Get contacts

> http://localhost:3000/contacts

2. Get a contact

> http://localhost:3000/contacts/&#60;id of the contact you want to look for&#62;

3. Add a contact

Please add both contact name and email in the body tab, those are the required fields. There are also optional fields that you could also add: phone and address.

4. Update a contact

Please write any field and updated value to the body that you would like to update.

5. Delete a contact

> http://localhost:3000/contacts/&#60;id of the contact you want to delete&#62;

<br/>

### **REST Client**

If you don't have Postman, please the install extension REST Client in VSCode.

In the root folder of the project, there is the route.rest file. I've added different methods to access the database.

Please click on **Send Request** above each method to run.

<br/>

## **Running The Tests**

To run the test, in the terminal please type

> npm test
