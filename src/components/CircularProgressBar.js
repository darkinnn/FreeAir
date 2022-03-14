import {useState} from 'react';
import { View, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const CircularProgressBar = ({isStartHold, setIsStartHold}) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {
        isStartHold && 
        <CircularProgress
          fontSize={30}
          value={0}
          activeStrokeColor={'#F76A6A'}
          radius={130}
          maxValue={10}
          initialValue={10}
          textColor={'#fff'}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
          duration={10000}
          onAnimationComplete={() => {setIsStartHold(false)}}
        />
      }
    </View>
  )
}

export default CircularProgressBar;