const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const customers = [
  {id:1, name: "John Smith", email: 'john@email.com', age: 35},
  {id:2, name: "Jane Smith", email: 'jane@hotmail.com', age: 29},
  {id:3, name: "Steve Smith", email: 'steve@gmail.com', age: 22}
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customers: {
      type: CustomerType,
      args:{
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        for(let i = 0; i< customers.length; i++) {
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    }
  }
});


module.export = new GraphQLSchema({
  query: RootQuery
});
