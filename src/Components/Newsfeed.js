import React, {useEffect, useState} from 'react';

const Newsfeed = () => {

    const data = [
        {
            id: 1,
            userId: 1,
            username: "Larry David",
            desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
            molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
        },
        {
            id: 1,
            userId: 1,
            username: "Larry David",
            desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
            molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
        },
        {
            id: 1,
            userId: 1,
            username: "Larry David",
            desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
            molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
        },
        {
            id: 1,
            userId: 1,
            username: "Larry David",
            desc: `Lorem ipsum dolor sit amet. Id blanditiis ullam nam architecto cupiditate est galisum 
            molestiae vel saepe voluptas sed quia deserunt est aperiam sint aut quia commodi.`
        },
    ]

    const handlePostSubmit = () => {
        console.log('posted!')
    }
    return (
        <div className="newsfeed__container">
            <div className="newsfeed__createpost">
                <form onSubmit={handlePostSubmit}>
                    <input 
                        id="post"
                        name="post"
                        placeholder='whats on your mind'
                    />
                    <button>Post</button>
                </form>
            </div>
            <div className="newsfeed__posts">
                {data.map(data => (
                    <div className="newsfeed__post" key={data.id}>
                        <div className="newsfeed__post-upper">
                            <span>{data.username}</span>
                            <i>yesterday</i>
                        </div>
                        <div className="newsfeed__post-content">
                            <article>{data.desc}
                            </article>
                        </div>
                        <div className="newsfeed__post-lower">
                            <span>Like</span>
                            <span>comments</span>
                        </div>
                </div>            
                ))}
                    
            </div>
        </div>
    );
};

export default Newsfeed;