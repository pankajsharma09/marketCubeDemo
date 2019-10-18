import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { ResourceList } from '@shopify/polaris';

const USER_SUBSCRIPTION = gql`
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
export default class VendorList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.subscribeToMore({
            document: USER_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newData = { getUsers: [...prev.getUsers, { ...subscriptionData.data.newUserCreated }] }
                return newData;
            },
        });
    }
    render() {
        const { resourceName, items, renderItem, filterControl, selectedItems, onSelectionChange, promotedBulkActions, resolveItemId } = this.props;
        return (
            <ResourceList
                resourceName={resourceName}
                items={items}
                renderItem={renderItem}
                filterControl={filterControl}
                selectedItems={selectedItems}
                onSelectionChange={onSelectionChange}
                promotedBulkActions={promotedBulkActions}
                resolveItemId={resolveItemId}
            />
        );
    }
}
