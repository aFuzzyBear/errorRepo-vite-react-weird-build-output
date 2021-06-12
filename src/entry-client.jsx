import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'

const container = document.getElementById('app')

ReactDOM.createRoot(container).render(
  <StrictMode>
  <App />
</StrictMode>,
{hydrate:true}
)
