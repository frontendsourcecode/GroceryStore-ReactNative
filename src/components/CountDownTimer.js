import * as React from 'react';
import {render} from 'react-dom';
import {View, Text} from 'react-native';

function CountDownTimer(props) {
  const [counter, setCounter] = React.useState(props.time);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View>
      <Text style={props.style}>{counter}</Text>
    </View>
  );
}

export default CountDownTimer;
