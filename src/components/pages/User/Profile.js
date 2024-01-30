//Componente que criará a página de perfil para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html
import {useState, useEffect} from 'react'

import api from '../../../utils/api'

import useFlashMessage from '../../../hooks/useFlashMessage'

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'

import Input from '../../form/Input'
import RoundedImage from '../../layout/RoundedImage'

function Profile(){
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '') // resgatamos o token do user
  const {setFlashMessage} = useFlashMessage()

  // Ao acessar a página os dados serão exibidos e para isso será necessário uma relação com o token, assim o mesmo será inserido dentro do array que normalmente deixamos vazio
  useEffect(() => {
    //metodo para resgatar os dados do user
    //realizamos a captura e split do token e passamos as informações para os campos necessários
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {
      // ao finalizar o resgate da resposta, alterados o estado do user de vazio para um obj com os dados da resposta
      setUser(response.data)
    })
  }, [token])

  function onFileChange(e){
    setPreview(e.target.files[0])
    setUser({...user, [e.target.name]: e.target.files[0]})
  }

  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})
  }
  
  //Realizaremos atraves desta função a atualização do user 
  async function handleSubmit(e){
    e.preventDefault()

    let msgType = 'success'

    //Instanciamos um obj do formdata para manipular os dados que receberemos do formulario, criando uma relação de key/value, faremos isso por conta do campo de img
    const formData = new FormData()

    //adicionando os campos do obj atraves das keys do user vinda do state junto com um forEach, ou seja a cada chave recebida uma nova chave será criada e adicionada ao form data, e retornará um obj preenchido com os dados do user

    const userFormData = await Object.keys(user).forEach(key => formData.append(key, user[key]))

    // aqui chamamos a api e com o verbo patch passamos a rota de atualização dos user e o formData

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        //Aqui alteramos o tipo do formulario, informa que terá multiformatos no mesmo
        'Content-Type':  'multipart/form-data'
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)

  }

  return(
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text='Imagem'
          type='file'
          name='image'
          handleOnChange={onFileChange}          
        />
        <Input 
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite o seu e-email'
          handleOnChange={handleChange}  
          value={user.email || ''}        
        />
        <Input
          text='Nome'
          type='name'
          name='name'
          placeholder='Digite o seu nome'
          handleOnChange={handleChange}  
          value={user.name || ''}        
        />
        <Input
          text='Telefone'
          type='phone'
          name='phone'
          placeholder='Digite o seu telefone'
          handleOnChange={handleChange}  
          value={user.phone || ''}        
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}      
        />
        <Input
          text='Confirmação de Senha'
          type='password'
          name='confirmpassword'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}       
        />
        <input type='submit' value='Editar'/>
      </form>
    </section>
  )
}

export default Profile