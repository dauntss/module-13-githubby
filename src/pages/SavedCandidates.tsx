import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { removeCandidate } from '../api/API';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  const handleRemoveCandidate = (login: string) => {
    removeCandidate(login); 
    setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.login !== login)); 
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Login</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.login}>
              <td><img src={candidate.image} alt="User Avatar" /></td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button onClick={() => handleRemoveCandidate(candidate.login)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;