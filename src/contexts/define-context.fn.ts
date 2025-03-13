import { createContext, useContext, useDebugValue } from 'react';

export function defineContext<T>(name: string) {
  const Context = createContext<T | undefined>(undefined);

  const useCreatedContext = () => {
    const context = useContext(Context);
    useDebugValue(name);

    if (!context) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }

    return context;
  };

  return [Context, useCreatedContext];
}
