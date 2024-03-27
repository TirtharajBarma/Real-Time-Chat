// WebSocket connection to the server using Socket.IO
const socket=io();

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area');

do{ 
    name = prompt('Please enter your name');

} while(!name);

// 'e' event object
textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
        //In the case of an input element like a textarea, the target 
        //property points to the textarea element itself, and you 
        //access its value using e.target.value.

        //sendMessage(textarea.value);
    }
});

function handelClick(){
    sendMessage(textarea.value);
}

function sendMessage(message){

    if(message.trim() === '') return;

    let msg = {
        user: name,
        message: message.trim(),
        // spaces before or after the actual text
    }

    //Append
    appendMessage(msg, 'outgoing')
    textarea.value = '';                //to delete the message after send
    scrollToBottom();

    //send to server
    //via web socket connection
    socket.emit('message', msg)     //passing the objects to server
}

function appendMessage(msg, type){

    // constructs a div element (mainDiv) to contain the message.
    let mainDiv = document.createElement('div')
    
    // type - whether incoming or outgoing
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//receive message
socket.on('message', (msg) =>{
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

//to scroll down
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}
