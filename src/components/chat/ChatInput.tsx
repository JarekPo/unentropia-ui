import {Button} from '../ui/button';
import Textarea from '../ui/textarea';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput = ({message, setMessage, onSend, isLoading}: ChatInputProps) => (
  <div className='flex flex-col w-full max-w-2xl p-2 border rounded-md'>
    <Textarea
      placeholder='Ask me anything...'
      className='w-full resize-y overflow-auto'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
    />
    <div className='flex justify-end mt-2'>
      <Button variant='outline' onClick={onSend} disabled={isLoading} className='w-full sm:w-auto'>
        Send Message
      </Button>
    </div>
  </div>
);

export default ChatInput;
