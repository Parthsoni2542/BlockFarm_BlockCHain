import { createDrawerNavigator } from '@react-navigation/drawer';
import AddNewQR from '../screens/AddNewQR';
import FarmerCheckout from '../screens/FarmerCheckout';
import FarmerMonitering from '../screens/FarmerMonitering';

const Drawer = createDrawerNavigator();

export const FarmerDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="wholeSelerProduct" component={FarmerMonitering} />
      <Drawer.Screen name="AddQR" component={AddNewQR} />
      <Drawer.Screen name="FarmerCheckout" component={FarmerCheckout} />
    </Drawer.Navigator>
  );
}