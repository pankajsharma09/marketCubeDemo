import React, { useCallback, useState } from 'react';
import { gql } from 'apollo-boost';
import Moment from 'react-moment';
import { graphql, Query } from 'react-apollo';
import { Card, ResourceItem, TextStyle, TextField, Filters, Page, Tabs, Layout, Link } from '@shopify/polaris';
import VendorList from '../components/Lists/VendorList';

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

function UsersList() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [selected, setSelected] = useState();
    const [headerSelected, setHeaderSelected] = useState(0);

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

    const handleHeaderTabChange = useCallback(
        (selectedTabIndex) => setHeaderSelected(selectedTabIndex),
        [],
    );

    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);


    const resourceName = {
        singular: 'Vendor',
        plural: 'Vendors',
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

    const headerTabs = [
        {
            id: 1,
            content: 'Home',
            panelID: 'home',
        },
        {
            id: 2,
            content: 'Invitations',
            panelID: 'invitation',
        },
        {
            id: 3,
            content: 'Orders',
            panelID: 'orders',
        },
        {
            id: 4,
            content: 'Products',
            panelID: 'products',
        },
        {
            id: 5,
            content: 'Payments',
            panelID: 'payments',
        },
        {
            id: 6,
            content: 'Vendors',
            panelID: 'vendors',
        },
        {
            id: 7,
            content: 'Settings',
            panelID: 'settings  ',
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

    function renderItem(item) {
        const { id, firstName, lastName, email, brandName, status, createDate } = item;
        const shortcutActions = status
            ? 'Pending' : 'Approved';

        return (
            <ResourceItem
                id={id}
                email={email}
                // shortcutActions={shortcutActions}
                persistActions
            >
                <h2>
                    <Link><TextStyle><strong>{brandName}</strong></TextStyle></Link>
                </h2>
                <p>
                    <TextStyle>Name:{firstName} {lastName}</TextStyle><br></br>
                    <TextStyle>Email:{email}</TextStyle>
                </p>
                <p>
                    Onboarded on <Moment format="MMMM DD, YYYY  hh:mm">{createDate}</Moment>&nbsp;(GMT)
                </p>
            </ResourceItem>
        );
    }

    function resolveItemIds({ id }) {
        return id;
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

    return (

        <Page breadcrumbs={[{ content: 'Login', url: '/login' }]} title="Vendors">
            <div>
                <Tabs tabs={headerTabs} selected={headerSelected} onSelect={handleHeaderTabChange} fitted></Tabs>
            </div>
            <br></br>
            <Query query={GET_QUERY}>
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error : Something Went Wrong</p>;

                    return (
                        <Layout>
                            <Layout.Section>
                                <Card>
                                    <Tabs tabs={venderListTab} selected={selected} onSelect={handleTabChange}></Tabs>
                                    <VendorList
                                        resourceName={resourceName}
                                        items={data.getUsers}
                                        renderItem={renderItem}
                                        filterControl={filterControl}
                                        selectedItems={selectedItems}
                                        onSelectionChange={setSelectedItems}
                                        promotedBulkActions={promotedBulkActions}
                                        resolveItemId={resolveItemIds}
                                        subscribeToMore={subscribeToMore}
                                    />
                                </Card>
                            </Layout.Section>
                            <Layout.Section secondary>
                                <Card title="Quick Links">

                                    <Card.Section>
                                        <Link url="/register"><h1><strong>Add Vendor</strong></h1></Link>
                                        <p>Manage your Vendors</p>
                                    </Card.Section>
                                </Card>
                            </Layout.Section>
                        </Layout>
                    )
                }}
            </Query>
        </Page>
    );
}

export default graphql(GET_QUERY, {
    options: { fetchPolicy: 'network-only' },
})(UsersList);
