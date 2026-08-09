"use client"

interface ChatInputProps {
    apiUrl?: string;
    query?: Record<string, string>;
    name?: string;
    type?:"conversation"|"channel";
}



export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  return (
    <div className="bg-gray-200 dark:bg-[#202225] p-4">
     Chat Input
    </div>
  );
}