import moment from 'moment'

export function dateConvert (date: any): string {
  const today = new Date(date)
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = String(today.getFullYear()).padStart(4, '0')

  return dd + '-' + mm + '-' + yyyy
}

export function hoursConvert (date: any): string {
  const hours = String(new Date(date).getHours()).padStart(2, '0')
  const minutes = String(new Date(date).getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

export function globalDate (date: any): string {
  const today = date.split('-')
  console.log(today[2].padStart(4, '0') + '-' + today[1] + '-' + today[0])
  return today[2].padStart(4, '0') + '-' + today[1] + '-' + today[0]
}

export function dateValidator (data: any): boolean {
  const br_format = /^\d{2}-\d{2}-\d{4}$/.test(data)

  if (br_format && moment(data, 'DD/MM/YYYY').isValid()) {
    return true
  } else {
    return false
  }
}

export function hourValidator (data: any): boolean {
  const br_format = /^\d{2}:\d{2}/.test(data)
  const hour = data[0] + data[1]
  const minute = data[3] + data[4]

  if (br_format && Number(hour) <= 23 && Number(hour) >= 0 && Number(minute) <= 59 && Number(minute) >= 0 && data.length === 5) {
    return true
  } else {
    return false
  }
}
