"use client";

import { useState, useEffect } from "react";
import type { Message } from "../types/message";
import { formatTime } from "../utils/time";

interface MessageDisplayProps {
  messages: Message[];
}

export function MessageDisplay({ messages }: MessageDisplayProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="h-32 rounded-lg bg-card border flex items-center justify-center">
        <p className="text-muted-foreground">아직 메시지가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-28 overflow-hidden rounded-lg bg-card border">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`absolute inset-0 h-28 px-5 py-3 flex flex-col justify-center transition-transform duration-500 ease-in-out ${
              index === currentMessageIndex
                ? "translate-y-0"
                : index < currentMessageIndex
                ? "-translate-y-full"
                : "translate-y-full"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-primary">
                  {message.sender.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {message.sender}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < message.rating
                            ? "text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.sendTime)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* message indicators */}
      {messages.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentMessageIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
