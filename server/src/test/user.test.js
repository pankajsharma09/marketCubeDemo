const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', '../../schema.graphql'), 'utf8')
const resolver=require("../module/index");
const mongoose = require('mongoose')
const host = 'localhost:27017'
const name = 'marketcubedb'
const { expect } = require("chai");

describe("Market Cube Test Cases", () => {
  let tester;
  beforeAll(() => {
    mongoose.connect(`mongodb://${host}/${name}`, () => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.disconnect(() => {
          console.log('closed')
        })
      })
    })
    tester = new EasyGraphQLTester(schemaCode,resolver);
  });
  describe("User Not Found Test Case", () => {
    it("User Not Found Test Case", async () => {
      const query = `
        mutation userAuthenticate($email: String, $password:String) {
          userAuthenticate(email: $email, password: $password) {
            email
            password
            response
          }
        }
      `;
  
      const args = {
        eamil: "premshani89@gmail.com",
        password: "test@123"
      };
  
      const result = await tester.graphql(query, {}, {}, args);
      console.log(result);
      expect(result.data.userAuthenticate.response).to.be.eq("INVALID");
      //expect(result.data.license.body).to.be.eq("This is a test license");
      //expect(result.data.license.description).to.be.eq(`This is a description with key ${args.key}`
      //);
    });

    //test case for the getuser query
    test("Valid User schema with valid field", () => {
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
      tester.test(true,query);
      
    });


    

     test("Should be a valid mutation for add user", () => {
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
      
       tester.test(true , mutation, {
        email:"prem@gm.com",
        password: "test",
        isVendor: true ,
        brandName:"ZeeTest",
        status:1,
        createDate:"2019-10-18",
        updateDate:"2019-10-18",
        firstName:"prem",
        lastName:"shani"
      });
    });
  });
  
});


