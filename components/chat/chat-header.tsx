"use client";
import {Hash} from "lucide-react";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}


const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
    return (  
        <div className=" sticky text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 ">
            {type === "channel" && <Hash className="h-5 w-5 mr-2" />}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-8 w-8 rounded-full mr-2"
                />
            )}
            {name}
        </div>
    );
}
 
export default ChatHeader;