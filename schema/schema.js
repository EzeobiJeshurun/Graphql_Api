var grahpql= require('graphql');
const {GraphQLString,GraphQLSchema,GraphQLObjectType,GraphQLID,GraphQLInt } = grahpql;


const books= [
    {name: "Trans Afrique", genre: "solemn", id: "1"},
    {name: "Together we win", genre: "music", id: "2"},
    {name: "The Book of Greats", genre: "proverbs", id: "3"},
];

const authors= [
    {name: "Chris Bright", age: "24", id: "1"},
    {name: "Evelyn Jane", age: "28", id: "2"},
    {name: "Abiola Kenge", age: "25", id: "3"},
]
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        id: {type: GraphQLID}
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
                
            resolve:(parent,arg)=>{
                    //used to get data from any external source such as database
                    return books.find(book=> book.id === arg.id);
                }
           
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent,arg)=>{

                return authors.find(author=> author.id === arg.id);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});

