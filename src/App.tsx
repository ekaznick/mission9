import React, { useState } from 'react';
import './App.css';
import schoolData from './CollegeBasketballTeams.json';

interface SchoolProps {
  school: string;
  mascot: string;
  location: string;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const schools: SchoolProps[] = schoolData.teams.map((team) => {
  return {
    school: team.school,
    mascot: team.name,
    location: team.city + ', ' + team.state,
  };
});

function Welcome() {
  return <h1>Welcome to the Ultimate March Madness Guide</h1>;
}

function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a school"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TeamCard({ school, mascot, location }: SchoolProps) {
  const cardStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    display: 'inline-block',
  };

  return (
    <div style={cardStyle}>
      <div>
        <strong>School: </strong> {school}
      </div>
      <div>
        <strong>Mascot:</strong> {mascot}
      </div>
      <div>
        <strong>Location:</strong> {location}
      </div>
      <div style={{ marginBottom: '10px' }}></div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const filteredSchools = schools.filter((school) =>
    school.school.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        textAlign: 'left',
        color: darkMode ? 'white' : 'black',
        background: darkMode ? 'black' : 'white',
      }}
      className="App"
    >
      <Welcome />
      <button onClick={toggleDarkMode}>Dark Mode</button>
      <p></p>
      {SearchBar({ value: searchQuery, onChange: setSearchQuery })}
      <ul>
        {filteredSchools.map((team, index) => (
          <li key={index}>
            <TeamCard
              key={index}
              school={team.school}
              mascot={team.mascot}
              location={team.location}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
