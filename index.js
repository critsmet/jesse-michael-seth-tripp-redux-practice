let messages = document.getElementById('messages')
let messageForm = document.getElementById('add-message-form')

function createStore(reducer){
  let state = reducer(undefined, {})
  return {
    dispatch: function(action){ state = reducer(state, action)},
    getState: function(){ return {...state} }
  }
}

//reducer
function messageReducer(state = {messages: []}, action){
  switch(action.type){
    case ADD_MESSAGE:
      return {messages: [...state.messages, action.payload]}
    case REMOVE_MESSAGE:
      return {messages: state.messages.filter(message => message !== action.payload)}
    default:
      return state
  }
}

//action type
const ADD_MESSAGE = "ADD_MESSAGE"
const REMOVE_MESSAGE = "REMOVE_MESSAGE"

//action creators
function addMessage(message){
  return {type: ADD_MESSAGE, payload: message}
}

function removeMessage(message){
  return {type: REMOVE_MESSAGE, payload: message}
}

const store = createStore(messageReducer)

function render(){
  messages.innerHTML = store.getState().messages.map(message => `<li>${message}</li>`).join("")
}

messageForm.addEventListener('submit', function(event){
  event.preventDefault()
  let text = event.target.text.value
  store.dispatch(addMessage(text))
  render()
  event.target.reset()
})

messages.addEventListener('click', function(event){
  if (event.target.tagName === "LI"){
    let text = event.target.innerText
    store.dispatch(removeMessage(text))
    render()
  }
})
