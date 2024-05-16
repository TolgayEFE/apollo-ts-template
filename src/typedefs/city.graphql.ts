import { gql } from "graphql-tag";

const City = gql`
  scalar JSON
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "City" type defines the queryable fields for every city in our data source.
  type City {
    id: ID!
    name: String
    geolocation: JSON
    town: [Town]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "cities" query returns an array of zero or more Cities (defined above).
  type Query {
    cities: [City]
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  type Mutation {
    """
    Add a new city
    """
    addCity(name: String!, geolocation: JSON): City
  }
`;

export default City;
