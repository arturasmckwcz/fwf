import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import WrapContainer from './components/WrapContainer'

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <WrapContainer />
      </div>
    </Provider>
  )
}

export default App
