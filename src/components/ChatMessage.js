export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`mb-6 flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-400`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-[24px] p-6 shadow-sm ${
          isUser
            ? 'bg-[#f8fafc] text-slate-900 border border-slate-200/50 shadow-md ring-1 ring-black/[0.02]'
            : 'bg-white text-slate-900 shadow-lg border border-white/40'
        }`}
      >
        {isUser ? (
          <div className="space-y-1">
            <p className="font-bold text-[13px] uppercase tracking-wider text-slate-500">English:</p>
            <p className="text-[16px] md:text-[17px] font-medium leading-relaxed">{message}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="font-bold text-[13px] uppercase tracking-wider text-slate-500">In Marathi:</p>
              <p className="text-[16px] md:text-[17px] font-medium leading-relaxed">{message.marathi}</p>
            </div>
            <div className="space-y-1 pt-2">
              <p className="font-bold text-[13px] uppercase tracking-wider text-slate-500">In Hindi:</p>
              <p className="text-[16px] md:text-[17px] font-medium leading-relaxed">{message.hindi}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
