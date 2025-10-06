/**
 * Florize Flowers Design System
 * Centralized design tokens for consistent styling across the application
 * These values should match tailwind.config.mjs
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Brand Colors
  florizeGreen: {
    DEFAULT: '#4a7c59',
    dark: '#3d6849',
    light: '#5a8f6a',
    hex: '#4a7c59'
  },
  bloomPink: {
    DEFAULT: '#e8b4cb',
    dark: '#d99bb9',
    light: '#f0c9dc',
    hex: '#e8b4cb'
  },
  creamWhite: {
    DEFAULT: '#faf8f3',
    hex: '#faf8f3'
  },
  accentGold: {
    DEFAULT: '#d4af37',
    dark: '#b89530',
    light: '#e0c560',
    hex: '#d4af37'
  },
  charcoal: {
    DEFAULT: '#2c2c2c',
    hex: '#2c2c2c'
  },

  // Semantic Colors (for UI states)
  success: '#4a7c59', // florize-green
  warning: '#d4af37', // accent-gold
  error: '#dc2626',   // red-600
  info: '#3b82f6',    // blue-500

  // Neutral Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },

  // White and Black
  white: '#ffffff',
  black: '#000000'
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    heading: ['Inter', 'sans-serif'],
    body: ['Source Sans Pro', 'sans-serif'],
    mono: ['Courier New', 'monospace']
  },

  // Font Sizes (in rem)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem'     // 128px
  },

  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem'     // 384px
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1280px'
} as const;

// ============================================================================
// CONTAINER
// ============================================================================

export const container = {
  padding: '1rem',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
    '2xl': '1280px'
  }
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none'
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  button: {
    primary: {
      bg: colors.florizeGreen.DEFAULT,
      bgHover: colors.florizeGreen.dark,
      text: colors.white,
      borderRadius: borderRadius.lg
    },
    secondary: {
      bg: colors.bloomPink.DEFAULT,
      bgHover: colors.bloomPink.dark,
      text: colors.charcoal.DEFAULT,
      borderRadius: borderRadius.lg
    },
    affiliate: {
      bg: colors.accentGold.DEFAULT,
      bgHover: colors.accentGold.dark,
      text: colors.white,
      borderRadius: borderRadius.lg
    }
  },
  card: {
    bg: colors.white,
    border: colors.gray[200],
    shadow: boxShadow.md,
    borderRadius: borderRadius.lg,
    padding: spacing[6]
  },
  header: {
    bg: colors.florizeGreen.DEFAULT,
    text: colors.white,
    height: '4rem' // 64px
  },
  footer: {
    bg: colors.charcoal.DEFAULT,
    text: colors.gray[300]
  }
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get color value by path
 * @param path - Dot-notation path (e.g., 'florizeGreen.dark')
 * @returns Color hex value
 */
export function getColor(path: string): string {
  const parts = path.split('.');
  let value: any = colors;

  for (const part of parts) {
    value = value[part];
    if (value === undefined) return colors.florizeGreen.DEFAULT;
  }

  return typeof value === 'object' ? value.DEFAULT || value.hex : value;
}

/**
 * Get spacing value
 * @param size - Spacing size (0-96)
 * @returns Spacing value in rem
 */
export function getSpacing(size: keyof typeof spacing): string {
  return spacing[size] || spacing[0];
}

/**
 * Convert hex color to RGB
 * @param hex - Hex color code
 * @returns RGB values as object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Generate rgba color string
 * @param hex - Hex color code
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 */
export function rgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
