const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log(import.meta.env.VITE_GITHUB_TOKEN);
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // console.log('Data:', data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

const saveCandidate = async (candidate: any) => { 
  try {
    console.log("Saving candidate:", candidate);
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    candidates.push(candidate);
    await localStorage.setItem('savedCandidates', JSON.stringify(candidates)); 
    console.log("localStorage after save:", localStorage.getItem('savedCandidates'));
  } catch (err) {
    console.error('Error saving candidate to localStorage', err);
  }
};

const removeCandidate = (login: string) => {
  try {
    let savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates = savedCandidates.filter((candidate: any) => candidate.login !== login);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  } catch (err) {
    console.error('Error removing candidate from localStorage', err);
  }
};

export { searchGithub, searchGithubUser, saveCandidate, removeCandidate };
