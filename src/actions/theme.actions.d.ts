import type * as React from 'react';
import type { ThemeConfig } from '../types';
export declare function getTheme({ noCache }?: {
    noCache?: boolean | undefined;
}): Promise<{
    cssVariables: React.CSSProperties;
    fontCSS: string;
    themeData: ThemeConfig;
}>;
export declare function getClientTheme({ noCache }?: {
    noCache?: boolean | undefined;
}): Promise<ThemeConfig>;
