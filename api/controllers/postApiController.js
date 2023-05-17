const Post = require('../../models/PostModel');
const User = require('../../models/UserModel');

module.exports = {
    main: (req, res) => {

        const findQuery = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findQuery).populate('author').lean().then((posts)=>{
                    // console.log(posts);

                    // res.send('działa'); 
                    res.render('blogViews/blog', {posts: posts});

                }).catch((err) => {
                        res.send(err);
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
                let newPost = new Post({...req.body, author: res.locals.userId});
        newPost.save();

        User.findById(res.locals.userId).then((user)=>{
            user.posts.push(newPost._id);
            user.save();

        }).catch((err) => {
                return res.send('Get user error');
            });

        res.redirect('/blog');
    },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body).then((post)=>{
            res.redirect('/blog/' + post._id);

        }).catch((err) => {
                // res.send(err);
                res.send('Update post error');
            });
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then((post)=>{
            res.redirect('/blog');

        }).catch((err) => {
                // res.send(err);
                res.send('Delete post error');
            });
    },
    editForm: (req, res) => {
        Post.findById(req.params.id).then((post)=>{
            res.render('blogViews/editPostForm', post);

        }).catch((err) => {
                // res.send(err);
                res.send('Get post error');
            });
    }
};