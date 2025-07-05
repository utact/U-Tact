"use client";
import { MessageDisplay } from "./message-display";
import { MessageForm } from "./message-form";
import type { Message } from "../types/message";
import { Card, CardContent } from "@/components/ui/card";

interface MessageBoardProps {
  messages: Message[];
  onAddMessage: (message: Omit<Message, "id" | "sendTime">) => void;
}

export function MessageBoard({ messages, onAddMessage }: MessageBoardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex-1 mb-4">
          <MessageDisplay messages={messages} />
        </div>
        <div className="flex-shrink-0">
          <MessageForm onAddMessage={onAddMessage} />
        </div>
      </CardContent>
    </Card>
  );
}
