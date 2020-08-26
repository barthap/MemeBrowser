import * as Application from 'expo-application';
import Constants from 'expo-constants';

const manifest = Constants.manifest;
const appName = manifest?.name ?? Application.applicationName;
const appVersion = manifest?.version ?? Application.nativeApplicationVersion;
const buildNumber = Constants.appOwnership === 'expo' ? 'dev' : Application.nativeBuildVersion;

export default {
  name: appName as string,
  version: appVersion as string,
  build: buildNumber as string,
};
