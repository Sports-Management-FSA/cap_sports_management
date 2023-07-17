import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const Newsfeed = (props) => {
    const { posts } = props;
    const players = useSelector(state => state.players.playerList);

    const handlePostSubmit = () => {
        console.log('posted!')
    }
    return (
        <div className="newsfeed__container">
            <div className="newsfeed__createpost">
                <form className="newsfeed__createpost-form" onSubmit={handlePostSubmit}>
                    <input 
                        id="post"
                        name="post"
                        placeholder='Start a conversation with your team'
                    />
                    <button>Post</button>
                </form>
            </div>
            <div className="newsfeed__posts">
                {posts.map(data => {
                    const player = players.find(player => player.id == data.userId);
                    return (
                    <div className="newsfeed__post" key={data.id}>
                        <div className="newsfeed__post-upper">
                            <span>{player.firstName} {player.lastName}</span>
                            <i>@{player.username} posted yesterday</i>
                        </div>
                        <div className="newsfeed__post-content">
                            <article>{data.message} </article>
                        </div>
                        <div className="newsfeed__post-lower">
                            <span>Like</span>
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