import * as migration_20261021_200146_initial from './20261021_200146_initial';
import * as migration_20261021_201631_localization from './20261021_201631_localization';
import * as migration_20261021_202105_menu_block from './20261021_202105_menu_block';
import * as migration_20261021_202218_form_date_field from './20261021_202218_form_date_field';
import * as migration_20261021_202247_site_settings_whatsapp from './20261021_202247_site_settings_whatsapp';

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
    name: '20261021_202105_menu_block',
  },
  {
    up: migration_20261021_202218_form_date_field.up,
    down: migration_20261021_202218_form_date_field.down,
    name: '20261021_202218_form_date_field',
  },
  {
    up: migration_20261021_202247_site_settings_whatsapp.up,
    down: migration_20261021_202247_site_settings_whatsapp.down,
    name: '20261021_202247_site_settings_whatsapp'
  },
];
