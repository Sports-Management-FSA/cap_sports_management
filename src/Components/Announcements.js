import React, { useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';


const Announcements = () => {
    const data = [
        {
            id: 1,
            userId: 1,
            username: "Tom Morello",
            desc: "ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem"
        },
        
    ]

    function timeSince(date) {

        let now = new Date(),
          secondsPast = (now.getTime() - date.getTime()) / 1000;
      
        if(secondsPast < 60){
          return parseInt(secondsPast) + ' seconds ago';
        }
        
        if(secondsPast < 3600){
          return parseInt(secondsPast/60) + ' minutes ago';
        }
      
        if(secondsPast <= 86400){
          return parseInt(secondsPast/3600) + ' hours ago';
        }
      
        if(secondsPast > 86400){
          let day = date.getDate();
          let month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
          let year = date.getFullYear() == now.getFullYear() ? "" :  " "+date.getFullYear();
          return day + " " + month + year;
        }
      }
      
    let myDate = new Date();
    console.log(timeSince(myDate));  // Just now
    

    myDate.setHours(myDate.getHours() - 2);
    console.log(timeSince(myDate));  // 2 hours ago

    myDate.setDate(myDate.getDate() - 2);
    console.log(timeSince(myDate));  // 14 July

    const [isFavorited, setIsFavorited] = useState(false);

    const handleIconClick = () => {
        setIsFavorited(!isFavorited);
    };


    //const date = new Date();

    return (
        <div className="announcements__container">
            <div className="accouncements__posts">
                {data.map(post => (
                <div className="announcements__post" key={post.id}>
                    <div className="post-header">
                        <h5>{post.username}</h5>
                    </div>
                    <div className="post-content">
                        <p>{post.desc}</p>
                    </div>
                    <div className="post-likescomments" onClick={handleIconClick}>
                        {isFavorited ? 
                            <FavoriteRoundedIcon className="dashboard-icon"/> :
                            <FavoriteBorderRoundedIcon className="dashboard-icon"/> 
                        }
                        <CommentRoundedIcon className="dashboard-icon"/>
                    </div>
                    <div className="post-bottom">
                        <span>Likes</span>
                        <span>Comments</span>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Announcements;