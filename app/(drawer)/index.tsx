import { Link, Stack } from 'expo-router';
import React from 'react';

import { Container } from '~/src/components/Container';
import { ScreenContent } from '~/src/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
        <Link href="./login">Login</Link>
        <Link href="./homepage">HomePage</Link>
        <Link href="./settings">Settings</Link>
      </Container>
    </>
  );
}
