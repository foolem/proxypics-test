import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
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
  dialogSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    width: '100%',
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.m20,
  },
  buttonText: {
    textTransform: 'none',
  },
  buttonTextGreen: {
    textTransform: 'none',
    color: Colors.primary,
    marginRight: Metrics.m10,
  },
  dialogContainer: {
    flexDirection: 'column',
  },
});
