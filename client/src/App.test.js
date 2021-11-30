// import { render, screen } from '@testing-library/react';
import { render, screen } from './testUtils.test.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import App from './App';
import * as customerLists from './reducers/AsyncSlice/customerAsync'

const mockStore = configureMockStore()

describe('App component tests', () => {
  beforeEach(() => {
    jest
      .spyOn(customerLists, 'getCustomersFromServer')
      .mockImplementation(() => {
        return { type: 'anything', payload: [] }
      })
  })
  describe('after rendering the app', () => {
    beforeEach(() => {
      const store = mockStore({ customer: { customers: [] } })
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      )
    })
    it('show the main render', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})





// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
