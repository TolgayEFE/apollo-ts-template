import CityModel from './city.model';
import TownModel from './town.model';

interface Context {
  City: typeof CityModel;
  Town: typeof TownModel;
}

export default Context;
