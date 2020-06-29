import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export default StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
  },
  upperSection: {
    padding: Metrics.m20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Metrics.m10,
  },
  map: {
    width: '100%',
    height: 200,
  },
  fetchingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.m20,
    margin: Metrics.m20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: Metrics.m20,
  },
});
