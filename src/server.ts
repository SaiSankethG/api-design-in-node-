import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/users'

const app = express()

const customLogger = (message) => (req, res, next) =>{
    console.log(`Hello from ${message}`)
    next();
}

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(customLogger('Custom Logger'))

app.get('/' , (req , res) => {
    console.log('hello from server')
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api' ,protect,  router)

app.post('/user' , createNewUser)
app.post('/signin' , signin)


app.use((err, req, res, next)=>{
    console.log(err)
    res.json({message:"There was an error!"})
})

export default app