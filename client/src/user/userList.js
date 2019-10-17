import React, {useCallback, useState} from 'react';
import {gql} from 'apollo-boost';
import { graphql, Query } from 'react-apollo';
import {ResourceList, Card, ResourceItem, TextStyle, TextField, Button, Avatar, Filters, Page, Tabs} from '@shopify/polaris';

const GET_QUERY = gql`
    query UserLists{
        getUsers{
        id
        email,
        password
        }
    }
`;

const SUBSCRIPTION = gql`
    subscription  UserLists{
        newUserCreated {
            email,
            password
        }
    }
`

 function UsersList(){
    const [selectedItems, setSelectedItems] = useState([]);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [selected, setSelected] = useState(0);

    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
      );
    
    const handleQueryValueChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
      );

    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);
    

    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const venderListTab = [
        {
        id: 'all-venders',
        content: 'All',
        accessibilityLabel: 'All Venders',
        panelID: 'all',
        },
        {
        id: 'pending-venders',
        content: 'Pending Approval',
        panelID: 'pending-approval',
        },
        {
        id: 'approved-venders',
        content: 'Approved',
        panelID: 'approved',
        },
    ];
    
    const promotedBulkActions = [
      {
        content: 'Bulk Actions',
        onAction: () => console.log('Todo: implement bulk edit'),
      }
    ];

    const filters = [
        {
          key: 'taggedWith',
          label: 'Filter',
          filter: (
            <TextField
              label="Filter"
              value={taggedWith}
              onChange={handleTaggedWithChange}
              labelHidden
            />
          ),
          shortcut: true,
        },
      ];
    
      const appliedFilters = !isEmpty(taggedWith)
        ? [
            {
              key: 'Filter',
              label: disambiguateLabel('taggedWith', taggedWith),
              onRemove: handleTaggedWithRemove,
            },
          ]
        : [];
    
      const filterControl = (
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryValueChange}
          onQueryClear={handleQueryValueRemove}
          onClearAll={handleClearAll}
        >
        </Filters>
      );

    return ( 
         
        <Page>
        <Tabs tabs={venderListTab} selected={selected} onSelect={handleTabChange}>
        </Tabs>
        <Query query={GET_QUERY}> 
        {({ loading, error, subscribeToMore, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :</p>;
        
        return(
        
        <Card sectioned >
        
        <ResourceList
            resourceName={resourceName}
            items={data.getUsers}
            renderItem={renderItem}
            filterControl={filterControl}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            promotedBulkActions={promotedBulkActions}
            resolveItemId={resolveItemIds}
            subscribeToNewData={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                      console.log(subscriptionData);
                    if (!subscriptionData.data) return prev;
                    return subscriptionData.data;
                  }
                })
              }
        />
        </Card>)
        }}
        </Query>
        </Page>
    );

    function renderItem(item) {
        console.log(item);
        const {id, email} = item;
        return (
        <ResourceItem
            id={id}
            email={email}
            persistActions
        >
            <h3>
            <TextStyle variation="strong">{email}</TextStyle>
            </h3>
        </ResourceItem>
        );
    }

    function resolveItemIds({id}) {
        return;
    }

    function disambiguateLabel(key, value) {
        switch (key) {
          case 'taggedWith':
            return `Tagged with ${value}`;
          default:
            return value;
        }
      }
    
      function isEmpty(value) {
        if (Array.isArray(value)) {
          return value.length === 0;
        } else {
          return value === '' || value == null;
        }
      }
}

export default graphql(GET_QUERY,{
    options: { fetchPolicy: 'network-only' },
})(UsersList);
