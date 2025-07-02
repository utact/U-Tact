"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { StarRating } from "./star-rating";
import type { Message } from "../types/message";

interface MessageFormProps {
  onAddMessage: (message: Omit<Message, "id" | "timestamp">) => void;
}

export function MessageForm({ onAddMessage }: MessageFormProps) {
  const [newMessage, setNewMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onAddMessage({
        content: newMessage.trim(),
        author: senderName.trim() || "익명의 방문자",
        rating: rating,
      });
      setNewMessage("");
      setSenderName("");
      setRating(5);
    }
  };

  return (
    <Card>
      <CardContent className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* upper section: star rating and character count */}
          <div className="flex justify-between items-center">
            <StarRating rating={rating} onRatingChange={setRating} />
            <span className="text-xs text-muted-foreground">
              {newMessage.length}/500
            </span>
          </div>

          {/* input area */}
          <div className="flex gap-3">
            <Textarea
              placeholder="개인적인 문의사항은 이곳이 아닌 이메일을 통해 남겨주세요."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 min-h-[60px] resize-none text-sm"
              maxLength={500}
            />
            <div className="w-24 space-y-2">
              <input
                type="text"
                placeholder="이름 (선택)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                maxLength={20}
              />
              <Button
                type="submit"
                disabled={!newMessage.trim()}
                size="sm"
                className="w-full"
              >
                <Send className="w-4 h-4 mr-1" />
                전송
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
