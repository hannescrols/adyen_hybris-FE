export function encodeObjectValues(data = {}) {
    return Object.keys(data).reduce((encoded, x) => {
      return {
        ...encoded,
        [x]: encodeString(data[x as keyof typeof data]),
      }
    }, {})
  }
  
  export function encodeString(value: string): string {
    return typeof window === 'undefined'
      ? Buffer.from(value).toString('base64')
      : window.btoa(value)
  }

export function decodeObjectValues(data = {}) {
    return Object.keys(data).reduce((decoded, x) => {
      return { ...decoded, [x]: decodeString(data[x as keyof typeof data]) }
    }, {})
  }

  export function decodeString(value: string): string {
    return typeof window === 'undefined'
      ? Buffer.from(value, 'base64').toString('ascii')
      : window.atob(value)
  }