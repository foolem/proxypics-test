import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  m0: 0,
  m5: 5,
  m10: 10,
  m20: 20,
  m30: 30,
  m40: 40,
  m50: 50,
};

export default metrics;
