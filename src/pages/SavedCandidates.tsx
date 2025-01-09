import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    let savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  });
  return (
    <>
      <h1>Potential Candidates</h1>
      <div>
        {candidates.map((candidate) => (
          <div key={candidate.login}>
            <img src={candidate.image} alt="User Avatar" />
            <h2>{candidate.login}</h2>
            <p>{candidate.location}</p>
            <p>{candidate.email}</p>
            <p>{candidate.company}</p>
            <p>{candidate.bio}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedCandidates;
