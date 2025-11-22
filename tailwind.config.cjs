// // tailwind.config.js

// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Black & White palette
//         bw: {
//           black: "#111",
//           dark: "#222",
//           gray: "#323232",
//           light: "#ccc",
//           paper: "#f3f3f3",
//           white: "#fff"
//         }
//       },
//       boxShadow: {
//         bw: "0 2px 12px 0 rgba(20,20,20,0.8)",
//       },
//       backgroundColor: {
//         'bw-main': '#101010',
//         'bw-card': '#222',
//       },
//       textColor: {
//         'bw-primary': '#f3f3f3',
//         'bw-muted': '#bbb',
//       }
//     },
//   },
//   plugins: [],
// };

// tailwind.config.cjs

module.exports = {
  content: [
    "./index.html",
    "./src/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeamos los colores a las variables CSS definidas en index.css
        'theme-main': 'var(--color-theme-main)',
        'theme-card': 'var(--color-theme-card)',
        'theme-border': 'var(--color-theme-border)',
        'theme-text': 'var(--color-theme-text)',
        'theme-muted': 'var(--color-theme-muted)',
        'theme-accent': 'var(--color-theme-accent)',
        'theme-hover': 'var(--color-theme-hover)',
      },
      boxShadow: {
        bw: "0 2px 12px 0 rgba(20,20,20,0.8)",
      },
      backgroundColor: {
        'bw-main': '#101010',
        'bw-card': '#222',
      },
      textColor: {
        'bw-primary': '#f3f3f3',
        'bw-muted': '#bbb',
      }
    },
  },
  plugins: [],
};
