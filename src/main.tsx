import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import Stats from 'stats-js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)

const stats = new Stats()
stats.showPanel(0)
// console.log('stats', stats.dom.style)
document.body.appendChild(stats.dom)
stats.dom.style.setProperty('right', '0px', 'important')
stats.dom.style.removeProperty('left')

const animate = () => {
  stats.begin()
  stats.end()
  requestAnimationFrame(animate)
}
animate()
