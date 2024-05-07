import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ecommerce-project',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  plugins: {
    Camera: {
      permissions: ['camera'],
    },
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
