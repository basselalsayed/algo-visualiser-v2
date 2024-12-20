import defaultTheme from 'tailwindcss/defaultTheme';
import animate from 'tailwindcss-animate';

/* eslint-disable sort/object-properties */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        white: 'hsl(var(--white) / <alpha-value>)',
        black: 'hsl(var(--black) / <alpha-value>)',
        'grad-accent-1': 'hsl(var(--grad-accent-1) / <alpha-value>)',
        'grad-accent-2': 'hsl(var(--grad-accent-2) / <alpha-value>)',
        'grad-accent-mix': 'var(--grad-accent-mix)',
        'grad-bg-1': 'hsl(var(--grad-bg-1) / <alpha-value>)',
        'grad-bg-2': 'hsl(var(--grad-bg-2) / <alpha-value>)',
        'grad-header-1': 'hsl(var(--grad-header-1) / <alpha-value>)',
        'grad-header-2': 'hsl(var(--grad-header-2) / <alpha-value>)',
        'grad-header-3': 'hsl(var(--grad-header-3) / <alpha-value>)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        mono: ['bangers', ...defaultTheme.fontFamily.mono],
        sans: ['bangers', ...defaultTheme.fontFamily.sans],
        serif: ['bangers', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [animate],
};
