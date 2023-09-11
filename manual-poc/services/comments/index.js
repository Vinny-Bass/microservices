import axios from "axios";
import cors from 'cors';
import express from 'express';
import { randomBytes } from 'node:crypto';

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const { id: postId } = req.params

    const status = "pending"

    const comments = commentsByPostId[postId] || []
    comments.push({ id: commentId, content, status })

    commentsByPostId[postId] = comments

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentCreated",
        data: { id: commentId , content, postId, status}
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening in port 4001')
})