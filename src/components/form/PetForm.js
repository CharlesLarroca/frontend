import { useState } from "react"

import formStyles from './Form.module.css'

import Input from './Input'
import Select from "./Select"

function PetForm({handleSubmit, petData, btnText}){
  //Estado inicial do formulario poderá ser dados de um pet ja cadastrado que vira atraves de um proxy(parecido com parametro) ou um obj vazio
  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState([])
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

  function onFileChange(e){
    setPreview(Array.from(e.target.files)) //transformo em um array as imagens selecionadas
    setPet({...pet, images: [...e.target.files]}) //copio o obj pet e na key images eu copio o array de images e passo com valor
  }

  function handleChange(e){
    setPet({...pet, [e.target.name]: e.target.value})//copio o obj pet e para cada campo preenchido eu insiro o nome da propriedade e valor no obj pet que iniciou vazio
  }

  function handleColor(e){
    setPet({...pet, color: e.target.options[e.target.selectedIndex].text}) //copio o obj pet e passo a propriedade color recebendo o texto da opção selecionada
  }

  function submit(e){
    e.preventDefault()
    handleSubmit(pet)
  }

  return(
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0 
          ? preview.map((image, index) => (
            <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
          )) 
          : pet.images && pet.images.map((image, index) => (
            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
          ))
        }
      </div>
      <Input 
        text='Imagens do Pet'
        type='file'
        name='images'
        multiple={true}
        handleOnChange={onFileChange}
      />
      <Input 
        text='Nome do Pet'
        type='text'
        name='name'
        placeholder='Digite o nome do pet'
        handleOnChange={handleChange}
        value={pet.name || ''}
      />
      <Input 
        text='Idade do Pet'
        type='number'
        name='age'
        placeholder='Digite a idade do pet'
        handleOnChange={handleChange}
        value={pet.age || ''}
      />
      <Input 
        text='Peso do Pet'
        type='number'
        name='weight'
        placeholder='Digite o peso do pet'
        handleOnChange={handleChange}
        value={pet.weight || ''}
      />
      <Select 
        name='color'
        text='Selecione a cor'
        option={colors}
        handleOnChange={handleColor}
        value={pet.color || ''}
      />
      <input type='submit' value={btnText} />
    </form>
  )
}

export default PetForm