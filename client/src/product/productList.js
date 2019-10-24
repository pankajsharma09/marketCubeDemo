import React, { useCallback, useState } from 'react';
import { gql } from 'apollo-boost';
import Moment from 'react-moment';
import { graphql, Query } from 'react-apollo';
import { Card, ResourceItem, ResourceList, Avatar, TextStyle, TextField, Filters, Page, Tabs, Layout, Link } from '@shopify/polaris';

const GET_QUERY = gql`
   query { getProduct{
    productName,
    productDesc,
    status,
    prodcutImageUrl,
    createDate,
    updateDate,
    createBy,
    updateBy,
    numberOfVariants
}
}
`;




function ProductList() {
	const [selectedItems, setSelectedItems] = useState([]);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [selected, setSelected] = useState();
    const [headerSelected, setHeaderSelected] = useState(0);

    const handleTaggedWithChange = useCallback(
        (value) => {
        	setTaggedWith(value);
        },
        [],
    );

    const handleQueryValueChange = useCallback(
        (value) => {
        	setQueryValue(value);
        	
        	
        },
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
        singular: 'Product',
        plural: 'Products',
    };

    const venderListTab = [
        {
            id: 'all-product',
            content: 'All',
            accessibilityLabel: 'All Product',
            panelID: 'all',
        },
        {
            id: 'pending-product',
            content: 'Pending Approval',
            panelID: 'pending-approval',
        },
        {
            id: 'approved-product',
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
        const {id, productName, productDesc, prodcutImageUrl, numberOfVariants, status, createDate, updateDate,createBy,updateBy } = item;
        const shortcutActions = status
            ? 'Pending' : 'Approved';
        const media = <Avatar customer size="medium" name={productName}  />;
        return (
            <ResourceItem id={id} media={media} url={prodcutImageUrl} persistActions >
            
                <h2>
                    <Link><TextStyle><strong>{productName}</strong></TextStyle></Link>
                </h2>
                <p>
                    <TextStyle>Added By:{updateBy} On <Moment format="MMMM DD, YYYY  hh:mm">{createDate}</Moment> &nbsp;(GMT)</TextStyle><br></br>
                    <TextStyle>Number Of Variants : {numberOfVariants}</TextStyle>
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

        <Page breadcrumbs={[{ content: 'Login', url: '/login' }]} title="Product">
            <div>
                <Tabs tabs={headerTabs} fitted></Tabs>
            </div>
            <br></br>
            <Query query={GET_QUERY}>
                {({ loading, error, data }) => {
                	console.log(data);
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error : Something Went Wrong</p>;

                    return (
                        <Layout>
                            <Layout.Section>
                                <Card>
                                    <Tabs tabs={venderListTab} ></Tabs>
                                    <ResourceList
                                    resourceName={resourceName}
                                    items={data.getProduct}
                                    renderItem={renderItem}
                                    filterControl={filterControl}
                                    selectedItems={selectedItems}
                                    onSelectionChange={setSelectedItems}
                                    promotedBulkActions={promotedBulkActions}
                                    resolveItemId={resolveItemIds} />
                                </Card>
                            </Layout.Section>
                            <Layout.Section secondary>
                                <Card title="Quick Links">

                                    <Card.Section>
                                        <Link url="/addProduct"><h1><strong>Add Product</strong></h1></Link>
                                        <p>Manage your Products</p>
                                    </Card.Section>
                                    <Card.Section>
                                    <Link url="/addProduct"><h1><strong>Product Settings</strong></h1></Link>
                                    <p>Manage product review settings</p>
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
})(ProductList);
