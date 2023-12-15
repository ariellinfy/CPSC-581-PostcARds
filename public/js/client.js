// const socket = io();

// // Example: Update the object when clicked
// document.querySelector('#example-object').addEventListener('click', () => {
//   const updatedObjectData = {
//     type: 'object',
//     position: { x: Math.random() * 4 - 2, y: Math.random() * 2, z: -3 },
//     color: getRandomColor(),
//   };
//   socket.emit('connection', updatedObjectData);
// });

// // Listen for updates from the server and apply them to the AR-VR scene
// socket.on('data', (data) => {
//   console.log('Received object update from the server:', data);
//   const objectToUpdate = document.querySelector('#example-object');
//   objectToUpdate.setAttribute('position', data.position);
//   objectToUpdate.setAttribute('color', data.color);
// });

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
