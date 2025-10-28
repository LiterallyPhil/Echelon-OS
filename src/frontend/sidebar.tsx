import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import api from '@forge/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const RovoAgentSidebar: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Life OS assistant. Ask me about your focus score, task load, or team wellness metrics.',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate Rovo agent response
    setTimeout(() => {
      const response = generateResponse(inputText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const generateResponse = (input: string): string => {
    const lower = input.toLowerCase();

    if (lower.includes('focus') || lower.includes('score')) {
      return 'Your current Focus Score is 72%. This is calculated based on your active tasks (8 tasks), completion rate (12 tasks completed this week), and priority distribution. To improve: try reducing context switching and focus on 2-3 high-priority tasks at a time.';
    }

    if (lower.includes('burnout') || lower.includes('risk')) {
      return 'Your burnout risk is currently MEDIUM (45%). I\'ve detected 32 issues updated in the last 30 days with 28 total comments. Recommendations: 1) Schedule focus blocks, 2) Delegate 2-3 tasks if possible, 3) Take regular breaks between deep work sessions.';
    }

    if (lower.includes('task') || lower.includes('load') || lower.includes('workload')) {
      return 'You currently have 8 active tasks with 21 story points in progress. This is manageable. Your average sprint load is 8 tasks. Pro tip: Try to limit work-in-progress to max 3 tasks for optimal focus.';
    }

    if (lower.includes('team') || lower.includes('wellness')) {
      return 'Team Overview: 45 total tasks, 8 high priority items, 6 team members. Average of 7.5 tasks per member. The team looks balanced, but 2 members are approaching their capacity. Suggest a "no-meeting day" to allow deep focus.';
    }

    if (lower.includes('suggest') || lower.includes('improve')) {
      return 'Based on your metrics, here are 3 wellness actions:\n1. Block 2 hours daily for high-priority tasks (your current high-priority count: 2)\n2. Reduce context switching - finish one task before starting another\n3. Schedule a 15-min break every 90 minutes to maintain focus';
    }

    if (lower.includes('help') || lower.includes('what can you')) {
      return 'I can help you with:\n• Focus Score analysis\n• Burnout risk assessment\n• Task load optimization\n• Team wellness insights\n• Personalized wellness recommendations\n\nJust ask me any question!';
    }

    return 'I understand you\'re asking about productivity and wellness. To give you specific insights, try asking about:\n• "What\'s my focus score?"\n• "How\'s my burnout risk?"\n• "Show me team wellness metrics"\n• "Suggest wellness improvements"';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#FAFAFA',
      fontFamily: 'Inter, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#009688',
        color: 'white',
        padding: '16px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🧠</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Life OS Assistant</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Powered by Rovo AI</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}
          >
            <div style={{
              backgroundColor: message.sender === 'user' ? '#009688' : 'white',
              color: message.sender === 'user' ? 'white' : '#1E1E1E',
              padding: '12px 16px',
              borderRadius: message.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap'
            }}>
              {message.text}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999',
              marginTop: '4px',
              paddingLeft: '12px'
            }}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '16px 16px 16px 0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ animation: 'bounce 1.4s infinite' }}>💭</span>
                <span style={{ animation: 'bounce 1.4s 0.2s infinite' }}>💭</span>
                <span style={{ animation: 'bounce 1.4s 0.4s infinite' }}>💭</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about focus, burnout, tasks..."
          style={{
            flex: 1,
            padding: '10px 14px',
            border: '1px solid #e0e0e0',
            borderRadius: '20px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#009688',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600',
            opacity: (!inputText.trim() || isLoading) ? 0.5 : 1
          }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-10px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export const render = (container: HTMLElement) => {
  render(<RovoAgentSidebar />, container);
};


