import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../store';
import { toast } from 'react-toastify';

const Newsfeed = (props) => {
    const { posts } = props;
    console.log(props)
    const dispatch = useDispatch();
    const [post, setPost] = useState('');
    let postTeamId;
    
    if (posts && posts.length > 0){
        postTeamId = posts[0].teamId;
    } 

    if (!posts){
        return ( 
            <section className="newsfeed__nodata">
                <h3>no posts yet</h3>
            </section>    
        )
    }

    const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);
    const auth = useSelector(state => state.auth);
    const players = useSelector(state => state.players.playerList);
    const handlePostSubmit = (e) => {
        e.preventDefault();
        const postMessage = {
           message: post,
           teamId: postTeamId,
           userId: 5
        }
       dispatch(addPost(postMessage))
       setPost('');
    }
    
    const notify = () => toast("Posted!",{
        className: 'custom-toast',
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


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
                    <button onClick={notify}>Post</button>
                </form>                    
            </div>
            <div className="newsfeed__posts">
                {sortedPosts.map(post => {
                    const player = players.find(player => player.id == post.userId);
                    console.log(player)
                    return (
                    <div className="newsfeed__post" key={post.id}>
                        <div className="newsfeed__post-upper">
                            <div className="post-upper-group">
                                <img src={player.avatar} alt="Image" />
                                <div className="upper-group-names">
                                    <span>{player.firstName} {player.lastName}<i>@{player.username}</i></span><br />
                                    <i>posted Yesterday</i>
                                </div>
                            </div>
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
                    
            </div>
        </div>
    );
};

export default Newsfeed;