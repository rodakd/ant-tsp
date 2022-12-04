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
];

export const DEFAULT_DATASET = DATASETS[0];
