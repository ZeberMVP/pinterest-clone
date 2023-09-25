"use client";

import { toast } from "@/hooks/use-toast";
import { FC, useState } from "react";
import { Input } from "@/components/ui/Input";

interface CommentFormProps {
  pinId: string;
}

const CommentForm: FC<CommentFormProps> = ({ pinId }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/pin/comment", {
        method: "POST",
        body: JSON.stringify({ pinId, text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Posted",
        description: "Your comment was posted",
        variant: "default",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error posting your comment",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
    </form>
  );
};

export default CommentForm;
