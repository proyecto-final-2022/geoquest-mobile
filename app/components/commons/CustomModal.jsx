import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
} from 'react-native';
import types from 'prop-types';


class CustomModal extends React.Component {
  static propTypes = {
    children: types.node.isRequired,
    visible: types.bool.isRequired,
    dismiss: types.func.isRequired,
    transparent: types.bool,
    animationType: types.string,
  };

  static defaultProps = {
    animationType: 'none',
    transparent: true,
  };

  render() {
    const { props } = this;
    return (
      <View>
        <Modal
          visible={props.visible}
          transparent={props.transparent}
          onRequestClose={props.dismiss}
          animationType={props.animationType}
        >
          <TouchableWithoutFeedback onPress={props.dismiss}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContent}>
            {props.children}
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});


export default CustomModal;