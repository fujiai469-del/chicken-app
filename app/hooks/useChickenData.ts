import { useState, useEffect } from 'react';

export interface Recipe {
  id: number;
  name: string;
  part: string;
  tags: string[];
  page: number;
  materials?: string;
  steps?: string[];
}

export const useChickenData = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [history, setHistory] = useState<Recipe[]>([]);

  // 初期読み込み
  useEffect(() => {
    const savedFavorites = localStorage.getItem('chicken_favorites');
    const savedHistory = localStorage.getItem('chicken_history');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // お気に入りの追加・削除
  const toggleFavorite = (recipe: Recipe) => {
    const isExist = favorites.find((f) => f.id === recipe.id);
    let newFavorites;
    if (isExist) {
      newFavorites = favorites.filter((f) => f.id !== recipe.id);
    } else {
      newFavorites = [recipe, ...favorites];
    }
    setFavorites(newFavorites);
    localStorage.setItem('chicken_favorites', JSON.stringify(newFavorites));
  };

  // 履歴の追加
  const addToHistory = (recipe: Recipe) => {
    const filteredHistory = history.filter((h) => h.id !== recipe.id);
    const newHistory = [recipe, ...filteredHistory].slice(0, 20); // 最大20件
    setHistory(newHistory);
    localStorage.setItem('chicken_history', JSON.stringify(newHistory));
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  return {
    favorites,
    history,
    toggleFavorite,
    addToHistory,
    isFavorite,
  };
};
