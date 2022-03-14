import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated,
  TouchableOpacity,
  Vibration,
  Dimensions,
  Modal, 
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CircularProgressBar from '../components/CircularProgressBar';

const {width, height} = Dimensions.get('window');

const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const BubbleScreen = ({navigation}) => {

  // !importante porque se guardan los valores.
  const bubbleSize = useRef(new Animated.Value(0.7)).current;
  const opacityBtn = useRef(new Animated.Value(1)).current;
  const opacityInhalar = useRef(new Animated.Value(0)).current;
  const opacityExhalar = useRef(new Animated.Value(0)).current;
  const opacityRespiracionRecuperacion = useRef(new Animated.Value(0)).current;
  const opacityHold = useRef(new Animated.Value(0)).current;
  const opacityRonda1 = useRef(new Animated.Value(0)).current;
  const opacityRonda2 = useRef(new Animated.Value(0)).current;
  const opacityRonda3 = useRef(new Animated.Value(0)).current;
  const opacityCongrats = useRef(new Animated.Value(0)).current;
  const CPBopacity = useRef(new Animated.Value(0)).current;

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if(!isAnimated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubbleSize, {
            toValue: 0.6,
            duration: 2000,
            useNativeDriver: true
          }),
          Animated.timing(bubbleSize, {
            toValue: 0.68,
            duration: 2000,
            useNativeDriver: true
          })
        ]),
        {
          iterations: 3
        }
      ).start()
    }
  },[]);
  
  // acá se configura
  const animate = () => {
    // despues ver si borrar o no esto
    setIsAnimated(true);
    // comienza la animación
    Animated.sequence([
      Animated.parallel([
        // se va el botón
        Animated.timing(opacityBtn, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // se muestra la ronda 1
        Animated.timing(opacityRonda1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        // animacion de intro comienza
        Animated.timing(bubbleSize, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true
        }),
      ]),
      Animated.timing(bubbleSize, {
        toValue: 0.7,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(bubbleSize, {
        toValue: 0.5,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(opacityRonda1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      // Loop de respiraciones ronda 1
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            // inhalar
            Animated.timing(bubbleSize, {
              toValue: 0.95,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de inhalar
            Animated.timing(opacityInhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
          ]),
          // oculta texto de inhalar
          Animated.timing(opacityInhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.parallel([
            // exhalar
            Animated.timing(bubbleSize, {
              toValue: 0.5,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de exhalar
            Animated.timing(opacityExhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            })
          ]),
          // oculta texto de exhalar
          Animated.timing(opacityExhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
        ]),
        {
          iterations: 1
        }
      ),
      Animated.parallel([
        // muestra texto de hold
        Animated.timing(opacityHold, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        // muestra container de CPB
        Animated.timing(CPBopacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        // delay del hold
        Animated.delay(10000),
      ]),
      Animated.parallel([
        // oculta hold
        Animated.timing(opacityHold, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // oculta container de CPB
        Animated.timing(CPBopacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        // muestra aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // burbuja a 0.95
        Animated.timing(bubbleSize, {
          toValue: 0.95,
          duration: 2500,
          useNativeDriver: true
        }),
      ]),
      Animated.delay(500),
      Animated.parallel([
        // oculta aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        // vuelve a 0.5
        Animated.timing(bubbleSize, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        // muestra ronda 2
        Animated.timing(opacityRonda2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.loop(
          Animated.sequence([
            // comienza animación intro de rondas
            Animated.timing(bubbleSize, {
              toValue: 0.6,
              duration: 1000,
              useNativeDriver: true
            }),
            // muestra ronda 2
            Animated.timing(bubbleSize, {
              toValue: 0.5,
              duration: 1000,
              useNativeDriver: true
            }),
            ]),
            {
              iterations: 2
            }
          )
        ]),
      // oculta ronda 2
      Animated.timing(opacityRonda2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      // Loop de respiraciones ronda 2
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            // inhalar
            Animated.timing(bubbleSize, {
              toValue: 0.95,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de inhalar
            Animated.timing(opacityInhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
          ]),
          // oculta texto de inhalar
          Animated.timing(opacityInhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.parallel([
            // exhalar
            Animated.timing(bubbleSize, {
              toValue: 0.5,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de exhalar
            Animated.timing(opacityExhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            })
          ]),
          // oculta texto de exhalar
          Animated.timing(opacityExhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
        ]),
        {
          iterations: 5
        }
      ),
      Animated.parallel([
        // muestra texto de hold
        Animated.timing(opacityHold, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // muestra container de CPB
        Animated.timing(CPBopacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // delay del hold
        Animated.delay(29000),
      ]),
      Animated.parallel([
        // oculta texto de hold
        Animated.timing(opacityHold, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // oculta container de CPB
        Animated.timing(CPBopacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        // muestra aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // burbuja a 0.95
        Animated.timing(bubbleSize, {
          toValue: 0.95,
          duration: 2500,
          useNativeDriver: true
        }),
      ]),
      Animated.delay(500),
      Animated.parallel([
        // oculta aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // vuelve a 0.5
        Animated.timing(bubbleSize, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        // muestra ronda 3
        Animated.timing(opacityRonda3, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.loop(
          Animated.sequence([
            // comienza animación intro de rondas
            Animated.timing(bubbleSize, {
              toValue: 0.6,
              duration: 1000,
              useNativeDriver: true
            }),
            // muestra ronda 2
            Animated.timing(bubbleSize, {
              toValue: 0.5,
              duration: 1000,
              useNativeDriver: true
            }),
            ]),
          {
            iterations: 2
          }
        )
      ]),
      // oculta ronda 3
      Animated.timing(opacityRonda3, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      // Loop de respiraciones ronda 3
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            // inhalar
            Animated.timing(bubbleSize, {
              toValue: 0.95,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de inhalar
            Animated.timing(opacityInhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }),
          ]),
          // oculta texto de inhalar
          Animated.timing(opacityInhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.parallel([
            // exhalar
            Animated.timing(bubbleSize, {
              toValue: 0.5,
              duration: 3000,
              delay: 400,
              useNativeDriver: true
            }),
            // muestra texto de exhalar
            Animated.timing(opacityExhalar, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            })
          ]),
          // oculta texto de exhalar
          Animated.timing(opacityExhalar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
        ]),
        {
          iterations: 5
        }
      ),
      Animated.parallel([
        // muestra texto de hold
        Animated.timing(opacityHold, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // muestra container de CPB
        Animated.timing(CPBopacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // delay del hold
        Animated.delay(29000),
      ]),
      Animated.parallel([
        // oculta texto de hold
        Animated.timing(opacityHold, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // oculta container de CPB
        Animated.timing(CPBopacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        // muestra aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        // burbuja a 0.95
        Animated.timing(bubbleSize, {
          toValue: 0.95,
          duration: 2500,
          useNativeDriver: true
        }),
      ]),
      Animated.delay(500),
      Animated.parallel([
        // oculta aviso de respiración
        Animated.timing(opacityRespiracionRecuperacion, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        // vuelve a 0.5
        Animated.timing(bubbleSize, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true
        }),
      ]),
      Animated.delay(500),
      Animated.timing(opacityCongrats, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubbleSize, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(bubbleSize, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true
          }),
        ]),
        {
          iterations: 4
        }
      ),

    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      // navigation.navigate('FinishSessionScreen');
      Animated.parallel([
        Animated.timing(bubbleSize, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(opacityBtn, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(opacityHold, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(opacityCongrats, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
      ]).start()

    })
    
  }

  useEffect(() => {
    const listener = opacityHold.addListener(({value}) => {
      if(value === 1) {
        setIsStartHold(true);
      } else if(value === 0) {
        setIsStartHold(false);
      }
    })
    return () => {
      opacityHold.removeListener(listener);
      opacityHold.removeAllListeners();
    }
  },[])

  const stopAnimation = () => {
    Animated.parallel([
      Animated.timing(bubbleSize, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityBtn, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityInhalar, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityExhalar, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityHold, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityRonda1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityRonda2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityRonda3, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacityCongrats, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(CPBopacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
    ]).start()
  }

  const [isStartHold, setIsStartHold] = useState(false);
  // const [isFinishedHold, setIsFinishedHold] = useState(false);

  return (
    <View style={styles.container}>
      {/* bubble container */}
        <View style={styles.bubbleContainer}>
          {/* bubble animatable*/}
          <Animated.View
            style={[styles.bubbleAnimatable, {
              height: 250,
              width: 250,
              borderRadius: 150,
              backgroundColor: colors.red,
              transform: [{scale: bubbleSize}]
            }]}
          >
          </Animated.View>
        </View>


        {/* start button */}
        <Animated.View style={[styles.btn, {opacity: opacityBtn}]}>
          <TouchableOpacity
            onPress={animate}
          >
            <Text style={styles.btnText}>Start</Text>
          </TouchableOpacity>
        </Animated.View>


        {/* text */}
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityInhalar
              }]}>inhala</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityExhalar
              }]}>exhala</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityRespiracionRecuperacion
              }]}>respira</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityHold
              }]}>sostenlo</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityRonda1
              }]}>ronda 1</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityRonda2
              }]}>ronda 2</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityRonda3
              }]}>ronda 3</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, {
                opacity: opacityCongrats
              }]}>congrats</Animated.Text>
        </Animated.View>
        {/* Circle Progress Bar */}
        <Animated.View style={[styles.ProgressBarContainer, { opacity: CPBopacity}]}>
          <CircularProgressBar
            isStartHold={isStartHold} 
            setIsStartHold={setIsStartHold} 
          />
        </Animated.View>
        {/* info tbn */}
        <View style={styles.infoBtnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('InfoScreen') }
          >
            <Feather name="info" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.dotsBtnContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('PersonalizarScreen') }
            onPress={stopAnimation}
          >
            <MaterialCommunityIcons name="dots-vertical" size={30} color="black" />
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default BubbleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleContainer: {
    position: 'relative',
    backgroundColor: colors.black,
    height: 250,
    width: 250,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleAnimatable: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    height: 40,
    width: 160,
    backgroundColor: '#9D53C3',
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    borderRadius: 15,
    zIndex: 10
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 23
  },
  textContainer: {
    height: 40,
    width: 180,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  text: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center'
  },
  ProgressBarContainer: {
    position: 'absolute',
    flex: 1,
    width,
    height,
    top: 0,
  },
  ProgressBarText: {
    color: 'black',
    textAlign: 'center'
  },
  infoBtnContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
    backgroundColor: 'transparent'
  },
  dotsBtnContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    backgroundColor: 'transparent'
  }
});
