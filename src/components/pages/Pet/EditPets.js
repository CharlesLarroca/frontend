import api from '../../../utils/api'

import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './AddPet.module.css'

import PetForm from '../../../components/form/PetForm'

function EditPets(){
  const [pet, setPet] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  const {id} = useParams() //resgatos o id dos paramentros da url

  useEffect(() => {
    api.get(`/pets/${id}`, { //acesso a rota via api
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {
      setPet(response.data.pet) // envio para o state os dados resgatados
    })
  }, [token, id])

  //Metodo para realizar o update dos dados do pet
  async function updatePet(pet){
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(pet).forEach(key => {
      if(key === 'images'){
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.patch(`/pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  //Para evitar apresentar o form sem os dados enquanto aguardamos a resposta da req, colocamos uma condicional na qual o form so será apresentado após ja termos o pet.name
  //Passamso para o Pet form a função de atualização que recebe o obj pet, o texto que aparecerá no botão e os dados do pet
  return(
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText='Editar' petData={pet}/>
      )}
    </section>
  )
}

export default EditPets