import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../store';

const Newsfeed = (props) => {
    const { posts } = props;
    const dispatch = useDispatch();
    const [post, setPost] = useState('');
    let postTeamId;
    if (posts && posts.length > 0){
        postTeamId = posts[0].teamId;
    }
    const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);
    

    const auth = useSelector(state => state.auth);
    console.log(auth);
    const players = useSelector(state => state.players.playerList);

    
    const handlePostSubmit = (e) => {
        e.preventDefault();
        const postMessage = {
           message: post,
           teamId: postTeamId,
           userId: 1
        }
       dispatch(addPost(postMessage))
       setPost('');
    }
    
    // useEffect(() => {
    //     if (posts && posts.length > 0) {
    //       setPost(posts[0].message);
    //     }
    //   }, [posts]);
    

    return (
        <div className="newsfeed__container">
            <div className="newsfeed__createpost">
                <form className="newsfeed__createpost-form" onSubmit={handlePostSubmit}>
                    <input 
                        id="post"
                        name="post"
                        placeholder='Start a conversation with your team'
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                    <button>Post</button>
                </form>
            </div>
            <div className="newsfeed__posts">
                {sortedPosts.map(post => {
                    const player = players.find(player => player.id == post.userId);
                    return (
                    <div className="newsfeed__post" key={post.id}>
                        <div className="newsfeed__post-upper">
                            <span>{player.firstName} {player.lastName}</span>
                            <i>@{player.username} posted yesterday</i>
                        </div>
                        <div className="newsfeed__post-content">
                            <article>{post.message} </article>
                        </div>
                        <div className="newsfeed__post-lower">
                            <span onClick={() => dispatch(updatePost())}>Like</span>
                            <span>comments</span>
                        </div>
                </div>            
                )})}
                {/* {posts.map(data => (
                    <div className="newsfeed__post" key={data.id}>
                        <div className="newsfeed__post-upper">
                            <span>{data.id}</span>
                            <i>yesterday</i>
                        </div>
                        <div className="newsfeed__post-content">
                            <article>{data.message} </article>
                        </div>
                        <div className="newsfeed__post-lower">
                            <span>Like</span>
                            <span>comments</span>
                        </div>
                </div>            
                ))} */}
                    
            </div>
        </div>
    );
};

export default Newsfeed;