const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', '../../schema.graphql'), 'utf8')


describe("Test my schema", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
describe("Queries & Mutations", () => {
    test("notValidField is invalid on query", () => {
      const query = `
        {
          getUsers {
            notValidField
          }
        }
      `;
      // First arg: false, there is no field notValidField
      // Second arg: query to test
      tester.test(false, query);
    });

    test("Should get all the fields on getUsers", () => {
      const query = `
        {
          getUsers {
            email
            firstName
            lastName
            brandName
          }
        }
      `;
      // First arg: true, the query is valid
      // Second arg: query to test
      tester.test(true, query);
    });
    test("Should be a valid mutation", () => {
      const mutation = `
        mutation addUser {
          addUser {
            email
            password
            firstName
          }
        }
      `;
      // First arg: true, the mutation is valid
      // Second arg: mutation to test
      // Third argument: Input value
      tester.test(true, mutation, [{
        email: "demo@demo.com",
        firstName: "demo",
        passowrd: "demo name"
      }]);
    });
  });
});