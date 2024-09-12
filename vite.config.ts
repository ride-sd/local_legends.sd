import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export const homedir = () => {
  return '/home/mock-user'; // Return a mock directory path
};

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
  ],
  define: {
    'process.env': {
      NODE_ENV: 'production',
    },
    'os.homedir': '() => "/home/mock-user"'
  }
})
