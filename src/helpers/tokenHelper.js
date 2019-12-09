const charDictionary = // An array of charcodes [a-zA-Z0-9]
  Array(10).fill(0).map((value, index) => 48 + index) // [0-9]
    .concat(
      Array(26).fill(0).map((value, index) => 65 + index), // [A-Z]
      Array(26).fill(0).map((value, index) => 97 + index) // [a-z]
    )

const createToken = (tokenLenght = 40) => // Generates a random string
  String.fromCharCode.apply(null,
    Array(tokenLenght).fill(0).map(value =>
      charDictionary[Math.floor(Math.random() * charDictionary.length)]
    )
  )

const isTokenValid = (token) => /\w{40}/.test(token)

const resolveToken = (cookies, body) => {
  if ((body && body.token) && (cookies && cookies.token)) {
    if (body.token === cookies.token) {
      return body.token
    }
  } else if (body && body.token) {
    return body.token
  } else if (cookies && cookies.token) {
    return cookies.token
  }
  return undefined
}

/**
   * Checks tokens from body and cookies of the request.
   * @param body body of the request
   * @param cookies cookies from the request
   * @returns a valid token or ''
   */
const validateToken = (body, cookies) => {
  const token = resolveToken(body, cookies)

  if (token && isTokenValid(token)) {
    return token
  }

  return undefined
}

export {
  createToken,
  validateToken
}