import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {data} from './data';
import MapboxGL, {UserTrackingMode} from '@rnmapbox/maps';
import Markers from './Markers';

MapboxGL.setAccessToken('INSERT_YOUR_TOKEN');

const styles = StyleSheet.create({
  container: {flex: 1, overflow: 'hidden'},
});

function App(): JSX.Element {
  const defaultSettings = useMemo(() => {
    return {
      followUserLocation: false,
      zoomLevel: 9,
      centerCoordinate: [14.420250430408032, 50.08624686600919],
    };
  }, []);

  return (
    <MapboxGL.MapView style={styles.container} compassEnabled={true}>
      <>
        <MapboxGL.Camera
          maxZoomLevel={18}
          defaultSettings={defaultSettings}
          followUserMode={UserTrackingMode.Follow}
        />
        <Markers markers={data} />
      </>
    </MapboxGL.MapView>
  );
}

export default App;
