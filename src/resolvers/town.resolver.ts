import Context from "../models/interface.model";
import { IResolvers } from "@graphql-tools/utils";

const Town: IResolvers = {
  Query: {
    towns: async (_: any, __: any, { Town }: Context) => {
      return await Town.find();
    },
  },
  Mutation: {
    addTown: async (
      _: any,
      { name, geolocation, cityId }: any,
      { Town }: Context
    ) => {
      const town = new Town({ name, geolocation, cityId });
      await town.save();
      return town;
    },
  },
  Town: {
    city: async (parent: any, _: any, { City }: Context) => {
      return await City.findById(parent.cityId);
    },
    name: (parent: any) => {
      return parent.name.toUpperCase();
    } 
  },
};

export default Town;
