import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const Newsfeed = (props) => {
    console.log(props)
    const { posts } = props;
    const players = useSelector(state => state.players.playerList);
    console.log(players);
    console.log(posts);
    // const matchedPlayer = players.find(player => player.id == posts)
    // const data = [
    //     {
    //         id: 1,
    //         userId: 1,
    //         username: "Larry David",
    //         desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
    //         molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
    //     },
    //     {
    //         id: 1,
    //         userId: 1,
    //         username: "Larry David",
    //         desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
    //         molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
    //     },
    //     {
    //         id: 1,
    //         userId: 1,
    //         username: "Larry David",
    //         desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
    //         molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
    //     },
    //     {
    //         id: 1,
    //         userId: 1,
    //         username: "Larry David",
    //         desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
    //         molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
    //     },
    // ]

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
                    console.log(player)
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