/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    theme: {
      extend: {
        typography: () => ({
            DEFAULT: {
                css: {
                  "code::before": {
                    content: '""',
                  },
                  "code::after": {
                    content: '""',
                 }
                }
             }
        }),
      },
    },
  }

export default tailwindConfig;
