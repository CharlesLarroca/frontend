import styles from './RoundedImage.module.css'

//Metodo para deixar a imagem no formato redondo e com tamanho dinamico
function RoundedImage({src, alt, width}){
  return(
    <img 
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage