import reducer, { DEFAULT_STATE } from './customerSlice'


describe('customer reducer test', () => {
   let actualState, initialState
   beforeEach(() => {
      initialState = { ...DEFAULT_STATE }
   })
   describe('get customer list fulfilled action test', () => {
      describe('when passing new data from the server', () => {
         beforeEach(() => {
            actualState = reducer(initialState, {
               type: 'customer/getCustomersFromServer/fulfilled',
               payload: [{ id: 1, name: 'kayode' }, { id: 2, name: 'isaiah' }]
            })
         })
         it('should return the mocke data', () => {
            expect(actualState.customers).toEqual([{ id: 1, name: 'kayode' }, { id: 2, name: 'isaiah' }])
         })
      })
      describe('when null is passed as payload', () => {
         beforeEach(() => {
            actualState = reducer(initialState, {
               type: 'customer/getCustomersFromServer/fulfilled',
               payload: null
            })
         })
         it('should not update the customerlist', () => {
            expect(actualState.customers).toEqual([])
         })
      })
      describe('when undefined is pass as payload', () => {
         beforeEach(() => {
            actualState = reducer(initialState, {
               type: 'customer/getCustomersFromServer/fulfilled',
               payload: undefined
            })
         })
         it('should not update the customerlist state', () => {
            expect(actualState.customers).toEqual([])
         })
      })
   })
   describe('test the reducer state', () => {
      beforeEach(() => {
         initialState = undefined
      })
      it('should return the initial state', () => {
         expect(reducer(initialState, {})).toEqual(DEFAULT_STATE)
      })
   })
})