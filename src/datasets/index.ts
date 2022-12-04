import { Brazil } from './Brazil';
import { France } from './France';
import { PolandAll } from './PolandAll';
import { PolandTop10 } from './PolandTop10';
import { PuertoRico } from './PuertoRico';
import { Ukraine } from './Ukraine';
import { Dataset } from '~/types';
import {
  BRAZIL_VIEWSTATE,
  FRANCE_VIEWSTATE,
  POLAND_VIEWSTATE,
  PUERTO_RICO_VIEWSTATE,
  UKRAINE_VIEWSTATE,
} from './viewstates';

export const DATASETS: Dataset[] = [
  {
    name: `Poland Top (${PolandTop10.length})`,
    markers: PolandTop10,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Puerto Rico (${PuertoRico.length})`,
    markers: PuertoRico,
    viewState: PUERTO_RICO_VIEWSTATE,
  },
  {
    name: `Poland (${PolandAll.length})`,
    markers: PolandAll,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Ukraine (${Ukraine.length})`,
    markers: Ukraine,
    viewState: UKRAINE_VIEWSTATE,
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
