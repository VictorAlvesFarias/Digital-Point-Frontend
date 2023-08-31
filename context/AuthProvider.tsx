import React, { createContext, useEffect, useState } from 'react'
import { getData, removeValue, setStoreData } from '../asyncStorage'
import { requestLogin } from '../api'

export const AuthContext = createContext({})

function AuthProvider ({ children }: any): React.JSX.Element {
  const [authenticated, isAuthenticated] = useState<boolean>()

  async function singIn (data: any): Promise<any> {
    const result = await requestLogin(data)
      .then((response) => {
        isAuthenticated(true)
        setStoreData('digitalPointTokenAcess', response.data.user.token)
        setStoreData('digitalPointUser', JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email
        }))
        return { response: { data: { errors: null } } }
      })
      .catch((errors) => {
        console.log(errors.response.data.errors)
        isAuthenticated(false)
        return errors
      })

    return result
  }

  function logout (): void {
    isAuthenticated(false)
    removeValue('digitalPointTokenAcess')
  }

  useEffect(() => {
    void getData('digitalPointTokenAcess')
      .then(response => { response === null ? isAuthenticated(false) : isAuthenticated(true) })
  }, [])

  return (
    <AuthContext.Provider value={{ authenticated, singIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider
