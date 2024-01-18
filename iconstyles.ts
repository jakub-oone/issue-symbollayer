import {SymbolLayerStyle} from '@rnmapbox/maps';
import {StyleProp} from 'react-native';

export const POI_IMAGE_SIZE = 120;

const SIZE_L = 14;

export const pinLargeStyle: StyleProp<SymbolLayerStyle> = {
  textField: ['get', 'title'],
  textSize: SIZE_L,
  textColor: 'black',
  textHaloColor: 'white',
  iconImage: ['get', 'image'],
  iconSize: 1 / 2,
  textHaloWidth: 2,
  textHaloBlur: 0,
  textAnchor: 'top',
  iconAnchor: 'bottom',
  textMaxWidth: 10,
  iconAllowOverlap: false,
  textAllowOverlap: false,
  iconOptional: false,
  symbolSortKey: ['get', 'priority'],
};
