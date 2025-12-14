"use client";
import React, { useState } from 'react';
import { Sparkles, Utensils, RotateCw, ChefHat, BookOpen, ScrollText, Camera } from 'lucide-react';
import { recipes } from './data/recipes';

export default function ChickenGacha() {
  const [result, setResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // 画像が存在するかどうかのチェック用
  const [imageExists, setImageExists] = useState(true);

  const spinGacha = () => {
    setIsSpinning(true);
    setResult(null);
    // ガチャを回すたびに、一旦「画像はある」という前提にリセット
    setImageExists(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      // 安全策：データがない場合は1番目を表示
      const selectedRecipe = recipes[randomIndex] || recipes[0];
      setResult(selectedRecipe);
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* 背景装飾 */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* タイトル */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-stone-700 tracking-widest flex items-center justify-center gap-2">
            <Utensils className="text-orange-400" />
            鶏肉レシピ
          </h1>
          <p className="text-stone-400 text-xs mt-2 tracking-wider">TODAY'S CHICKEN RECIPE</p>
        </div>

        {/* メインカード */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/60">
          
          <div className="p-8 text-center min-h-[340px] flex flex-col items-center justify-center">
            {isSpinning ? (
              <div className="flex flex-col items-center animate-pulse">
                <div className="text-5xl mb-4">🥣</div>
                <p className="text-stone-500 text-sm">メニューを考え中...</p>
              </div>
            ) : result ? (
              <div className="animate-in fade-in duration-700 w-full text-left">
                
                {/* ヘッダー情報 */}
                <div className="text-center mb-6">
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {result.tags?.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/80 border border-orange-100 text-stone-600 rounded-full text-xs font-medium shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold text-stone-800 mb-2 leading-relaxed">
                    {result.name}
                  </h2>
                  
                  <div className="flex justify-center gap-4 text-sm text-stone-500 mb-4">
                     <span>部位: {result.part}</span>
                     <span>/</span>
                     <span>P.{result.page}</span>
                  </div>

                  {/* ★★★ 画像表示エリア ★★★ */}
                  <div className="relative w-full h-56 mb-6 rounded-xl overflow-hidden shadow-md bg-orange-50 flex items-center justify-center group">
                    <img 
                      src={`/images/${result.id}.jpg`} 
                      alt={result.name}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageExists ? 'opacity-100' : 'opacity-0'}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        setImageExists(false);
                      }}
                      onLoad={() => setImageExists(true)}
                    />
                    {/* 画像がない時に表示されるアイコン */}
                    {!imageExists && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300">
                            <Camera size={40} className="mb-2 opacity-50"/>
                            <span className="text-xs">No Image</span>
                        </div>
                    )}
                  </div>

                </div>

                {/* 詳細エリア */}
                <div className="bg-white/50 rounded-xl p-5 border border-white/60 space-y-6 max-h-[400px] overflow-y-auto shadow-inner">
                  
                  {/* 材料リスト（見やすく整形済み） */}
                  {result.materials && (
                    <div>
                      <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-sm border-b-2 border-orange-100 pb-1">
                        <ChefHat size={18}/> 材料
                      </h3>
                      <ul className="space-y-2">
                        {result.materials.split('、').map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-stone-700 bg-white/60 p-2 rounded-lg">
                            <span className="text-orange-400 font-bold shrink-0 mt-[1px]">・</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 作り方 */}
                  {result.steps && (
                    <div>
                      <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-sm border-b-2 border-orange-100 pb-1">
                        <ScrollText size={18}/> 作り方
                      </h3>
                      <div className="space-y-4">
                        {result.steps.map((step: string, index: number) => (
                          <div key={index} className="flex gap-3 text-sm text-stone-700">
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                              {index + 1}
                            </div>
                            <p className="leading-relaxed pt-[2px]">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!result.materials && (
                     <div className="text-center py-4 text-stone-400 text-xs">
                        <BookOpen className="mx-auto mb-2" size={20}/>
                        <p>詳しい作り方は本を見てね！</p>
                     </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-stone-400 flex flex-col items-center gap-3">
                 <div className="p-4 bg-white/50 rounded-full">
                    <ChefHat size={32} className="text-stone-300" />
                 </div>
                <p className="text-sm font-medium">
                  今日は何を作ろう？<br/>ボタンを押して35品から選ぶ
                </p>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/40 border-t border-white/40">
            <button
              onClick={spinGacha}
              disabled={isSpinning}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3 text-lg tracking-wide disabled:opacity-50"
            >
              {result ? <RotateCw size={20} /> : <Sparkles size={20} />}
              {result ? "もう一度選ぶ" : "レシピを決める"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}