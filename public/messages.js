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

socket.on('arrMsg', data => {
    renderMsgs(data.chat)
  })
  
  const addMessage = (e) => {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let text = document.getElementById('text').value
    let avatar = document.getElementById('avatar').value
    const chatMsg = {author:{id: email, alias: name, avatar: avatar}, text: text}
    if(chatMsg.author.id && chatMsg.author.alias && chatMsg.author.avatar && chatMsg.text){
        socket.emit('add-msg', chatMsg)
        return false
    }
    else{
        alert('Complete los datos requeridos')
    }
  }