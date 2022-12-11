import { Brazil } from './Brazil';
import { France } from './France';
import { Poland } from './Poland';
import { Ukraine } from './Ukraine';
import { Dataset, Marker } from '~/types';
import { Australia } from './Australia';
import {
  AUSTRALIA_VIEWSTATE,
  BRAZIL_VIEWSTATE,
  CANADA_VIEWSTATE,
  FRANCE_VIEWSTATE,
  INDIA_VIEWSTATE,
  POLAND_VIEWSTATE,
  UKRAINE_VIEWSTATE,
  UNITED_KINGDOM_VIEWSTATE,
  SPAIN_VIEWSTATE,
  UNITED_STATES_VIEWSTATE,
} from './viewstates';
import { Canada } from './Canada';
import { India } from './India';
import { UnitedKingdom } from './UnitedKingdom';
import { Spain } from './Spain';
import PLFlag from '~/assets/flags/pl.svg';
import AUFlag from '~/assets/flags/au.svg';
import BRFlag from '~/assets/flags/br.svg';
import CAFlag from '~/assets/flags/ca.svg';
import ESFlag from '~/assets/flags/es.svg';
import FRFlag from '~/assets/flags/fr.svg';
import GBFlag from '~/assets/flags/gb.svg';
import INFlag from '~/assets/flags/in.svg';
import UAFlag from '~/assets/flags/ua.svg';
import USFlag from '~/assets/flags/us.svg';
import { UnitedStates } from './UnitedStates';

// TODO: Add flags
export const DATASETS: Dataset[] = [
  {
    name: `Poland (${Poland.length})`,
    markers: Poland,
    viewState: POLAND_VIEWSTATE,
    flag: PLFlag,
  },
  {
    name: `Australia (${Australia.length})`,
    markers: Australia,
    viewState: AUSTRALIA_VIEWSTATE,
    flag: AUFlag,
  },
  {
    name: `Ukraine (${Ukraine.length})`,
    markers: Ukraine,
    viewState: UKRAINE_VIEWSTATE,
    flag: UAFlag,
  },
  {
    name: `Canada (${Canada.length})`,
    markers: Canada,
    viewState: CANADA_VIEWSTATE,
    flag: CAFlag,
  },
  {
    name: `UK (${UnitedKingdom.length})`,
    markers: UnitedKingdom,
    viewState: UNITED_KINGDOM_VIEWSTATE,
    flag: GBFlag,
  },
  {
    name: `Spain (${Spain.length})`,
    markers: Spain,
    viewState: SPAIN_VIEWSTATE,
    flag: ESFlag,
  },
  {
    name: `India (${India.length})`,
    markers: India,
    viewState: INDIA_VIEWSTATE,
    flag: INFlag,
  },

  {
    name: `France (${France.length})`,
    markers: France,
    viewState: FRANCE_VIEWSTATE,
    flag: FRFlag,
  },
  {
    name: `Brazil (${Brazil.length})`,
    markers: Brazil,
    viewState: BRAZIL_VIEWSTATE,
    flag: BRFlag,
  },
  {
    name: `US (${UnitedStates.length})`,
    markers: UnitedStates,
    viewState: UNITED_STATES_VIEWSTATE,
    flag: USFlag,
  },
];

export const DEFAULT_DATASET = {
  markers: [
    [21.035049, 52.212182],
    [19.96003, 50.035192],
    [19.047893, 50.223142],
    [17.028162, 51.070036],
    [16.930433, 52.371582],
    [18.005451, 53.091581],
    [18.640689, 54.306495],
    [14.536074, 53.403457],
    [20.513828, 53.722702],
    [23.217662, 53.101361],
    [22.582424, 51.233506],
    [20.627845, 50.834032],
    [19.487674, 51.720448],
    [19.129334, 50.772269],
    [22.012338, 50.003795],
    [21.165354, 51.3659],
    [15.513363, 51.911761],
  ] as Marker[],
  viewState: POLAND_VIEWSTATE,
};
