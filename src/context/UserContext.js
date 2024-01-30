import { createContext} from "react";
import useAuth from '../hooks/useAuth'

//criando context

const Context = createContext()

//Criando provedor utilizando os components children para informar oque será utilizado
function UserProvider({children}){
  //desestruturando o hook que criamos e chamando o metodo register, onde o value será os dados vindos do front 
  const {authenticated, register, logout, login} = useAuth()

  return(
    <Context.Provider value={{authenticated, register, logout, login}}>
      {children}
    </Context.Provider>
  )
}

export {Context, UserProvider} 