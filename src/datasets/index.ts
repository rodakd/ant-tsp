import { Brazil } from './Brazil';
import { Capitals } from './Capitals';
import { France } from './France';
import { PolandAll } from './PolandAll';
import { PolandTop10 } from './PolandTop10';
import { PuertoRico } from './PuertoRico';
import { Ukraine } from './Ukraine';
import { UnitedStates } from './UnitedStates';
import { WorldTop1000 } from './WorldTop1000';
import { Dataset } from '~/types';
import {
  BRAZIL_VIEWSTATE,
  FRANCE_VIEWSTATE,
  POLAND_VIEWSTATE,
  PUERTO_RICO_VIEWSTATE,
  UKRAINE_VIEWSTATE,
  US_VIEWSTATE,
  WORLD_VIEWSTATE,
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
    name: `Capitals (${Capitals.length})`,
    markers: Capitals,
    viewState: WORLD_VIEWSTATE,
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
    name: `Top Population (${WorldTop1000.length})`,
    markers: WorldTop1000,
    viewState: WORLD_VIEWSTATE,
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
  {
    name: `United States (${UnitedStates.length})`,
    markers: UnitedStates,
    viewState: US_VIEWSTATE,
  },
];

export const DEFAULT_DATASET = DATASETS[0];
