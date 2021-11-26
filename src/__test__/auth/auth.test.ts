import request from 'supertest'
import { getApp } from '../../server'

let postData = {
  query: `query allArticles{
                    allArticles{
                        id
                    }
                }`,
  operationName: 'allArticles',
}

test('/ should 404', async () => {
  const { app } = await getApp()

  const response = await request(app).get('/').expect(404)
  console.log('response', response)
})
