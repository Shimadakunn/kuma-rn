import { Link, Stack } from 'expo-router';
import React from 'react';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

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
