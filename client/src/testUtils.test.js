import React from 'react'
import { render as rtlRender } from '@testing-library/react'

// eslint-disable-next-line no-unused-vars
function render(ui, { ...renderOptions } = {}) {
   function Wrapper({ children }) {
      return (
         <>{children}</>
      )
   }
   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}



// re-export everything
export * from '@testing-library/react'

// override render method
export { render }