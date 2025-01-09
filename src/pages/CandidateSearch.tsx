import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, saveCandidate } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  interface User {
    login: string;
    avatar_url: string;
    location: string;
    email: string;
    company: string;
    bio: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const initialUserData = await searchGithub();
      const updatedUsers = await Promise.all(initialUserData.map(async (user: User) => {
        const userDetails = await searchGithubUser(user.login);
        return {
          ...user,
          bio: userDetails.bio,
          email: userDetails.email,
          company: userDetails.company,
          location: userDetails.location
        };
      }));
      setUsers(updatedUsers); 
    } catch (error) {
      if (error instanceof Error && 'response' in error && (error as any).response.status === 404) {
        console.error("User not found");
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]); 

  useEffect(() => {
    const candidates = localStorage.getItem('savedCandidates');
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates) as Candidate[]);
    }
  }, []);

  const handleSaveCandidate = async () => { 
    try {
      await saveCandidate({ 
        image: users[0].avatar_url,
        login: users[0].login,
        location: users[0].location,
        email: users[0].email,
        company: users[0].company,
        bio: users[0].bio
      });

      // Update the state to trigger a re-render
      const updatedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(updatedCandidates); 

    } catch (error) {
      console.error("Error saving candidate:", error);
    }
    savedCandidates;
  };

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="search-result">
        {users.length > 0 && (
          <>
            <img src={users[0].avatar_url || 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png'} alt="User Avatar" />
            <h2>{users[0].login}</h2>
            <p>Location: {users[0].location || 'none listed'}</p>
            <p>Email: {users[0].email || 'none listed'}</p>
            <p>Company: {users[0].company || 'none listed'}</p>
            <p>Bio: {users[0].bio || 'none listed'}</p>
          </>
        )}
      </div>
      <button onClick={handleSaveCandidate}>
        Add to List
      </button>
    </>
  );
};

export default CandidateSearch;