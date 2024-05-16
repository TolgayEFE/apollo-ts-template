import City from "./city.resolver";
import Town from "./town.resolver";
import GraphQLJSON from "graphql-type-json";
const JSON = { JSON: GraphQLJSON };

export default [JSON, City, Town];
