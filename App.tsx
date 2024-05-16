import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigation from 'src/navigation';

function App(): React.JSX.Element {
  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'tomato',
  //     secondary: 'yellow',
  //   },
  // };

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
