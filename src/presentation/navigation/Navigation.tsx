import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screen/Home/HomeScreen';
import { DetailsScreen } from '../screen/details/DetailsScreen';


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
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}