import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import Stats from 'stats-js'
import './index.css'

//create the react app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)

//mount the stats, if react takes too long to render it will mess with this
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
stats.dom.style.setProperty('right', '0px', 'important')
stats.dom.style.removeProperty('left')

const animate = () => {
  stats.begin()
  stats.end()
  requestAnimationFrame(animate)
}
animate()
