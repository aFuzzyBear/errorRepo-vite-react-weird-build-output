import { build, defineConfig, optimizeDeps } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactJsx(),
  ],
})
