import React from 'react';

const Announcements = () => {
    const data = [
        {
            id: 1,
            userId: 1,
            username: "Tom Morello",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
        {
            id: 2,
            userId: 2,
            username: "Jimi Hendrix",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
        {
            id: 3,
            userId: 3,
            username: "Janice Joplin",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
        {
            id: 4,
            userId: 4,
            username: "Jim Morisson",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
        {
            id: 5,
            userId: 5,
            username: "Kurt Cobain",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
    ]

    const date = new Date();

    return (
        <div className="announcements__container">
            <div className="accouncements__posts">
                {data.map(post => (
                <div className="announcements__post" key={post.id}>
                    <p>{post.username}</p>
                    <p>{post.desc}</p>
                    <div className="post-bottom">
                        <span><i class="bi bi-heart"></i>likes</span>
                        <span><i class="bi bi-chat-left-dots"></i>comments</span>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Announcements;