import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import api from '@forge/api';

interface ReportData {
  title: string;
  completedCount: number;
  activeCount: number;
  completionRate: number;
  focusScore: number;
  estimatedHours: number;
  highPriorityCompleted: number;
  insights: string[];
  period: string;
}

const ConfluenceReport: React.FC = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      // In real implementation, this would call the Rovo action
      // For demo, using mock data
      setTimeout(() => {
        setReport({
          title: 'Weekly Focus Report',
          completedCount: 12,
          activeCount: 8,
          completionRate: 60,
          focusScore: 72,
          estimatedHours: 24,
          highPriorityCompleted: 5,
          insights: [
            '🚀 Great productivity! Completed 12 tasks this week.',
            '🎯 Excellent task management. Minimal work in progress.',
            '🔥 Excellent work on high-priority items!'
          ],
          period: '7 days'
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading report:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#009688' }}>Generating report...</div>
      </div>
    );
  }

  if (!report) {
    return <div style={{ padding: '40px' }}>No report data available</div>;
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      fontFamily: 'Inter, -apple-system, sans-serif',
      color: '#1E1E1E'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '3px solid #009688',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          color: '#009688',
          fontWeight: '700'
        }}>
          {report.title}
        </h1>
        <p style={{
          margin: '8px 0 0 0',
          color: '#666',
          fontSize: '14px'
        }}>
          Generated {generatedAt.toLocaleDateString()} at {generatedAt.toLocaleTimeString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          label="Tasks Completed"
          value={report.completedCount}
          color="#009688"
        />
        <StatCard
          label="Active Tasks"
          value={report.activeCount}
          color="#FFD700"
        />
        <StatCard
          label="Completion Rate"
          value={`${report.completionRate}%`}
          color={report.completionRate >= 60 ? '#009688' : '#FFA726'}
        />
        <StatCard
          label="Focus Score"
          value={`${report.focusScore}%`}
          color={report.focusScore >= 70 ? '#009688' : '#FFD700'}
        />
      </div>

      {/* Focus Score Visualization */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '30px',
        border: '2px solid #009688'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Focus Score</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{
              height: '24px',
              backgroundColor: '#e0e0e0',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${report.focusScore}%`,
                background: report.focusScore >= 70
                  ? 'linear-gradient(90deg, #009688 0%, #00BCD4 100%)'
                  : 'linear-gradient(90deg, #FFD700 0%, #FFA726 100%)'
              }} />
            </div>
          </div>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: report.focusScore >= 70 ? '#009688' : '#FFD700'
          }}>
            {report.focusScore}%
          </div>
        </div>
        <p style={{
          margin: '12px 0 0 0',
          color: '#666',
          fontSize: '14px'
        }}>
          Estimated focus time: {report.estimatedHours} hours | {report.highPriorityCompleted} high-priority tasks completed
        </p>
      </div>

      {/* Key Insights */}
      <div style={{
        backgroundColor: '#FFF9C4',
        border: '2px solid #FFD700',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '30px'
      }}>
        <h2 style={{
          margin: '0 0 16px 0',
          fontSize: '20px',
          color: '#F57C00'
        }}>
          ✨ Key Insights
        </h2>
        {report.insights.map((insight, index) => (
          <div
            key={index}
            style={{
              padding: '12px 0',
              borderBottom: index < report.insights.length - 1 ? '1px solid #FFE082' : 'none',
              fontSize: '16px',
              color: '#1E1E1E'
            }}
          >
            {insight}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div style={{
        backgroundColor: '#E0F2F1',
        borderLeft: '4px solid #009688',
        padding: '20px',
        borderRadius: '4px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#00695C' }}>
          💡 Recommendations
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#333' }}>
          <li>Continue your current pace - you're maintaining excellent productivity</li>
          <li>Keep focusing on high-priority tasks to maximize impact</li>
          <li>Consider mentoring team members on your task management approach</li>
        </ul>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#999',
        fontSize: '12px'
      }}>
        Report generated by Life OS • Powered by Rovo AI
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '36px',
      fontWeight: '700',
      color,
      marginBottom: '8px'
    }}>
      {value}
    </div>
    <div style={{
      fontSize: '14px',
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {label}
    </div>
  </div>
);

export const render = (container: HTMLElement) => {
  render(<ConfluenceReport />, container);
};


