import { Stack } from 'expo-router';

import { Container } from '~/src/components/Container';
import { ScreenContent } from '~/src/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Tab Two" />
      </Container>
    </>
  );
}
