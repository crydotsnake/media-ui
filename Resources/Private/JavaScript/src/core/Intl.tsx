import * as React from 'react';
import { createContext, useContext } from 'react';
import { I18nRegistry } from '../interfaces';

interface ProviderProps extends I18nRegistry {
    children: React.ReactElement;
    translate: (id?: string, fallback?: string, params?: {}, packageKey?: string, sourceName?: string) => string;
}

interface ProviderValues extends I18nRegistry {
    translate: (id?: string, fallback?: string, params?: {}, packageKey?: string, sourceName?: string) => string;
}

export const IntlContext = createContext(null);
export const useIntl = (): ProviderValues => useContext(IntlContext);

export function IntlProvider({ children, translate }: ProviderProps) {
    return <IntlContext.Provider value={{ translate }}>{children}</IntlContext.Provider>;
}
