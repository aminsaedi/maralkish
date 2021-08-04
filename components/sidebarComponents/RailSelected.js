import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utilities/colors';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: colors.seconadryColor,
    borderRadius: 2,
  },
});
