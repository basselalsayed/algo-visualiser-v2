import { useEffect, useState } from 'react';

export type OS =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux';

function isMacOS(userAgent: string): boolean {
  const macosPattern = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;

  return macosPattern.test(userAgent);
}

function isIOS(userAgent: string): boolean {
  const iosPattern = /(iPhone)|(iPad)|(iPod)/i;

  return iosPattern.test(userAgent);
}

function isWindows(userAgent: string): boolean {
  const windowsPattern = /(Win32)|(Win64)|(Windows)|(WinCE)/i;

  return windowsPattern.test(userAgent);
}

function isAndroid(userAgent: string): boolean {
  const androidPattern = /Android/i;

  return androidPattern.test(userAgent);
}

function isLinux(userAgent: string): boolean {
  const linuxPattern = /Linux/i;

  return linuxPattern.test(userAgent);
}

function getOS(): OS {
  if (typeof globalThis === 'undefined') {
    return 'undetermined';
  }

  const { userAgent } = globalThis.navigator;

  if (isIOS(userAgent) || (isMacOS(userAgent) && 'ontouchend' in document)) {
    return 'ios';
  }
  if (isMacOS(userAgent)) {
    return 'macos';
  }
  if (isWindows(userAgent)) {
    return 'windows';
  }
  if (isAndroid(userAgent)) {
    return 'android';
  }
  if (isLinux(userAgent)) {
    return 'linux';
  }

  return 'undetermined';
}

interface usePlatformReturn {
  ctrlKeySymbol: string;
  ctrlKeyTitle: string;
  os: OS;
}

export const usePlatform = (): usePlatformReturn => {
  const [os, setOs] = useState<OS>(getOS);

  useEffect(() => {
    setOs(getOS);
  }, []);

  const [ctrlKeySymbol, ctrlKeyTitle] =
    os === 'ios' || os === 'macos' ? ['⌘', 'Command'] : ['^', 'Control'];

  return {
    ctrlKeySymbol,
    ctrlKeyTitle,
    os,
  };
};
