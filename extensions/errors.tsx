export function useError (errors: any, hook: any): void {
  if (errors.response.data.errors !== null) {
    const errorsList = errors.response.data.errors
    hook('server', {
      type: 'manual',
      message: errorsList[0]
    })
  } else {
    hook('server', {
      type: 'manual',
      message: 'Erro Interno'
    })
  }
}
