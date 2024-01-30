//Componente que criará a página mypets para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html
import api from '../../../utils/api'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoundedImage'
import styles from './Dashboard.module.css'


function MyPets(){
  //Inicio do obj pets onde estado inicial será um array vazio, que posteriormente será preenchido com os dados dos pets
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()


  //Metodo para preencher o array do state incial
  useEffect(() => {
   api.get('/pets/mypets', {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`
    }
   }).then(response => {
    setPets(response.data.pets)
   })
  }, [token])

  //Metodo para remover o pet e realizar um filtro quando a função é acionada de atualizar a lista de pets apresentando os pets em que o id nao foi o target da exclusão
  async function removePet(id){
    let msgType = 'success'

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {
      const updatePets = pets.filter((pet) => pet._id !== id) // resgato apenas os pets que o id nao foi o target da função
      setPets(updatePets) // recebo uma nova lista atualizada com os pets sem o target de exlusão
      return response.data
    }).catch(error => {
        msgType = 'error'
        return error.response.data
      })
    
    setFlashMessage(data.message, msgType)
  }

  async function concludeAdoption(id){
    let msgType = 'success'

    const data = await api.patch(`/pets/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      } 
    }).then(response => {
      return response.data
    }).catch(error => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  // Para acionar a função de delete colocamos dentro de uma func anonima, pois no metodo tradicional de passar o nome da função e o argumento, a ação aconteceria somente apos o render da page
  return(
    <section>
      <div className={styles.petlist_header}>
        <h1>Meus Pets</h1>
        <Link to='/pet/add'>Cadastrar Pet</Link>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}> 
              <RoundedImage 
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} 
                alt={pet.name}
                width='px75'
              />
              <span className='bold'>{pet.name}</span>
              <div className={styles.actions}>
                {pet.available 
                  ? (<>
                    {pet.adopter && (
                      <button className={styles.conclude.btn} onClick={() => {
                        concludeAdoption(pet._id)
                      }}>Concluir Adoção</button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button onClick={() => {
                      removePet(pet._id)
                    }}>Excluir</button>
                  </>) 
                  : (
                  <p>Pet já adotado</p>
                  )
                }
              </div>
            </div>
          ))}
        {pets.length === 0 &&(
          <p>Nenhum Pet Cadastrado</p>
        )}
      </div>
    </section>
  )
}

export default MyPets