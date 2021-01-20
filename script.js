const socket = io('http://localhost:3000') 
const messageForm = document.getElementById('send-container') 
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('You have a virus please call Microsoft Tech Support') /* Prompt for name */

appendMessage(`Welcome ${name}`) 
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
}) /* Name: Message */

socket.on('user-connected', name => {
    appendMessage(`${name} has connected`)
}) /* Introduction to others */

socket.on('user-disconnected', name => {
    appendMessage(`${name} has disconnected`)
}) /* Farewell to others */

messageForm/addEventListener('submit', e=> {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value=''
}) /* chat message to server */

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
} /* server to groupchat */