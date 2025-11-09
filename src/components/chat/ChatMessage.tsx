interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({role, content}: ChatMessageProps) => {
  return (
    <div
      className={`p-3 rounded-md overflow-wrap break-words whitespace-pre-wrap ${
        role === 'user' ? 'bg-blue-100 self-end text-left max-w-[85%]' : 'bg-gray-200 self-start text-left max-w-[95%]'
      }`}
    >
      {role === 'assistant' && (
        <>
          <span className='whitespace-pre-wrap font-medium text-sm capitalize'>{role}:</span>
          <br />
        </>
      )}
      {content}
    </div>
  );
};

export default ChatMessage;
