import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import AppHeader from './components/AppTopBar/AppHeader';
import { getCustomersFromServer } from './reducers/AsyncSlice/customerAsync';
import HomeRoutes from './components/HomeRoutes/HomeRoutes';
import CustomerRoutes from './components/CustomerRoutes/CustomerRoutes';
import CustomerEdit from './components/CustomerEdit/CustomerEdit';
import { Container } from '@mui/material';


function App() {
   const dispatch = useDispatch()
   const { keyword } = useParams()
   useEffect(() => {
      dispatch(getCustomersFromServer({ keyword }))
   })
   return (
      <div className="App" data-testid={'mainContent'}>
         <AppHeader />
         <Container>
            <Routes>
               <Route
                  name='home-route'
                  exact path={'/'}
                  element={<HomeRoutes />}
               />
               <Route
                  name='home-route'
                  exact path={'search/:keyword'}
                  element={<CustomerRoutes />}
               />
               <Route
                  name='customerlist-route'
                  path={'customers'}
                  element={<CustomerRoutes />}
               />
               <Route
                  name='customer-route'
                  path={'customers/:customerId'}
                  element={<CustomerEdit />}
               />
               <Route
                  name='no-match'
                  path={'*'}
                  element={<main>
                     there no match to the route you click
                  </main>}
               />
            </Routes>
         </Container>
      </div>
   );
}

export default App;
