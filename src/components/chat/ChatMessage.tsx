'use client';

import Markdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({role, content}: ChatMessageProps) => {
  return (
    <div
      className={`p-3 rounded-md break-words ${
        role === 'user' ? 'bg-blue-100 self-end max-w-[85%]' : 'bg-gray-100 self-start max-w-[95%]'
      }`}
    >
      {role === 'assistant' && (
        <>
          <span className='font-medium text-sm capitalize'>{role}:</span>
          <br />
        </>
      )}
      <div className='prose prose-sm max-w-none'>
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
};

export default ChatMessage;
