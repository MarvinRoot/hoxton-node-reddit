import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
    verbose: console.log
})

const getAllUsers = db.prepare(`
SELECT * FROM users;`)

const getUserById = db.prepare(`
    SELECT * FROM users WHERE id =?
`)

const getUserByEmail = db.prepare(`
SELECT * FROM users WHERE email = ?`)

const getUserByUsername = db.prepare(`
SELECT * FROM users WHERE username = ?`)

const getTopicsByUserId = db.prepare(`
SELECT * FROM topics
JOIN userTopics ON userTopics.topicId = topics.id
WHERE userTopics.userId = ?;
`)

const getCommunitiesByUserId = db.prepare(`
SELECT * FROM communities
JOIN userCommunities ON userCommunities.communityId = communities.id
WHERE userCommunities.userId = ?;
`)

const getCommunityById = db.prepare(`
SELECT * FROM communities WHERE id=?`)

const getPostUpvotesByPostId = db.prepare(`
SELECT * FROM postUpvotes WHERE postId = ?
`)

const getPostDownvotesByPostId = db.prepare(`
SELECT * FROM postDownvotes WHERE postId = ?
`)

const getPostsByUserId = db.prepare(`
SELECT * FROM posts WHERE userId = ?
`)

const getAllCommunities = db.prepare(`
SELECT * FROM communities;`)

const getAllTopics = db.prepare(`
SELECT * FROM topics;`)

const getAllPosts = db.prepare(`
SELECT * FROM posts;`)

const getAllComments = db.prepare(`
SELECT * FROM comments;`)

const userSignIn = db.prepare(`
SELECT * FROM users where email = ? AND password = ?`)

const createUser = db.prepare(`
INSERT INTO users (username, email, password) VALUES (?,?,?)
`)

const createPost = db.prepare(`
INSERT INTO posts (userId, communityId , postContent, upVotes, downVotes, awards) VALUES (?,?,?,?,?,?)`)

const createCommunity = db.prepare(`
INSERT INTO posts (name)) VALUES (?)`)

const getPostById = db.prepare(`
SELECT * FROM posts WHERE id=?`)

const getCommunityByName = db.prepare(`
SELECT * FROM communities WHERE name = ?`)

app.get('/users', (req, res) => {
    const users = getAllUsers.all()
    for (const user of users) {
        const topics = getTopicsByUserId.all(user.id)
        user.topics = topics
        const posts = getPostsByUserId.all(user.id)
        user.posts = posts
        const communities = getCommunitiesByUserId.all(user.id)
        user.communities = communities
    }
    res.send(users)
})

app.get('/communities', (req, res) => {
    const communities = getAllCommunities.all()
    res.send(communities)
})

app.get('/topics', (req, res) => {
    const topics = getAllTopics.all()
    res.send(topics)
})

app.get('/posts', (req, res) => {
    const posts = getAllPosts.all()
    for (const post of posts) {
        const upvotes = getPostUpvotesByPostId.all(post.id)
        post.upvotes = upvotes
        const downvotes = getPostDownvotesByPostId.all(post.id)
        post.downvotes = downvotes
    }
    res.send(posts)
})

app.get('/comments', (req, res) => {
    const comments = getAllComments.all()
    res.send(comments)
})

app.post('/sign-in', (req, res) => {
    const { email, password } = req.body
    const errors = []

    if (typeof email !== 'string') errors.push('Email should be of type string')
    if (errors.length === 0) {
        const user = userSignIn.get(email, password)
        if (user) res.status(200).send(user)
        else res.status(404).send({ message: 'Email or password is incorrect!' })
    } else res.status(404).send(errors)
})

app.post('sign-up', (req, res) => {
    const { email, username, password } = req.body
    const errors = []
    if (typeof email !== 'string') errors.push('Email should be of type string')
    if (typeof username !== 'string') errors.push('username should be of type string')
    if (errors.length === 0) {
        const checkIfEmailExists = getUserByEmail.get(email)
        const checkIfUsernameExists = getUserByUsername.get(username)
        if (checkIfEmailExists || checkIfUsernameExists) {
            if (checkIfEmailExists) res.status(400).send({ message: 'Email already signed up. Use another email' })
            if (checkIfUsernameExists) res.status(400).send({ message: 'Username is already in use. Use another username' })
        } else {
            const user = createUser.run(username, email, password)
            if (user.changes !== 0) {
                const newUser = getUserById.get(user.lastInsertRowid)
                res.status(200).send(newUser)
            } else {
                res.status(400).send({ error: 'Something went wrong!' })
            }
        }
    } else res.status(400).send(errors)
})

app.post('/posts', (req, res) => {
    const { userId, communityId, postContent, upVotes, downVotes, awards } = req.body;

    const user = getUserById.get(userId)
    const subreddit = getCommunityById.get(communityId)

    if (user && subreddit) {
        const result = createPost.run(userId, communityId, postContent, upVotes, downVotes, awards)
        const newPost = getPostById.get(result.lastInsertRowid)
        res.status(200).send(newPost)
    } else {
        res.status(404).send({ error: 'User or subreddit doesnt exist!' })
    }
})

app.post('community', (req,res) => {
    const { name } = req.body
    
    const checkIfCommunityExists = getCommunityByName.get(name)
    if(checkIfCommunityExists) res.status(400).send({message: 'a Community with that name already exists'})
    else {
        const result = createCommunity.run(name)
        const newCommunity = getCommunityById.get(result.lastInsertRowid)
        res.status(200).send(newCommunity)
    }
})

app.listen(4000, () => {
    console.log(`Server up: https://localhost:4000`);
})