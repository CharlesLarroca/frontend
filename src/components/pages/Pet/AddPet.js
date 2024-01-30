//Componente que criará a página addpet para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html
import api from '../../../utils/api'

import styles from './AddPet.module.css'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import PetForm from '../../form/PetForm'

import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet(){
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  const navigate = useNavigate()

  async function registerPet(pet){
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(pet).forEach(key => {
      if (key === 'images'){
        for(let i = 0; i < pet[key].length; i++){
          formData.append('images', pet[key][i]) // neste loop enquanto tiver imagens no array sera inserido na propriedade images do obj pet o valor do index que o loop se encontra
        }
      } else {
        formData.append(key, pet[key]) // caso a key nao seja images irá adicionar a chave e o valor da chave no formData
      }
    })

    const data = await api.post('pets/create', formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      return response.data
  })
      .catch(error => {
        msgType = 'error'
        return error.response.data
      })

      setFlashMessage(data.message, msgType)

      if(msgType !== 'error') return navigate('/pets/mypets')
  }
  return(
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponivel para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText='Cadastrar'/>
    </section>
  )
}

export default AddPet