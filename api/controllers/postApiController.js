const Post = require('../../models/PostModel');
const User = require('../../models/UserModel');

module.exports = {
    main: (req, res) => {

        const findQuery = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findQuery).populate('author').lean().then((posts)=>{
                 
                    res.json(posts);

                }).catch((err) => {
                    res.json({ error: 'Get posts error' });
                    });
    },
    post: (req, res) => {
        Post.findById(req.params.id).populate('author').lean().then((post)=>{
            
            res.json(post);

        }).catch((err) => {
                res.json({ error: 'Get post error' });
            });
    },
    create: (req, res) => {
                let newPost = new Post({...req.body, author: req.user._id});
        newPost.save();

        User.findById(req.user._id).then((user)=>{
            user.posts.push(newPost._id);
            user.save();

        }).catch((err) => {
                return res.json({ error: 'Get user error' });
            });

        res.json(newPost);
    },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body).then((post)=>{
            res.json(post);

        }).catch((err) => {
                
                res.json({ error: 'Update post error' });
            });
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then((post)=>{
            res.json({ delete: true});

        }).catch((err) => {
            res.json({ error: 'Delete post error' });
            });
    }
};