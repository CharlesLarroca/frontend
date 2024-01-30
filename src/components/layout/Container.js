//Componente que criará o container das paginas para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html
//Para importar as pages de home, login e register para dentro do container devemos importar como parametro o obj children, e inserir o mesmo obj dentro de main, para informar ao react que os objs ou components filhos devem ser inseridos naquele local, como no app as pages dentro do switch ja são components filhos de container pois estão dentro do mesmo, basta inserir children onde o codigo deve ser renderizado

import styles from './Container.module.css'

function Container({children}){
  return(
    <main className={styles.container}>{children}</main>
  )
}

export default Container