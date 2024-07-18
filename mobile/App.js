import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListaTreino from './components/Treino/ListaTreino';
import ListaTreinoBonita from './components/Treino/ListaTreinoBonita';
import { InfoExercicio } from './components/Exercicio/InfoExercicio';
import { AppRoutes } from './routes';

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!a</Text>
    //   <StatusBar style="auto" /> */}
    //   {/* <ListaTreino /> */}
    //   {/* <ListaTreinoBonita /> */}
    //   <InfoExercicio />
    // </View>
    <AppRoutes />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
