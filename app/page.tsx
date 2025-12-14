"use client";
import React, { useState } from 'react';
import { Sparkles, Utensils, RotateCw, ChefHat, BookOpen } from 'lucide-react';
import { recipes } from './data/recipes';

export default function ChickenGacha() {
  // <any> を付け足すことで「どんなデータが入っても文句言うな」という命令になります
const [result, setResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinGacha = () => {
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setResult(recipes[randomIndex]);
      setIsSpinning(false);
    }, 600);
  };

  return (
    // 背景：目に優しいクリーム〜ベージュ系のグラデーション
    <div className="min-h-screen bg-[#fdfbf7] relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* 背景の装飾（ふわっとした光の玉）- 透け感を出すために配置 */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* タイトル部分 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-stone-700 tracking-widest flex items-center justify-center gap-2">
            <Utensils className="text-orange-400" />
            鶏肉レシピ
          </h1>
          <p className="text-stone-400 text-xs mt-2 tracking-wider">TODAY'S CHICKEN RECIPE</p>
        </div>

        {/* メインカード：ここを透けさせる（Glassmorphism） */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/60">
          
          {/* ガチャ表示エリア */}
          <div className="p-8 text-center min-h-[340px] flex flex-col items-center justify-center">
            {isSpinning ? (
              <div className="flex flex-col items-center animate-pulse">
                <div className="text-5xl mb-4">🥣</div>
                <p className="text-stone-500 text-sm">メニューを考え中...</p>
              </div>
            ) : result ? (
              <div className="animate-in fade-in duration-700 w-full">
                
                {/* タグ */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/80 border border-orange-100 text-stone-600 rounded-full text-xs font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 料理名 */}
                <h2 className="text-2xl font-bold text-stone-800 mb-6 leading-relaxed">
                  {result.name}
                </h2>

                {/* 情報エリア */}
                <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-[260px] mx-auto">
                  <div className="bg-white/50 p-3 rounded-xl border border-white flex flex-col items-center">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">PART</span>
                    <span className="text-base font-bold text-stone-600">{result.part}</span>
                  </div>
                  <div className="bg-white/50 p-3 rounded-xl border border-white flex flex-col items-center">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">PAGE</span>
                    <span className="text-base font-bold text-stone-600">P.{result.page}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-stone-400 text-xs">
                   <BookOpen size={14} />
                   <span>本を開いて作ってみましょう</span>
                </div>
              </div>
            ) : (
              <div className="text-stone-400 flex flex-col items-center gap-3">
                 <div className="p-4 bg-white/50 rounded-full">
                    <ChefHat size={32} className="text-stone-300" />
                 </div>
                <p className="text-sm font-medium">
                  毎日の献立、<br/>迷ったらガチャにおまかせ。
                </p>
              </div>
            )}
          </div>

          {/* ボタンエリア */}
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