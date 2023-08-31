import 'react-native-gesture-handler';
import React from 'react';
import AuthProvider from './context/AuthProvider';
import Main from './pages/Main';
  
function App(): JSX.Element {

  return (
      <AuthProvider>
        <Main></Main>
      </AuthProvider>   
  );
}

export default App;
