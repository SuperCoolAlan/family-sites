import * as migration_20261021_200146_initial from './20261021_200146_initial';
import * as migration_20261021_201631_localization from './20261021_201631_localization';
import * as migration_20261021_202105_menu_block from './20261021_202105_menu_block';

export const migrations = [
  {
    up: migration_20261021_200146_initial.up,
    down: migration_20261021_200146_initial.down,
    name: '20261021_200146_initial',
  },
  {
    up: migration_20261021_201631_localization.up,
    down: migration_20261021_201631_localization.down,
    name: '20261021_201631_localization',
  },
  {
    up: migration_20261021_202105_menu_block.up,
    down: migration_20261021_202105_menu_block.down,
    name: '20261021_202105_menu_block'
  },
];
