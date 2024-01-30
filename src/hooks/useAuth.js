// Realizar conexão e acesso a API

//importando o axios com url ja configurada
import api from '../utils/api'

//hooks para manipulação do obj
import {useState, useEffect} from 'react'
//hook para manipulação das rotas
import {useNavigate} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
  const {setFlashMessage} = useFlashMessage()
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  //inserir o token automaticamente para o headers da rota
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  let msgText = 'Cadastro realizado com sucesso!'
  let msgType = 'success'

  //metodo para registrar user
  async function register(user){

    try {
      // variavel que irá enviar para a rota register criada no backend, passando o obj user com os dados capturados pelo useState porem manipulados e resgatados do context
      // é feita uma requisição de metodo post, direcionando para a rota criada no backend para registro enviados os dados do user atraves de uma promisse
      
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })
      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  //metodo de login
  async function login(user){
    msgText = 'Login realizado com sucesso!'
    msgType = 'success'

    try {
      const data = await api.post('/users/login', user).then(response => {
        return response.data
      })  
      await authUser(data)   
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  //Metodo para authentificação do user
  async function authUser(data){
    setAuthenticated(true)

    //salvando o token no localstorage, pegando o token enviado
    localStorage.setItem('token', JSON.stringify(data.token))

    //redirecionamento para home
    navigate('/')
  }

  //Metodo de logout
  function logout(){
    msgText = 'Logout realizado com sucesso!'
    msgType = 'success'

    //altero o state do authenticated
    setAuthenticated(false)
    //removo o token do localstorage
    localStorage.removeItem('token')
    //atribuo undefined para authorization
    api.defaults.headers.Authorization = undefined
    //redireciono para home
    navigate('/')

    //aciono flash message
    setFlashMessage(msgText, msgType)
  }

  return{authenticated, register, logout, login}
}

