import createError from 'http-errors'

import db from '../services/db'
import token from './token.controller'

const create = async (body, cookies) => {
  const user = (await token.verify(body, cookies)).user_id

  if (body && body.order && (body.header || body.text)) {
    try {
      return await db.note.create(
        body.header,
        body.text,
        body.order,
        user
      )
    } catch (error) {
      throw createError(500, 'Internal server error')
    }
  } else {
    throw createError(400, 'Request should contain "order" AND ("header" OR "text")')
  }
}

const update = async (body, cookies) => {
  await token.verify(body, cookies)

  if (body && body.id && (body.header || body.text)) {
    try {
      await db.note.update(
        body.id,
        body.header,
        body.text
      )

      return body.id
    } catch (error) {
      throw createError(500, 'Internal server error')
    }
  }
}

const remove = async (body, cookies) => {
  await token.verify(body, cookies)

  if (body && body.id) {
    try {
      await db.note.delete(
        body.id
      )

      return body.id
    } catch (error) {
      throw createError(500, 'Internal server error')
    }
  }
}

export default {
  create,
  update,
  remove
}