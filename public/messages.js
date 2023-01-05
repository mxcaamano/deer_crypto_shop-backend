const socket = io().connect()

// Render de Chat

const renderMsgs = (data) => {
    let chatcontainer = document.querySelector('#chat-container')
    let html = data.map(msg => `<li class="p-2">
      <img src="${msg.author.avatar}" alt="" width="60" height="60">
      <strong style='color:#1ABC9C'> ${msg.author.alias} </strong>
      <em style='color:#148F77'> (${msg.author.id})</em>
      <em style='color:#148F77'>${msg.date} <strong>:</strong> </em>
      <p class="fst-italic m-2" style='color:#117864'>${msg.text}</p> 
      </li>`)
    chatcontainer.innerHTML = html
  }

socket.on('getMsgs', data => {
    renderMsgs(data.chat)
  })
  
  const addMessage = (e) => {
    const text = document.getElementById('text').value
    const sessionId = document.getElementById('sessionId').value
    if(text && sessionId){
        socket.emit('postMsg', {text: text, sessionId: sessionId})
        return false
    }
    else{
        alert('Complete los datos requeridos')
    }
  }