const users = [
    {
        username: 'marvin',
        email: 'marvin@mail.com',
        password: 'marvin',
        country_code: 1,
        coins: 100,
        karma: 7969,
    },
    {
        username: 'critical_engineer',
        email: 'engineer@mail.com',
        password: 'engineer',
        country_code: 3,
        coins: 200,
        karma: 7999,
    },
    {
        username: 'mangofruit',
        email: 'mango@mail.com',
        password: 'mango',
        country_code: 2,
        coins: 0,
        karma: 79,
    }
]

const countries = [
    {
        name: 'Albania',
        continent_name: 'Europe'
    },
    {
        name: 'Spain',
        continent_name: 'Europe'
    },
    {
        name: 'U.K',
        continent_name: 'Africa'
    }
]

const communities = [
    {
        name: 'foodporn',
    },
    {
        name: 'engineering',
    },
    {
        name: 'hiphop',
    },
    {
        name: 'conspiracies',
    }
]

const userCommunities = [
    {
        userId: 1,
        communityId: 2
    },
    {
        userId: 1,
        communityId: 3
    },
    {
        userId: 2,
        communityId: 1
    },
    {
        userId: 3,
        communityId: 4
    },
    {
        userId: 3,
        communityId: 1
    }
]

const topics = [
    {
        topicName: 'horror'
    },
    {
        topicName: 'sports'
    },
    {
        topicName: 'programming'
    },
    {
        topicName: 'wholesome content'
    }
]

const userTopics = [
    {
        userId: 1,
        topicId: 2
    },
    {
        userId: 1,
        topicId: 3
    },
    {
        userId: 1,
        topicId: 4
    },
    {
        userId: 2,
        topicId: 1
    },
    {
        userId: 3,
        topicId: 4
    }
]

const posts = [
    {
        userId: 1,
        communityId: 2,
        postContent: 'Amazing skills',
        upVotes: 1,
        downVotes: 0,
        awards: 'useful award',
    },
    {
        userId: 1,
        communityId: 3,
        postContent: 'Look at this concert performance',
        upVotes: 2,
        downVotes: 0,
        awards: 'amazing award',
    },
    {
        userId: 2,
        communityId: 1,
        postContent: 'Amazing cook',
        upVotes: 1,
        downVotes: 0,
        awards: 'tasty award',
    },
    {
        userId: 3,
        communityId: 4,
        postContent: 'Illumninati',
        upVotes: 0,
        downVotes: 2,
        awards: null,
    }
]

const postDownvotes = [
    {
        postId: 4,
        userId: 1
    },
    {
        postId: 4,
        userId: 2
    }
]

const postUpvotes = [
    {
        postId: 1,
        userId: 2
    },
    {
        postId: 2,
        userId: 2,
    },
    {
        postId: 2,
        userId: 3,
    },
    {
        postId: 3,
        userId: 1,
    }
]

const comments = [
    {
        commentContent: 'wow',
        postId: 1,
        userId: 2
    },
    {
        commentContent: 'not real',
        postId: 4,
        userId: 1
    }
]

const commentDownvotes = [
    {
        commentId: 2,
        userId: 3
    }
]

const commentUpvotes = [
    {
        commentId: 1,
        userId: 1
    },
    {
        commentId: 1,
        userId: 3
    }
]

export {
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
}