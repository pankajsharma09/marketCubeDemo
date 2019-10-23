import React from 'react';
import wait from 'waait'
import UserList from '../user/userList';
import { shallow, mount, configure } from 'enzyme';
import { MockedProvider } from "@apollo/react-testing";
import { gql } from 'apollo-boost';
import Adapter from 'enzyme-adapter-react-16';
import { AppProvider } from '@shopify/polaris';


configure({ adapter: new Adapter() });

const GET_QUERY = gql`
query UserLists{
    getUsers{
    id,
    firstName,
    lastName,
    email,
    brandName,
    status,
    createDate
    }
}
`;

const SUBSCRIPTION = gql`
    subscription  UserLists{
        newUserCreated {
            id,
            firstName,
            lastName,
            email,
            brandName,
            createDate,
            status
        }
    }
`

const mocks = [
    {
        request: {
            query: GET_QUERY,
        },
        result: {
            data: {
                getUsers: {
                    "id": "5da5a70f8a360b338519c1f2",
                    "firstName": null,
                    "lastName": null,
                    "email": "qwerty123@gmail.com",
                    "brandName": null,
                    "status": null,
                    "createDate": null
                  }
            },
        },
    },
    {
        request: {
            query: SUBSCRIPTION,
        },
        result: {
            data: {
                newUserCreated: {
                    "id": "5da5a70f8a360b338519c1fqq2",
                    "firstName": 'qwert',
                    "lastName": 'qwerty',
                    "email": "qwerty123@gmail.com",
                    "brandName": 'Something',
                    "status": 1,
                    "createDate": null
                  }
            },
        },
    },

];

describe('listing', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      });
    // const component = mount(
    //     <MockedProvider mocks={mocks} addTypename={false}>
    //         <AppProvider>
    //             <UserList />
    //         </AppProvider>
    //     </MockedProvider>
    // );
    const component = shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AppProvider>
                <UserList />
            </AppProvider>
        </MockedProvider>
    );
    
    it('render query', async () => {
        await wait(1000);
        console.log('qwert',component.dive().dive().debug());
        expect(component).toMatchSnapshot();
    });
})




// describe('Vendor Listing', () => {

//     // window.matchMedia = jest.fn().mockImplementation(query => {
//     //     return {
//     //       matches: f{alse},
//     //       media: query,
//     //       onchange: null,
//     //       addListener: jest.fn(),
//     //       removeListener: jest.fn(),
//     //     };
//     //   });
//     const component = render.create(
//             <MockedProvider mocks={mocks}>
//                     <UserList/>
//             </MockedProvider>
//     );
//     // it('render vendor listing', () => {
//     //     const tree = component.toJSON();

//     // });

// });
