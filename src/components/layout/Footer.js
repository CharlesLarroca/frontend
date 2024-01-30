//Componente que criará o Footer das paginas para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html

import styles from './Footer.module.css'

function Footer(){
  return(
    <footer className={styles.footer}>
      <p>
        <span className="bold">Get A Pet</span> &copy; 2023
      </p>
    </footer>
  )
}

export default Footer