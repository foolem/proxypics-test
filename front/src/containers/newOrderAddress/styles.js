import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';

export default StyleSheet.create({
  section: {
    maxWidth: '100%',
    backgroundColor: Colors.white,
  },
  upperSection: {
    maxWidth: '100%',
    padding: Metrics.m20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Metrics.m10,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});
