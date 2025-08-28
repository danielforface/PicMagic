/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { UploadIcon, MagicWandIcon, PaletteIcon, SunIcon, SpinnerIcon } from './icons';
import { improvePrompt } from '../services/geminiService';

interface StartScreenProps {
  onFileSelect: (files: FileList | null) => void;
  onGenerateFromPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onFileSelect, onGenerateFromPrompt, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'generate'>('upload');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);

  const styles = [
    // Original
    { name: 'Photorealistic', suffix: ', photorealistic, 8k, sharp focus, detailed, professional photography' },
    { name: 'Cinematic', suffix: ', cinematic lighting, wide shot, movie still, dramatic atmosphere' },
    { name: 'Illustration', suffix: ', digital illustration, vibrant colors, detailed, artstation' },
    { name: 'Anime', suffix: ', in a vibrant anime style, cinematic lighting, by studio ghibli' },
    { name: 'Fantasy Art', suffix: ', fantasy art, epic, detailed, concept art, lord of the rings style' },
    { name: 'Watercolor', suffix: ', watercolor painting, soft edges, pastel colors, artistic' },
    { name: 'Pixel Art', suffix: ', 8-bit pixel art, retro video game style, vibrant palette' },
    { name: 'Minimalist', suffix: ', minimalist, simple, clean lines, flat colors, vector art' },
    { name: 'Cyberpunk', suffix: ', cyberpunk city, neon lights, futuristic, dystopian, blade runner style' },
    { name: "Vintage Photo", suffix: ', vintage photograph, 1950s, sepia tones, grainy film' },
    { name: 'Comic Book', suffix: ', comic book art, bold outlines, halftone dots, pop art' },
    { name: '3D Render', suffix: ', 3d render, octane render, trending on artstation, hyperrealistic' },
    // New
    { name: 'Art Deco', suffix: ', art deco style, geometric patterns, bold lines, luxurious, 1920s glamour' },
    { name: 'Bohemian', suffix: ', bohemian style, eclectic, layered textiles, earthy tones, free-spirited' },
    { name: 'Mid-Century Modern', suffix: ', mid-century modern style, clean lines, organic shapes, minimalist, 1950s and 1960s design' },
    { name: 'Scandinavian', suffix: ', scandinavian design, minimalism, functionality, light colors, natural materials, hygge' },
    { name: 'Eclectic', suffix: ', eclectic style, high-energy, mixing styles and periods, curated collection, unexpected elements' },
    { name: 'Farmhouse', suffix: ', modern farmhouse style, rustic charm, cozy, warm, shiplap, neutral colors' },
    { name: 'Contemporary', suffix: ', contemporary style, clean lines, simple color palette, uncluttered, of the moment' },
    { name: 'Traditional', suffix: ', traditional design, classic details, plush furnishings, ornate, timeless elegance' },
    { name: 'Industrial', suffix: ', industrial style, raw materials, exposed brick, metal pipes, warehouse look' },
    { name: 'Transitional', suffix: ', transitional style, blend of traditional and modern, classic and timeless, sophisticated' },
    { name: 'Coastal', suffix: ', coastal style, beachy vibe, light and airy, natural light, nautical elements, shades of blue and white' },
    { name: 'Rustic', suffix: ', rustic style, natural, rough, aged, organic, wood and stone textures' },
    { name: 'French Country', suffix: ', french country style, warm and elegant, rustic farmhouse look, soft colors, ornate details' },
    { name: 'Modern', suffix: ', modern design, sleek, clean lines, simple color palette, metal and glass materials' },
    { name: 'Regency', suffix: ', regency style, opulent, dramatic colors, gold accents, luxurious fabrics, classic glamour' },
    { name: 'Shabby Chic', suffix: ', shabby chic style, vintage-inspired, distressed furniture, soft pastel colors, feminine and romantic' },
    { name: 'Japandi', suffix: ', japandi style, fusion of japanese and scandinavian design, minimalist, natural elements, muted colors, tranquil' },
    { name: 'Hollywood Glam', suffix: ', hollywood glam style, luxurious, over-the-top, dramatic, velvets and metallics' },
    { name: 'Maximalist', suffix: ', maximalist style, more is more, bold patterns, rich colors, eclectic mix, highly decorated' },
    { name: 'Mediterranean', suffix: ', mediterranean style, coastal italian or greek villa, earthy colors, terracotta, blue accents, wrought iron' },
    { name: 'Organic Modern', suffix: ', organic modern style, nature-inspired, minimalist, warm neutral palette, natural materials, soft textures' },
    { name: 'Asian Zen', suffix: ', asian zen design, minimalist, tranquility, harmony with nature, bamboo, stone, water elements, peaceful' },
  ];

  const settings = [
    { name: 'Stylized Realism', suffix: ', stylized realism, blending reality with imagination' },
    { name: 'Character Focus', suffix: ', with a strong emphasis on detailed and expressive character design' },
    { name: 'Rich Environment', suffix: ', featuring rich environmental detail and a lush, immersive background' },
    { name: 'Visual Storytelling', suffix: ', conveying a strong sense of visual storytelling and narrative' },
    { name: 'Appealing Aesthetics', suffix: ', with highly appealing aesthetics, beautiful composition, and harmonious colors' },
    { name: 'Tech Innovation', suffix: ', showcasing technological innovation and futuristic concepts' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    let finalPrompt = prompt;
    const style = styles.find(s => s.name === selectedStyle);
    if (style) {
      finalPrompt += style.suffix;
    }
    const setting = settings.find(s => s.name === selectedSetting);
    if (setting) {
      finalPrompt += setting.suffix;
    }

    onGenerateFromPrompt(finalPrompt);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    onFileSelect(e.target.files);
  };

  const handleImprovePrompt = async () => {
    if (!prompt.trim() || isLoading || isImprovingPrompt) return;
    setIsImprovingPrompt(true);
    try {
      const improved = await improvePrompt(prompt);
      setPrompt(improved);
    } catch (err) {
      console.error("Failed to improve prompt:", err);
      // Future enhancement: show an error toast to the user.
    } finally {
      setIsImprovingPrompt(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (activeTab === 'upload') {
        setIsDraggingOver(true);
    }
  };

  const handleDragLeave = () => {
    if (activeTab === 'upload') {
        setIsDraggingOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (activeTab === 'upload') {
        setIsDraggingOver(false);
        if (isLoading) return;
        onFileSelect(e.dataTransfer.files);
    }
  };


  return (
    <div 
      className="w-full max-w-5xl mx-auto text-center p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl md:text-7xl">
          AI Photo Editor & Creator
        </h1>
        <p className="max-w-3xl text-lg text-gray-400 md:text-xl">
          Edit your photos with professional, AI-powered tools or create entirely new images from a simple text description.
        </p>

        <div className="w-full max-w-md mx-auto bg-gray-800/80 border border-gray-700/80 rounded-full p-1.5 flex items-center gap-2 backdrop-blur-sm mt-4">
            <button
                onClick={() => setActiveTab('upload')}
                className={`w-1/2 rounded-full py-3 text-lg font-semibold transition-all duration-300 ease-in-out ${
                    activeTab === 'upload' 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
            >
                Upload & Edit
            </button>
            <button
                onClick={() => setActiveTab('generate')}
                className={`w-1/2 rounded-full py-3 text-lg font-semibold transition-all duration-300 ease-in-out ${
                    activeTab === 'generate' 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
            >
                Create with AI
            </button>
        </div>
        
        <div className="w-full max-w-3xl mt-4 min-h-[450px]">
            {activeTab === 'upload' && (
                <div 
                    className={`w-full h-full flex flex-col items-center justify-center p-12 transition-all duration-300 rounded-2xl border-2 animate-fade-in ${isDraggingOver ? 'bg-blue-500/10 border-dashed border-blue-400 scale-105' : 'bg-black/20 border-gray-700/50'}`}
                >
                    <div className="flex flex-col items-center gap-4">
                        <label htmlFor="image-upload-start" className={`relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full group transition-colors ${isLoading ? 'cursor-not-allowed bg-blue-800' : 'cursor-pointer hover:bg-blue-500'}`}>
                            <UploadIcon className="w-6 h-6 mr-3 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110" />
                            Upload an Image
                        </label>
                        <input id="image-upload-start" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
                        <p className="text-sm text-gray-500">or drag and drop a file anywhere</p>
                    </div>
                </div>
            )}

            {activeTab === 'generate' && (
                <form onSubmit={handleGenerate} className="w-full flex flex-col gap-4 animate-fade-in">
                    <div className="relative w-full">
                      <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g., A majestic lion wearing a crown, on a throne in a cosmic nebula"
                          className="flex-grow bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-5 pr-16 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full min-h-[100px] resize-none disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={isLoading}
                          rows={3}
                          aria-label="Image generation prompt"
                      />
                      <button
                          type="button"
                          onClick={handleImprovePrompt}
                          disabled={isLoading || isImprovingPrompt || !prompt.trim()}
                          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 transition-all duration-200 ease-in-out hover:bg-blue-500/20 hover:text-blue-300 disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Improve Prompt"
                          title="Improve Prompt"
                      >
                          {isImprovingPrompt ? <SpinnerIcon className="w-6 h-6" /> : <MagicWandIcon className="w-6 h-6" />}
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="text-sm font-medium text-gray-400 mr-2">Style:</span>
                            {styles.map(({ name }) => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setSelectedStyle(prev => prev === name ? null : name)}
                                    disabled={isLoading}
                                    className={`px-4 py-2 rounded-md text-base font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 ${
                                        selectedStyle === name 
                                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20' 
                                        : 'bg-white/10 hover:bg-white/20 text-gray-200'
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="text-sm font-medium text-gray-400 mr-2">Focus:</span>
                            {settings.map(({ name }) => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setSelectedSetting(prev => prev === name ? null : name)}
                                    disabled={isLoading}
                                    className={`px-4 py-2 rounded-md text-base font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 ${
                                        selectedSetting === name 
                                        ? 'bg-gradient-to-br from-indigo-600 to-purple-500 text-white shadow-md shadow-indigo-500/20' 
                                        : 'bg-white/10 hover:bg-white/20 text-gray-200'
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>


                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-green-800 disabled:to-green-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none mt-2"
                        disabled={isLoading || !prompt.trim()}
                    >
                        Generate Image
                    </button>
                </form>
            )}
        </div>
        
        <div className="mt-12 w-full">
            <h2 className="text-3xl font-bold text-gray-200 mb-6">Powerful Editing Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <MagicWandIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Precise Retouching</h3>
                    <p className="mt-2 text-gray-400">Click any point on your image to remove blemishes, change colors, or add elements with pinpoint accuracy.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <PaletteIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Creative Filters</h3>
                    <p className="mt-2 text-gray-400">Transform photos with artistic styles. From vintage looks to futuristic glows, find or create the perfect filter.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <SunIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Pro Adjustments</h3>
                    <p className="mt-2 text-gray-400">Enhance lighting, blur backgrounds, or change the mood. Get studio-quality results without complex tools.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;