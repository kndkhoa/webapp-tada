import React, { useState, useEffect } from 'react';
import "./Setting-Menu.css";
import "./Setting-Format.css";
import "./Affiliate.css";
import { ReloadSkeleton, PreloadImage } from "../components/waiting";

function AffiliateProfit({ onBack }) {
  const [selectedMember, setSelectedMember] = useState(null); // Track the selected member
  const [members, setMembers] = useState([]); // Store the list of members

  useEffect(() => {
    // Fetch the affiliate members from the API
    const fetchMembers = async () => {
      try {
        const response = await fetch('https://admin.tducoin.com/api/webappuser/affiliatemembers/9999', {
          headers: {
            'x-api-key': 'oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE',
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        if (data.success) {
          setMembers(data.data); // Store the members in the state
        } else {
          console.error("Failed to fetch members.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  const BASE_URL = 'https://admin.tducoin.com/public/';

  return (
    <div className="menu-container">
      {members.map((member, index) => (
        <div key={member.memberID}>
          <div className="menu-item">
            <button className="menu-button" onClick={() => handleSelectMember(member)}>
            <img
              src={member.avatar ? `${BASE_URL}${member.avatar}` : `${BASE_URL}images/avatars/9999.jpg`} 
              alt="icon" 
              className={`affiliate-icon-left ${!member.avatar ? "affiliate-default-avatar" : ""}`}
/>
              <span>{member.name}</span>
              <div className="icon-right">
                <span>{member.ac_bonus}</span> {/* Display ac_bonus instead of the radio button */}
              </div>
            </button>
          </div>

          {/* Insert divider between items, except the last one */}
          {index < members.length - 1 && <div className="divider"></div>}
        </div>
      ))}
    </div>
  );
}

export default AffiliateProfit;
