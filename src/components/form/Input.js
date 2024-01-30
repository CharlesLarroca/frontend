import styles from './Input.module.css'

//Para tornamos dinamico este input o mesmo receberá alguns parametros que seus valores poderão ser alterados dinamicamentes, no caso o type(tipo do input), text(texto que ira entre a label), name(o nome do atributo), placeholder(texto dica), metodo que passara de pai para o filho que realizara a mudança do estado do component, ou seja cada input terá uma função, por ex nome, idade e etc, e o value que será o valor inserido e por ultimo o multiple(que será para envio de images)

function Input({
  type, 
  text, 
  name, 
  placeholder, 
  handleOnChange, 
  value, 
  multiple}){
  return(
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label> 
      <input 
      type={type} 
      name={name} 
      id={name} 
      placeholder={placeholder} 
      onChange={handleOnChange} 
      value={value} 
      {...(multiple ? {multiple} : '')} />
    </div>
  )
}

export default Input