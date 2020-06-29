import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  states: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  stateInactive: {
    padding: Metrics.m20,
    marginHorizontal: Metrics.m10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  stateActive: {
    padding: Metrics.m20,
    marginHorizontal: Metrics.m10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  stateTextInactive: {
    color: Colors.text,
  },
  stateTextActive: {
    color: Colors.primary,
  },
});
