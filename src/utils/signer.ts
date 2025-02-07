import { RNAlchemySigner } from '@account-kit/react-native-signer';
import { EXPO_PUBLIC_API_KEY } from '@env';

export const signer = RNAlchemySigner({
  client: { connection: { apiKey: EXPO_PUBLIC_API_KEY ?? '' } },
  // optional param to override session settings
  sessionConfig: {
    // sets the expiration to 60 minutes
    expirationTimeMs: 1000 * 60 * 60,
  },
});
