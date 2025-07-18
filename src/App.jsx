import { useQuery } from '@apollo/client';
import { GET_USER } from '../lib/queries';
import { useState, useRef } from 'react';

const App = () => {
  const [username, setUsername] = useState('arash-jj');
  const inputRef = useRef(null)
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username }
  });
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>;
  const user = data.user;
  const searchHandler = ()=>{
    setUsername(inputRef.current.value)
  }
  return (
    <div className="w-full dark:bg-[#0d1117] dark:text-[#e6edf3]">
      <div className="w-full h-fit md:p-20 p-3 border-[#30363d] border-b text-[#e6edf3] flex gap-2 justify-center relative">
        <input 
        ref={inputRef}
        type="text" 
        className='md:w-1/2 w-full border border-[#30363d] rounded-full px-3 py-2' 
        placeholder='Search a username'/>
        <img 
        src="/searchIcon.svg" 
        alt="Search-Icon" 
        onClick={searchHandler}
        className='w-[40px] h-[40px] cursor-pointer bg-[#21262d] rounded-full p-2'/>
      </div>
      <div className="flex items-center mb-6 p-2">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.bio}</p>
          <p>Followers: {user.followers.totalCount}</p>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className='text-[#3d83dc] text-sm'>Visit The Profile</a>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 p-2">Top Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        {user.repositories.nodes.map((repo) => (
          <div key={repo.name} className="border-[#30363d] border rounded p-4 hover:shadow-md">
            <h3 className="font-bold text-lg text-[#3d83dc]">{repo.name}</h3>
            <p className="text-gray-700 mb-2">
              {repo.description || 'No description'}
            </p>
            <div className="flex space-x-4 text-sm">
              <span>★ {repo.stargazerCount}</span>
              <span>⎇ {repo.forkCount}</span>
              <span>
                Updated: {new Date(repo.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;