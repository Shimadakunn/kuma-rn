import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../src/components/HeaderButton';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Tabs',
        drawerLabel: 'Tabs',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="border-bottom" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="login"
      options={{
        headerTitle: 'Login',
        drawerLabel: 'Login',
      }}
    />
    <Drawer.Screen
      name="homepage"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
      }}
    />
    <Drawer.Screen
      name="settings"
      options={{
        headerTitle: 'Settings',
        drawerLabel: 'Settings',
      }}
    />
  </Drawer>
);

export default DrawerLayout;
