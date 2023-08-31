import axios, { type AxiosResponse } from 'axios'

export async function requestCreateWorkPoint (values: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.post('https://digitalpoint.azurewebsites.net/create-work-point',
    {
      entryTime: values.entry,
      departureTime: values.departure
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return await result
}

export async function requestDeleteWorkPoint (id: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.delete(`https://digitalpoint.azurewebsites.net/delete-work-point?workPointId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await result
}

export async function requestPutWorkPoint (id: any, post: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = await axios.put(`https://digitalpoint.azurewebsites.net/update-work-point?workPointId=${id}`,
    {
      departureTime: post.departureTime,
      entryTime: post.entryTime
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return result
}

export async function requestGetWorkPoint (token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.get('https://digitalpoint.azurewebsites.net/get-all-work-points',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return await result
}

export async function requestDeleteAccount (pass: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.delete('https://digitalpoint.azurewebsites.net/delete-current-user',
    {
      data: {
        password: pass
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return await result
}

export async function requestCreateAccount (data: any): Promise<AxiosResponse<any, any>> {
  const result = axios.post('https://digitalpoint.azurewebsites.net/create-user',
    {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm
    })

  return await result
}

export async function requestWorkPoint (token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.get('https://digitalpoint.azurewebsites.net/create-work-point',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return await result
}

export async function requestUpdatePassword (data: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.put('https://digitalpoint.azurewebsites.net/update-current-user-password',
    {
      password: data.password,
      newPassword: data.newPassword
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return await result
}

export async function requestUpdateUser (data: any, token: any): Promise<AxiosResponse<any, any>> {
  const result = axios.put('https://digitalpoint.azurewebsites.net/update-current-user',
    {
      userName: data.name,
      email: data.email
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return await result
}

export async function requestVerifyEmail (email: any): Promise<AxiosResponse<any, any>> {
  const result = axios.post('https://digitalpoint.azurewebsites.net/verify-email',
    {
      email
    }
  )

  return await result
}

export async function requestLogin (data: any): Promise<AxiosResponse<any, any>> {
  const result = axios.post('https://digitalpoint.azurewebsites.net/sign-user',
    {
      email: data.email,
      password: data.password
    })

  return await result
}
