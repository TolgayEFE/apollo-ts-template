import Context from "../models/interface.model";
import { IResolvers } from "@graphql-tools/utils";

const City: IResolvers = {
  Query: {
    cities: async (_, __, { City }) => {
      return await City.find();
    },
  },
  Mutation: {
    addCity: async (_, { name, geolocation }, { City }) => {
      try {
        const city = new City({ name, geolocation });
        await city.save();
        return city;
      } catch (error) {
        throw error;
      }
    },
  },
  City: {
    town: async (parent: any, _: any, { Town }: Context) => {
      return await Town.find({ cityId: parent.id });
    },
  },
};

export default City;
