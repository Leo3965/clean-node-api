import express from 'express'

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
