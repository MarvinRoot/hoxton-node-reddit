import Database from "better-sqlite3"
import {
    users,
    countries,
    communities,
    userCommunities,
    topics,
    userTopics,
    posts,
    postDownvotes,
    postUpvotes,
    comments,
    commentDownvotes,
    commentUpvotes
} from "./data"

const db = new Database('./data.db', {
    verbose: console.log
})

db.exec(`
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS userCommunities;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS userTopics;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS postUpvotes;
DROP TABLE IF EXISTS postDownvotes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS commentUpvotes;
DROP TABLE IF EXISTS commentDownvotes;

CREATE TABLE IF NOT EXISTS countries (
    id INTEGER,
    name TEXT,
    continent_name TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER,
    username TEXT,
    email TEXT,
    password TEXT,
    country_code INTEGER,
    coins INTEGER,
    karma INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (country_code) REFERENCES countries(id)
);

CREATE TABLE IF NOT EXISTS communities (
    id INTEGER,
    name TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userCommunities (
    id INTEGER,
    userId INTEGER,
    communityId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (communityId) REFERENCES communities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS topics (
    id INTEGER,
    topicName TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userTopics (
    id INTEGER,
    userId INTEGER,
    topicId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topicId) REFERENCES topics(id) 
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER,
    userId INTEGER,
    communityId INTEGER,
    postContent TEXT,
    upVotes INTEGER,
    downVotes INTEGER,
    awards TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (communityId) REFERENCES communities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS postUpvotes (
    id INTEGER,
    userId INTEGER,
    postId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS postDownvotes (
    id INTEGER,
    userId INTEGER,
    postId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER,
    commentContent TEXT,
    postId INTEGER,
    userId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commentUpvotes (
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commentDownvotes (
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
);
`)

const createCountry = db.prepare(`
INSERT INTO countries (name ,continent_name) VALUES (?, ?)`)

const createUser = db.prepare(`
INSERT INTO users (username, email, password, country_code, coins, karma) VALUES (?, ?, ?, ?, ?, ?)`)

const createCommunity = db.prepare(`
INSERT INTO communities (name) VALUES (?)`)

const createUserCommunities = db.prepare(`
INSERT INTO userCommunities (userId, communityId) VALUES (?, ?)`)

const createTopic = db.prepare(`
INSERT INTO topics (topicName) VALUES (?)`)

const createUserTopics = db.prepare(`
INSERT INTO userTopics (userId, topicId) VALUES (?, ?)`)

const createPost = db.prepare(`
INSERT INTO posts (userId, communityId, postContent, upVotes, downVotes, awards) VALUES (?, ?, ?, ?, ?, ?)`)

const createPostUpvotes = db.prepare(`
INSERT INTO postUpvotes (userId, postId) VALUES (?, ?)`)

const createPostDownvotes = db.prepare(`
INSERT INTO postDownvotes (userId, postId) VALUES (?, ?)`)

const createComments = db.prepare(`
INSERT INTO comments (commentContent, postId, userId) VALUES (?, ?, ?)`)

const createCommmentUpvotes = db.prepare(`
INSERT INTO commentUpvotes (userId, commentId) VALUES (?, ?)`)

const createCommmentDownvotes = db.prepare(`
INSERT INTO commentDownvotes (userId, commentId) VALUES (?, ?)`)

for(const country of countries) {
    createCountry.run(country.name, country.continent_name)
}

for(const user of users) {
    createUser.run(user.username, user.email, user.password, user.country_code, user.coins, user.karma)
}

for(const community of communities) {
    createCommunity.run(community.name)
}

for(const userCommunity of userCommunities) {
    createUserCommunities.run(userCommunity.userId, userCommunity.communityId)
}

for(const topic of topics) {
    createTopic.run(topic.topicName)
}

for(const userTopic of userTopics) {
    createUserTopics.run(userTopic.userId, userTopic.topicId)
}

for(const post of posts){
    createPost.run(post.userId, post.communityId, post.postContent, post.upVotes, post.downVotes, post.awards)
}

for(const postUpvote of postUpvotes) {
    createPostUpvotes.run(postUpvote.userId, postUpvote.postId)
}

for(const postDownvote of postDownvotes) {
    createPostDownvotes.run(postDownvote.userId, postDownvote.postId)
}

for(const comment of comments) {
    createComments.run(comment.commentContent,comment.postId, comment.userId)
}

for(const commentUpvote of commentUpvotes) {
    createCommmentUpvotes.run(commentUpvote.userId, commentUpvote.commentId)
}

for(const commentDownvote of commentDownvotes) {
    createCommmentDownvotes.run(commentDownvote.userId, commentDownvote.commentId)
}