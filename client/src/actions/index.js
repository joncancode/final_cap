// import * as Cookies from 'js-cookie';

export const TEST_ACTION = 'TEST_ACTION';
export const testAction = () => ({
    type: TEST_ACTION
});


// connect socket to redux?
// socket.on('message', (message) => store.dispatch(
//     { type: 'NEW_MESSAGE', message} ));