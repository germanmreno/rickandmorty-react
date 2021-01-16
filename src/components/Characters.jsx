import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';

import { Search } from './Search';
import { useCharacters } from '../hooks/useCharacters';
import './Characters.css';

const initialState = {
  favorites: [],
};

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      if (state.favorites.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id !== action.payload),
      };
    default:
      break;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);

  const handleFavorite = (character) => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: character,
    });
  };

  const handleFavoriteDelete = (characterId) => {
    dispatch({
      type: 'DELETE_FAVORITE',
      payload: characterId,
    });
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Characters">
      <div className="characters-favorites container">
        <h2 className="title">Favorites</h2>
        {favorites.favorites.length > 0 ? (
          favorites.favorites.map((favorite) => (
            <div className="character-card animate__animated animate__fadeIn" key={favorite.id}>
              <div className="character-image">
                <img src={favorite.image} alt={favorite.name} />
              </div>

              <h2 className="character-title">{favorite.name}</h2>

              <button
                className="favorite-btn delete"
                type="button"
                onClick={() => handleFavoriteDelete(favorite.id)}>
                <i className="fas fa-star"></i> Delete favorite
              </button>
            </div>
          ))
        ) : (
          <p className="title">You don't have favorites yet. Try to add one.</p>
        )}
      </div>

      <div className="container">
        <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

        <h2 className="title">Characters</h2>
        {filteredCharacters.map((character) => (
          <div className="character-card animate__animated animate__fadeIn" key={character.id}>
            <div className="character-image">
              <img src={character.image} alt={character.name} />
            </div>

            <h2 className="character-title">{character.name}</h2>

            <button
              className="favorite-btn"
              type="button"
              onClick={() => {
                handleFavorite(character);
              }}>
              <i className="fas fa-star"></i> Add to favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
