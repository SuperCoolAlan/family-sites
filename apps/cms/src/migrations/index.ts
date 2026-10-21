import * as migration_20261021_200146_initial from './20261021_200146_initial';
import * as migration_20261021_201631_localization from './20261021_201631_localization';

export const migrations = [
  {
    up: migration_20261021_200146_initial.up,
    down: migration_20261021_200146_initial.down,
    name: '20261021_200146_initial',
  },
  {
    up: migration_20261021_201631_localization.up,
    down: migration_20261021_201631_localization.down,
    name: '20261021_201631_localization'
  },
];
