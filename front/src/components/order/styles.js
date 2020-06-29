import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.m10,
    borderRadius: Metrics.m10,
    backgroundColor: Colors.white,
    marginTop: Metrics.m10,
  },
  infoContainer: {
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontWeight: 'bold',
  },
});
