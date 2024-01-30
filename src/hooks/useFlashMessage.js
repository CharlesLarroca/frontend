import bus from '../utils/bus'

//Metodo para disparar envio de mensagens
export default function useFlashMessage(){
  // Setando o tipo de mensagem e texto
  function setFlashMessage(msg, type){
    //emitira um evento de flash
    bus.emit('flash', {
      message: msg,
      type: type
    })
  }

  return {setFlashMessage}
}