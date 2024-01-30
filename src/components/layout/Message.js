import styles from './Message.module.css'
import {useState, useEffect} from 'react'
import bus from '../../utils/bus'

function Message(){
  const [visibility, setVisibility] = useState(false) // estado inicial da mensagem
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  //useEffect permite que o evento ocorra apenas uma vez, evitando um render continuo
  useEffect(() => {
    //adicionando um listener no bus caso ocorra um event de flash
    bus.addListener('flash', ({message, type}) => {
      //altero a visibilidade da mensage
      setVisibility(true)
      //altero o conteudo da mensagem
      setMessage(message)
      //altero o tipo da mensagem de sucesso ou erro
      setType(type)

      //tempo que msg ficara evidente
      setTimeout(() => {
        //altero a visibilidade após o tempo informado 
        setVisibility(false)
      }, 2500)
    })
  }, [])

  return(
    // chamando o estado da mensagem
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  )
}

export default Message