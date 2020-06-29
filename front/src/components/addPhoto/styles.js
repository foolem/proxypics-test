import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.m10,
    margin: Metrics.m10,
    borderRadius: Metrics.m5,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  text: {
    color: Colors.primary,
  },
  iconContainer: {
    marginLeft: Metrics.m10,
  },
});
