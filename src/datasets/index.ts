import { Brazil } from './Brazil';
import { France } from './France';
import { Poland } from './Poland';
import { Ukraine } from './Ukraine';
import { Dataset } from '~/types';
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
    [21.035049197443904, 52.21218281393052],
    [19.96003074548929, 50.0351923511101],
    [19.047893877164338, 50.22314209806799],
    [17.028162240158867, 51.07003642318699],
    [16.930433289981167, 52.37158219127621],
    [18.00545174193578, 53.09158138031742],
    [18.64068991809058, 54.306495362982396],
    [14.5360740106281, 53.403457083729265],
    [20.51382812982965, 53.72270200022349],
    [23.21766241807872, 53.10136192207974],
    [22.582424241923917, 51.23350665428887],
    [20.627845238370124, 50.83403263568597],
    [19.48767415296389, 51.72044800162148],
    [19.129334668978984, 50.77226925250249],
    [22.012338699220788, 50.00379561106426],
    [21.16535446434748, 51.365900056862344],
    [15.51336351240496, 51.911761202354874],
  ],
  viewState: POLAND_VIEWSTATE,
};
