import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, getUserAvatarUrl } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  interface User {
    login: string;
    avatar_url: string;
    username: string;
    location:string;
    email:string;
    company:string;
    bio:string;
  }
  
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    searchGithub().then((data) => {
      setUsers(data);
    });
  }, []);

  const userData = users.map((user: any) => {
    return searchGithubUser(user.login);
  });
  console.log(userData);

  const fetchUsers = async () => {
    try {
      const data = await searchGithub();
      setUsers(data);
    } catch (error) {
      if (error instanceof Error && 'response' in error && (error as any).response.status === 404) {
        console.error("User not found");
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  getUserAvatarUrl();

  useEffect(() => {
    fetchUsers();
  }, []);

  return(
  <>
  <h1>Candidate Search</h1>
  <main>
    {users.length > 0 && (
      <>
        <img src={users[0].avatar_url || 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png'} alt="User Avatar" />
        <h2>{users[0].login}</h2>
        <p>{users[0].username}</p>
        <p>{users[0].location || 'none listed'}</p>
        <p>{users[0].email || 'none listed'}</p>
        <p>{users[0].company || 'none listed'}</p>
        <p>{users[0].bio || 'none listed'}</p>
      </>
    )}
  </main>
  </>);
};

export default CandidateSearch;
