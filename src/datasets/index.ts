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

// TODO: Add flags
export const DATASETS: Dataset[] = [
  {
    name: `Poland (${Poland.length})`,
    markers: Poland,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Australia (${Australia.length})`,
    markers: Australia,
    viewState: AUSTRALIA_VIEWSTATE,
  },
  {
    name: `Ukraine (${Ukraine.length})`,
    markers: Ukraine,
    viewState: UKRAINE_VIEWSTATE,
  },
  {
    name: `Canada (${Canada.length})`,
    markers: Canada,
    viewState: CANADA_VIEWSTATE,
  },
  {
    name: `United Kingdom (${UnitedKingdom.length})`,
    markers: UnitedKingdom,
    viewState: UNITED_KINGDOM_VIEWSTATE,
  },
  {
    name: `Spain (${Spain.length})`,
    markers: Spain,
    viewState: SPAIN_VIEWSTATE,
  },
  {
    name: `India (${India.length})`,
    markers: India,
    viewState: INDIA_VIEWSTATE,
  },

  {
    name: `France (${France.length})`,
    markers: France,
    viewState: FRANCE_VIEWSTATE,
  },
  {
    name: `Brazil (${Brazil.length})`,
    markers: Brazil,
    viewState: BRAZIL_VIEWSTATE,
  },
];

export const DEFAULT_DATASET = DATASETS[0];
