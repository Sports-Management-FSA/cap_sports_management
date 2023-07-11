import React from "react";

export function DashboardSidebar({handleClick,activeTab}) 

{
  return (
        <>
                <ul className="dashboard__navbar-items">
                    <a onClick={() => handleClick('Home')} className={activeTab === 'Home' ? 'active' : ''}>Home</a>
                    <hr />
                    <h6>Manage</h6>
                    <a onClick={() => handleClick('Leagues')} className={activeTab === 'Leagues' ? 'active' : ''}>Leagues</a>
                    <a onClick={() => handleClick('Teams')} className={activeTab === 'Teams' ? 'active' : ''}>Teams</a>
                    <a onClick={() => handleClick('Personal')} className={activeTab === 'Personal' ? 'active' : ''}>Personal</a>
                    <hr />
                    <h6>Comms</h6>
                    <a onClick={() => handleClick('Inbox')} className={activeTab === 'Inbox' ? 'active' : ''}>Inbox</a>
                    <a onClick={() => handleClick('Announcements')} className={activeTab === 'Announcements' ? 'active' : ''}>Announcements</a>
                </ul>
            </>
        );
}
  