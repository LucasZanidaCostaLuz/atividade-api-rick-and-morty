"use client";

import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import axios from "axios";
import styles from "./home.module.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const fetchCharacters = async (name = "") => {
    setNotFound(false);
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      setCharacters(data.results);
    } catch {
      setCharacters([]);
      setNotFound(true);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);
  const handleCardClick = (name) => {
    toast.info(`Você clicou em ${name}`);
  };

  console.log(characters);

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right" 
        autoClose={7500} 
        theme="light" 
      />
      <h1 className={styles.title}>Personagens Rick and Morty</h1>
      <div className={styles.barraPesquisa}>
        <button
          onClick={() => fetchCharacters(search.trim())}
          className={styles.searchButton}
        >
             Buscar
        </button>  
        <input
          type="text"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        ></input>
        <button
          onClick={() => {
            setSearch("");
            fetchCharacters();
          }}
          className={styles.resetButton}
        >
            Resetar
        </button>
      </div>
      {notFound && (
        <h1 className={styles.notFound}>Nenhum personagem encontrado 😢</h1>
      )}
      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
