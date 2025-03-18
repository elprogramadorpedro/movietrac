import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screen/Home/HomeScreen';
import { Details } from '../screen/details/Details';

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams={
    Home:undefined;
    Details:{movieId:number}
}

export const Navigation=()=> {
  return (
    <Stack.Navigator
    
screenOptions={{
      headerShown:true
    }}



    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}