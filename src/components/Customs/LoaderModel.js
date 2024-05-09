import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import {View} from 'react-native';
const LoaderModel = ({isVisible, color}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        flex: 1,
        margin: 0,
        // height: height,
        // width: width,
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flex: 1,
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <Spinner type="FadingCircleAlt" size={50} color={color} />
      </View>
    </Modal>
  );
};
export default LoaderModel;
