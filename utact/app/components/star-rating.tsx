"use client";

import { useState } from "react";
import { Toast } from "./toast";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRatingClick = (star: number) => {
    if (star < 5) {
      setShowToast(true);

      // start resetting animation
      setIsResetting(true);
      onRatingChange(0);

      // fully reset after 1 second
      setTimeout(() => {
        onRatingChange(5);
        setTimeout(() => {
          setIsResetting(false);
        }, 500);
      }, 1000);

      // hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      onRatingChange(star);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className={`text-lg transition-all duration-300 ${
              star <= rating
                ? isResetting
                  ? "text-yellow-400 animate-pulse scale-110"
                  : "text-yellow-400 hover:text-yellow-500"
                : "text-muted-foreground/30 hover:text-yellow-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <Toast show={showToast} message="별점을 왜 낮추세요?" />
    </div>
  );
}
