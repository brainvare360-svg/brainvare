/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    red: '#ff2e2e', // Vibrant red for accents
                    dark: '#0a0a0a', // Deep dark background
                    gray: '#1a1a1a', // Lighter dark for cards
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'marquee-left': 'marquee-left var(--duration, 40s) linear infinite',
                'marquee-right': 'marquee-right var(--duration, 40s) linear infinite',
            },
            keyframes: {
                'marquee-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                }
            }
        },
    },
    plugins: [],
}
