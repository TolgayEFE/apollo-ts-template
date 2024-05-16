import { gql } from "graphql-tag";

const Town = gql`
  scalar JSON
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Town" type defines the queryable fields for every town in our data source.
  type Town {
    id: ID!
    name: String
    geolocation: JSON
    cityId: String
    city: City
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "towns" query returns an array of zero or more Towns (defined above).
  type Query {
    towns(cityId: ID!): [Town]
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  type Mutation {
    """
    Add a new town
    """
    addTown(name: String!, geolocation: JSON, cityId: ID!): Town
    addTown2(input: TownInput): Town
  }

  input TownInput {
    name: String!
    geolocation: JSON
    cityId: ID!
  }

`;

export default Town;
