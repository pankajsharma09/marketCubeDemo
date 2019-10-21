const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', '../../schema.graphql'), 'utf8')
const resolver = require("../module/index");
const mongoose = require('mongoose')
const host = 'localhost:27017'
const name = 'marketcubedb'
const { expect } = require("chai");

describe("Market Cube Test Cases", () => {
  let tester;
  beforeAll(() => {
    mongoose.connect(`mongodb://${host}/${name}`);
    tester = new EasyGraphQLTester(schemaCode, resolver, mongoose);
  });
  describe("User Auth Test Case", () => {
    it("User Not Found Test Case", async () => {
      //invalid user try to login
      const query = `
        mutation userAuthenticate($email: String, $password:String) {
          userAuthenticate(email: $email, password: $password) {
            email
            password
            response
          }
        }
      `;
      //user details
      const args = {
        email: "premshani89@gmail.com",
        password: "test@123"
      };
      //result
      const result = await tester.graphql(query, {}, {}, args);
      //shuld invalid
      expect(result.data.userAuthenticate.response).to.be.eq("INVALID");
    });

    it("User Found Test Case", async () => {
      // add one user 
      resolver.Mutation.addUser(mongoose, {
        email: "prem@gm.com",
        password: "test",
        isVendor: true,
        brandName: "ZeeTest",
        status: 1,
        createDate: "2019-10-18",
        updateDate: "2019-10-18",
        firstName: "prem",
        lastName: "shani"
      });
      //auth query
      const query = `
        mutation userAuthenticate($email: String, $password:String) {
          userAuthenticate(email: $email, password: $password) {
            email
            password
            response
          }
        }
      `;
      //user valus try to login
      const args = {
        email: "prem@gm.com",
        password: "test"
      };
      //response 
      const result = await tester.graphql(query, {}, {}, args);
      //exception to check
      expect(result.data.userAuthenticate.response).to.be.eq("VALID");
    });
    //test case for the getuser query
    test("Valid User schema with valid field", () => {
      //schema test to get users list
      const query = `
        {
          getUsers {
            email
            password
            isVendor
            brandName
            status
            createDate
            updateDate
            firstName
            lastName
          }
        }
      `;
      //pass if schema is valid
      tester.test(true, query);

    });

    test("Should be a valid mutation for add user", () => {
      //cehck mutaiotn schema is valid
      const mutation = `
        mutation addUser {
          addUser {
            email
            password
            isVendor
            brandName
            status
            createDate
            updateDate
            firstName
            lastName
          }
        }
      `;
//if pass valid scehma otherwise error
      tester.test(true, mutation, {
        email: "prem@gm.com",
        password: "test",
        isVendor: true,
        brandName: "ZeeTest",
        status: 1,
        createDate: "2019-10-18",
        updateDate: "2019-10-18",
        firstName: "prem",
        lastName: "shani"
      });
    });
  });

});


