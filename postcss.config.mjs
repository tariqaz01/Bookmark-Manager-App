const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
        darkMode: 'class',
        content: [
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
      },
    },
  },
};

export default config;
