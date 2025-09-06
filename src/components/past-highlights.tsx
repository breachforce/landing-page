"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Play, Pause, Calendar, Users } from "lucide-react";
import Image from "./ui/SafeImage";
import highlightsData from "../data/highlights.json";

interface Highlight {
  caption: string;
  postUrl: string;
  thumbnailUrl: string;
  imageUrls: string[];
}

const highlights = highlightsData as Highlight[];

export default function PastHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const itemsPerView = { mobile: 1, tablet: 2, desktop: 4 };

  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.desktop;
    if (window.innerWidth < 768) return itemsPerView.mobile;
    if (window.innerWidth < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => setCurrentItemsPerView(getItemsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, highlights.length - currentItemsPerView);

  useEffect(() => {
    if (isAutoPlaying && !isHovered && !selectedHighlight) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isAutoPlaying, isHovered, selectedHighlight, maxIndex]);

  const goToSlide = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  const goToPrev = () => setCurrentIndex((p) => (p > 0 ? p - 1 : maxIndex));
  const goToNext = () => setCurrentIndex((p) => (p < maxIndex ? p + 1 : 0));

  const openModal = (h: Highlight) => {
    setSelectedHighlight(h);
    setSelectedImageIndex(0);
    setIsAutoPlaying(false);
  };
  const closeModal = () => {
    setSelectedHighlight(null);
    setIsAutoPlaying(true);
  };
  const goToNextImage = () =>
    selectedHighlight &&
    setSelectedImageIndex((p) => (p < selectedHighlight.imageUrls.length - 1 ? p + 1 : 0));
  const goToPrevImage = () =>
    selectedHighlight &&
    setSelectedImageIndex((p) => (p > 0 ? p - 1 : selectedHighlight.imageUrls.length - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedHighlight) {
        if (e.key === "ArrowLeft") goToPrevImage();
        if (e.key === "ArrowRight") goToNextImage();
        if (e.key === "Escape") closeModal();
      } else {
        if (e.key === "ArrowLeft") goToPrev();
        if (e.key === "ArrowRight") goToNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedHighlight]);

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#101012" }}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-gray-200 text-sm font-semibold mb-8 backdrop-blur-sm shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
            <Calendar className="w-4 h-4" />
            Community Events & Workshops
          </div>

          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
            Past Highlights
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Dive into our cybersecurity journey through immersive workshops, expert-led sessions, and hands-on learning
            experiences
          </p>
        </div>

        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 hover:from-gray-700/90 hover:to-gray-600/90 border border-gray-600/50 hover:border-blue-500/50 rounded-2xl text-white hover:text-blue-100 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 hover:scale-105"
            >
              {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="font-medium">{isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span className="font-medium">
                Showing {currentIndex + 1}-{Math.min(currentIndex + currentItemsPerView, highlights.length)} of{" "}
                {highlights.length} events
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="group p-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 hover:from-blue-600/20 hover:to-purple-600/20 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-600/50 hover:border-blue-500/50 rounded-2xl text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className="group p-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 hover:from-blue-600/20 hover:to-purple-600/20 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-600/50 hover:border-blue-500/50 rounded-2xl text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg disabled:hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl py-8 px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / currentItemsPerView)}%)`,
              width: `${(highlights.length / currentItemsPerView) * 100}%`,
            }}
          >
            {highlights.map((highlight, index) => (
              <div key={index} className="flex-shrink-0 px-3" style={{ width: `${100 / highlights.length}%` }}>
                <div
                  onClick={() => openModal(highlight)}
                  className="group relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-700/40 hover:border-blue-500/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 h-[340px] flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                    <Image
                      src={highlight.thumbnailUrl || "/placeholder.svg"}
                      alt={highlight.caption}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/10">
                      {highlight.imageUrls.length} photos
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white text-lg font-bold mb-2">View Gallery</div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
                      {highlight.caption}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-400 text-sm">Click to explore</span>
                      <div className="p-1.5 bg-gray-800/60 group-hover:bg-blue-600/30 rounded-lg transition-all duration-300">
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-1.5">
          {(() => {
            const totalDots = maxIndex + 1;
            const maxVisibleDots = Math.min(7, totalDots);

            if (totalDots <= maxVisibleDots) {
              return Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 ease-out ${index === currentIndex ? "w-12 h-2" : "w-2 h-2 hover:w-6"}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-md shadow-blue-500/30"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                </button>
              ));
            } else {
              let startIndex = Math.max(0, currentIndex - 3);
              const endIndex = Math.min(totalDots - 1, startIndex + maxVisibleDots - 1);

              if (endIndex - startIndex < maxVisibleDots - 1) {
                startIndex = Math.max(0, endIndex - maxVisibleDots + 1);
              }

              return Array.from({ length: endIndex - startIndex + 1 }).map((_, i) => {
                const index = startIndex + i;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative transition-all duration-300 ease-out ${index === currentIndex ? "w-12 h-2" : "w-2 h-2 hover:w-6"}`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                        index === currentIndex
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-md shadow-blue-500/30"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    />
                  </button>
                );
              });
            }
          })()}
        </div>
      </div>

      {selectedHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900/95 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{selectedHighlight.caption}</h3>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="text-sm">
                    {selectedImageIndex + 1} of {selectedHighlight.imageUrls.length}
                  </span>
                  <a
                    href={selectedHighlight.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-200 hover:text-white transition-all duration-300 text-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    LinkedIn Post
                  </a>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="relative bg-gray-900 flex items-center justify-center" style={{ height: "65vh" }}>
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={selectedHighlight.imageUrls[selectedImageIndex] || "/placeholder.svg"}
                    alt={`${selectedHighlight.caption} - Image ${selectedImageIndex + 1}`}
                    width={1000}
                    height={600}
                    className="object-contain max-w-full max-h-full rounded-lg"
                    sizes="90vw"
                  />
                </div>

                {selectedHighlight.imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/80 hover:bg-black/90 text-white rounded-full transition-all duration-300 border border-white/20"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/80 hover:bg-black/90 text-white rounded-full transition-all duration-300 border border-white/20"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {selectedHighlight.imageUrls.length > 1 && (
                <div className="p-3 border-t border-gray-700/50 bg-gray-800/30">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedHighlight.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === selectedImageIndex ? "border-blue-500 scale-105" : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        <Image src={url || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}