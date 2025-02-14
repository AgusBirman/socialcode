import 'dotenv/config'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'
import logic from './index.js'

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        data.users = users
        data.posts = posts

        try {
            logic.createComment('pepe', 'Test comentario', '6683142054b9e6759b6d2213', (error) => {

                if (error) {
                    console.error(error)

                    return
                }

                console.log('comment created')
            })

        } catch (error) {

            console.error(error)
        }
    })
    .catch(error => console.error(error))