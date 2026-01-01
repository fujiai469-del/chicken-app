"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Utensils, 
  RotateCw, 
  ChefHat, 
  BookOpen, 
  ScrollText, 
  Camera, 
  Heart, 
  History, 
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { recipes } from './data/recipes';
import { useChickenData, Recipe } from './hooks/useChickenData';
import { cn } from './lib/utils';

export default function ChickenGacha() {
  const [isClient, setIsClient] = useState(false);
  const { favorites, history, toggleFavorite, addToHistory, isFavorite } = useChickenData();
  
  const [result, setResult] = useState<Recipe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [imageExists, setImageExists] = useState(true);
  const [activeTab, setActiveTab] = useState<'gacha' | 'favorites' | 'history'>('gacha');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="text-4xl"
        >
          🍗
        </motion.div>
      </div>
    );
  }

  const spinGacha = () => {
    setIsSpinning(true);
    setResult(null);
    setImageExists(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const selectedRecipe = recipes[randomIndex] as Recipe;
      setResult(selectedRecipe);
      addToHistory(selectedRecipe);
      setIsSpinning(false);
    }, 1500);
  };

  const selectFromList = (recipe: Recipe) => {
    setResult(recipe);
    setActiveTab('gacha');
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-stone-800 font-sans pb-24">
      {/* ヘッダー */}
      <header className="bg-orange-400 text-white p-6 rounded-b-[3rem] shadow-lg mb-8">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <Utensils size={28} />
              チキンアプリ
            </h1>
            <p className="text-orange-100 text-xs font-bold">TODAY'S CHICKEN RECIPE</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <ChefHat size={24} />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'gacha' && (
            <motion.div
              key="gacha"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* ガチャ表示エリア */}
              <div className="bg-white rounded-3xl shadow-xl shadow-orange-200/50 overflow-hidden border-4 border-white min-h-[400px] flex flex-col">
                {isSpinning ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="text-7xl"
                    >
                      🍗
                    </motion.div>
                    <div className="space-y-2 text-center">
                      <p className="text-xl font-bold text-orange-500">おいしくなーれ！</p>
                      <div className="flex gap-1 justify-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="w-2 h-2 bg-orange-300 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : result ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col"
                  >
                    {/* レシピ画像 */}
                    <div className="relative aspect-video bg-orange-100 overflow-hidden">
                      <img 
                        src={`/images/${result.id}.jpg`} 
                        alt={result.name}
                        className={cn(
                          "w-full h-full object-cover transition-opacity duration-500",
                          imageExists ? "opacity-100" : "opacity-0"
                        )}
                        onError={() => setImageExists(false)}
                      />
                      {!imageExists && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-300">
                          <Camera size={48} />
                          <span className="font-bold">No Image</span>
                        </div>
                      )}
                      <button 
                        onClick={() => toggleFavorite(result)}
                        className={cn(
                          "absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all active:scale-90",
                          isFavorite(result.id) ? "bg-red-500 text-white" : "bg-white/90 text-stone-400"
                        )}
                      >
                        <Heart size={24} fill={isFavorite(result.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* レシピ内容 */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {result.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-2xl font-black text-stone-800 leading-tight">
                          {result.name}
                        </h2>
                        <p className="text-stone-400 text-sm font-bold mt-1">
                          部位: {result.part} / P.{result.page}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {result.materials && (
                          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                            <h3 className="font-black text-orange-600 flex items-center gap-2 mb-3 text-sm">
                              <ChefHat size={18}/> 材料
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {result.materials.split('、').map((item, i) => (
                                <span key={i} className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-orange-100">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {result.steps && (
                          <div>
                            <h3 className="font-black text-stone-700 flex items-center gap-2 mb-4 text-sm">
                              <ScrollText size={18}/> 作り方
                            </h3>
                            <div className="space-y-4">
                              {result.steps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                  <div className="flex-shrink-0 w-8 h-8 bg-orange-400 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-orange-200">
                                    {index + 1}
                                  </div>
                                  <p className="text-sm font-bold leading-relaxed text-stone-600 pt-1">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-6xl shadow-inner">
                      🍗
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-stone-800">今日は何チキン？</h3>
                      <p className="text-stone-400 text-sm font-bold">
                        ボタンを押して<br/>35品のレシピから選ぼう！
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ガチャボタン */}
              <button
                onClick={spinGacha}
                disabled={isSpinning}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-stone-300 text-white font-black py-5 rounded-3xl shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl"
              >
                {result ? <RotateCw size={24} className={isSpinning ? "animate-spin" : ""} /> : <Sparkles size={24} />}
                {result ? "もう一度選ぶ" : "レシピを決める"}
              </button>
            </motion.div>
          )}

          {(activeTab === 'favorites' || activeTab === 'history') && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
                  {activeTab === 'favorites' ? <Heart className="text-red-500" fill="currentColor" /> : <History className="text-orange-500" />}
                  {activeTab === 'favorites' ? 'お気に入り' : '閲覧履歴'}
                </h2>
                <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs font-black">
                  {activeTab === 'favorites' ? favorites.length : history.length}件
                </span>
              </div>

              <div className="space-y-3">
                {(activeTab === 'favorites' ? favorites : history).length > 0 ? (
                  (activeTab === 'favorites' ? favorites : history).map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => selectFromList(recipe)}
                      className="w-full bg-white p-4 rounded-2xl shadow-md border-2 border-transparent hover:border-orange-200 transition-all flex items-center gap-4 text-left group"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={`/images/${recipe.id}.jpg`} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=🍗';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-stone-800 truncate">{recipe.name}</h3>
                        <p className="text-xs font-bold text-stone-400 mt-1">部位: {recipe.part}</p>
                      </div>
                      <ChevronRight size={20} className="text-stone-300 group-hover:text-orange-400 transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="bg-white/50 border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center">
                    <p className="text-stone-400 font-bold">まだデータがありません</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ナビゲーション */}
      <nav className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white p-2 flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab('gacha')}
          className={cn(
            "flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all",
            activeTab === 'gacha' ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-stone-400 hover:text-stone-600"
          )}
        >
          <Sparkles size={20} />
          <span className="text-[10px] font-black">ガチャ</span>
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={cn(
            "flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all",
            activeTab === 'favorites' ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-stone-400 hover:text-stone-600"
          )}
        >
          <Heart size={20} fill={activeTab === 'favorites' ? "currentColor" : "none"} />
          <span className="text-[10px] font-black">お気に入り</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all",
            activeTab === 'history' ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-stone-400 hover:text-stone-600"
          )}
        >
          <History size={20} />
          <span className="text-[10px] font-black">履歴</span>
        </button>
      </nav>
    </div>
  );
}
