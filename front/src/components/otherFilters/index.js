import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, TextInput, Portal, Dialog, Button } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import { Colors } from '../../themes';

export default function OtherFilters({ setMeta }) {
  const [state, setState] = useState({
    address: '',
    created_at: new Date(),
    open: false,
  });

  handleApply = () => {
    setMeta(state);

    setState({ ...state, open: false });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setState({ ...state, open: true })}
        style={styles.button}>
        <Text style={styles.buttonText}>Filters</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog
          visible={state.open}
          onDismiss={() => setState({ ...state, open: false })}>
          <Dialog.Title>Filters</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>
            <View style={styles.dialogSection}>
              <View style={styles.textInputContainer}>
                <TextInput
                  label="Address"
                  value={state.address}
                  mode="outlined"
                  onChangeText={(e) => setState({ ...state, address: e })}
                />

                {/* <DateTimePicker
                  value={state.created_at}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(e, date) =>
                    setState({ ...state, created_at: date })
                  }
                /> */}
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogContainer}>
            <TouchableOpacity
              onPress={() => handleApply()}
              style={styles.button}>
              <Text style={styles.buttonTextGreen}>Apply filters</Text>
              <IconM name="check" color={Colors.primary} size={20} />
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
