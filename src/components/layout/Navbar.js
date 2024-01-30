//Componente que criará a Navbar das paginas para ser renderizada dentro do router, switch, route path
//Todo component é uma função, e dentro da função aceita o formato ejx parecido com o html

//Link do router-dom para que seja possivel a navegação entre as rotas pelo clique no link, onde usaremos o atributo to para informar a rota
import {Link} from 'react-router-dom' 

import Logo from '../../assets/img/logo.png'

/*context*/
import { Context } from '../../context/UserContext'

//Importando a estilização para o component e importar a estilização como se fosse a propriedade de um obj
import styles from './Navbar.module.css'
import { useContext } from 'react'

function Navbar(){

  const {authenticated, logout} = useContext(Context)

  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt='Get A Pet' />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>
        {
          authenticated ? 
          (
            <>
            <li>
                <Link to='/pet/mypets'>Meus Pets</Link>
            </li>
            <li>
                <Link to='/pet/myadoptions'>Minhas Adoções</Link>
            </li>
            <li>
                <Link to='/user/profile'>Perfil</Link>
            </li>
            <li onClick={logout}>
                Logout
            </li>
            </>
          ) 
          : 
          (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/Register'>Cadastro</Link>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar