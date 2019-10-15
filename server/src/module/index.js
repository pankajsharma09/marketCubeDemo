import  { Query as userQuery,
    Mutation as UserMutation
} from './user/'

const resolvers = {
    Query : {
    ...userQuery 
    },
    Mutation : {
    ...UserMutation
    },
}

export default resolvers;