// src/App.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDocs, collection, addDoc, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerChoice, setPlayerChoice] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'players'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const playersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playersData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (playerName && playerChoice) {
      await addDoc(collection(db, 'players'), {
        name: playerName,
        choice: playerChoice
      });
      setPlayerName('');
      setPlayerChoice('');
    }
  };

  const handleReset = async () => {
    const q = query(collection(db, 'players'));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setPlayers([]);
  };

  const determineWinner = () => {
    if (players.length === 2) {
      const [player1, player2] = players;
      const { choice: choice1 } = player1;
      const { choice: choice2 } = player2;

      if (choice1 === choice2) return "It's a tie!";
      if ((choice1 === 'Rock' && choice2 === 'Scissors') ||
          (choice1 === 'Scissors' && choice2 === 'Paper') ||
          (choice1 === 'Paper' && choice2 === 'Rock')) {
        return `${player1.name} wins!`;
      }
      return `${player2.name} wins!`;
    }
    return '';
  };

  const winner = determineWinner();

  return (
    <div>
      <h1>Online Demo Game</h1>
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
        />
        <select
          value={playerChoice}
          onChange={(e) => setPlayerChoice(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="Rock">Rock</option>
          <option value="Paper">Paper</option>
          <option value="Scissors">Scissors</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <h2>Players:</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name}: {player.choice}</li>
        ))}
      </ul>
      {winner && (
        <h2>{winner}</h2>
      )}
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default App;