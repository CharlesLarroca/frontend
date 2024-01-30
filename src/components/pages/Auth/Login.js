//Componente que criará a página Login para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html
import {useState, useContext} from 'react'
import styles from '../../form/Form.module.css'
import Input from '../../form/Input'
import {Link} from 'react-router-dom'

/*context*/
import { Context } from '../../../context/UserContext'

function Login(){
  const [user, setUser] = useState({})
  const {login} = useContext(Context)
  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    login(user)
  }

  return(
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite o seu e-mail'
          handleOnChange={handleChange}
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}
        />
        <input type='submit' value='Login'/>
      </form>
      <p>
        Não tem conta? <Link to='/register'>Clique Aqui!</Link>
      </p>
    </section>
  )
}

export default Login