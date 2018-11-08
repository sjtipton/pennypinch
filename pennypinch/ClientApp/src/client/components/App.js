import React from 'react'
import Header from './Header'

const App = (props) => {
  return (
    <div className="container">
      <Header />
      <div style={{ marginTop: '100px', marginRight: '10px', marginBottom: '0px', marginLeft: '100px' }}>
        {props.children}
      </div>
    </div>
  )
}

export default App
