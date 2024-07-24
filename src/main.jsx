import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Suspense } from 'react'
import Logo from './assets/Logo.svg'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense 
            fallback={
                <div 
                  style={{
                    height: '100vh',
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                >
                  <img src={Logo} style={{height:'120px', aspectRatio: 1/1}} />
                  
                </div>
            }
        >
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
)
