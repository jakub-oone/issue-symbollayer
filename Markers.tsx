import MapboxGL, {SymbolLayerStyle} from '@rnmapbox/maps';
import {OnPressEvent} from '@rnmapbox/maps/src/types/OnPressEvent';
import GeoJSON from 'geojson';
import React, {useCallback, useMemo} from 'react';
import {pinLargeStyle} from './iconstyles';

export interface Marker {
  id: string;
  url: string;
  coordinates: [number, number];
  name: string;
}

interface MarkersProps {
  markers: Marker[];
}

const Markers: React.FC<MarkersProps> = props => {
  const onFeaturePress = useCallback((e: OnPressEvent) => {
    const [feature] = e.features;
    console.log('onPress:', feature.id);
  }, []);

  const featuresCollection = useMemo<GeoJSON.FeatureCollection>(() => {
    const features: GeoJSON.FeatureCollection['features'] = props.markers.map(
      (m, i) => {
        return {
          type: 'Feature',
          id: m.id,
          properties: {
            title: m.name,
            image: m.id,
            priority: i,
          },
          geometry: {
            type: 'Point',
            coordinates: [m.coordinates[1], m.coordinates[0]],
          },
        };
      },
    );

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [props.markers]);

  const images = useMemo<SymbolLayerStyle['images']>(() => {
    const result: {[key: string]: MapboxGL.ImageEntry} = {};

    props.markers.forEach(m => {
      result[m.id] = {
        uri: m.url,
        width: 120,
        height: 120,
      };
    });

    return result;
  }, [props.markers]);

  return (
    <>
      <MapboxGL.Images images={images} />
      <MapboxGL.ShapeSource
        id={'ShapeSource_1'}
        shape={featuresCollection}
        onPress={onFeaturePress}
        hitbox={useMemo(() => ({width: 10, height: 10}), [])}>
        <MapboxGL.SymbolLayer id={'SymbolLayer_1'} style={pinLargeStyle} />
      </MapboxGL.ShapeSource>
    </>
  );
};

export default React.memo(Markers);
