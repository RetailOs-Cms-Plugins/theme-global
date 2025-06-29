import type * as React from 'react';
import type { ThemeConfig } from '../../../src/types';
export declare function getTheme(): Promise<{
    cssVariables: React.CSSProperties;
    fontCSS: string;
    themeData: ThemeConfig;
}>;
export declare function getClientTheme(): Promise<ThemeConfig>;
