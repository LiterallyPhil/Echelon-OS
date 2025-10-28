import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import api from '@forge/api';
import { invoke } from '../utils/invoke';
import { getProductContext } from '../utils/context';
import type { FocusScore, TaskLoad, BurnoutRisk, TeamMetrics } from '../types/metrics';

interface Metrics {
  focusScore: number;
  taskLoad: {
    taskCount: number;
    totalStoryPoints: number;
  };
  burnoutRisk: {
    riskLevel: string;
    burnoutScore: number;
  };
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamMetrics, setTeamMetrics] = useState<any>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const { accountId } = await getProductContext();

      // Get all metrics
      const [focusData, taskData, burnoutData, teamData] = await Promise.all([
        invoke<FocusScore>('getFocusScore', { accountId }),
        invoke<TaskLoad>('getTaskLoad', { accountId }),
        invoke<BurnoutRisk>('getBurnoutRisk', { accountId }),
        invoke<TeamMetrics>('getTeamMetrics')
      ]);

      setMetrics({
        focusScore: focusData.focusScore,
        taskLoad: {
          taskCount: taskData.taskCount,
          totalStoryPoints: taskData.totalStoryPoints
        },
        burnoutRisk: {
          riskLevel: burnoutData.riskLevel,
          burnoutScore: burnoutData.burnoutScore
        }
      });

      setTeamMetrics(teamData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading metrics:', error);
      setLoading(false);
    }
  };

  // invoke and mock handled via utils/invoke

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ 
          fontSize: '18px', 
          color: '#009688',
          animation: 'pulse 2s infinite'
        }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <div style={{ padding: '40px' }}>Unable to load metrics</div>;
  }

  const focusColor = metrics.focusScore >= 70 ? '#009688' : metrics.focusScore >= 40 ? '#FFA726' : '#F44336';
  const burnoutColor = metrics.burnoutRisk.riskLevel === 'low' ? '#009688' : 
                       metrics.burnoutRisk.riskLevel === 'medium' ? '#FFA726' : '#F44336';

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fafafa',
      fontFamily: 'Inter, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#009688',
        color: 'white',
        padding: '20px 30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          🧠 Life OS Dashboard
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
          Team wellness & workload monitoring
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Key Metrics Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          
          {/* Focus Score Card */}
          <MetricCard
            title="Focus Score"
            value={metrics.focusScore}
            unit="%"
            color="#009688"
            icon="🎯"
            description="Your current ability to maintain concentration on tasks"
          />

          {/* Task Load Card */}
          <MetricCard
            title="Active Tasks"
            value={metrics.taskLoad.taskCount}
            unit=" tasks"
            color="#FFD700"
            icon="📋"
            description={`${metrics.taskLoad.totalStoryPoints} story points in progress`}
          />

          {/* Burnout Risk Card */}
          <MetricCard
            title="Burnout Risk"
            value={metrics.burnoutRisk.burnoutScore}
            unit="%"
            color={burnoutColor}
            icon="⚠️"
            description={`Risk level: ${metrics.burnoutRisk.riskLevel}`}
          />
        </div>

        {/* Team Overview */}
        {teamMetrics && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '30px'
          }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#1E1E1E', fontSize: '20px' }}>
              Team Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <StatBox label="Total Tasks" value={teamMetrics.totalIssues} color="#009688" />
              <StatBox label="High Priority" value={teamMetrics.highPriorityCount} color="#FFD700" />
              <StatBox label="Team Size" value={teamMetrics.teamSize} color="#009688" />
              <StatBox label="Avg per Member" value={teamMetrics.averageIssuesPerMember.toFixed(1)} color="#666" />
            </div>
          </div>
        )}

        {/* Daily Pulse Bar */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: `3px solid ${metrics.focusScore >= 70 ? '#009688' : '#FFD700'}`
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1E1E1E', fontSize: '18px' }}>
            Daily Pulse
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                height: '12px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${metrics.focusScore}%`,
                  background: metrics.focusScore >= 70 
                    ? 'linear-gradient(90deg, #009688 0%, #00BCD4 100%)'
                    : 'linear-gradient(90deg, #FFD700 0%, #FFA726 100%)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              color: metrics.focusScore >= 70 ? '#009688' : '#FFA726'
            }}>
              {metrics.focusScore}%
            </span>
          </div>
        </div>

        {/* Alert Banner */}
        {metrics.burnoutRisk.riskLevel === 'high' && (
          <div style={{
            backgroundColor: '#FFF9C4',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span style={{ fontSize: '32px' }}>⚠️</span>
            <div>
              <strong style={{ color: '#F57C00' }}>Burnout Alert</strong>
              <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                Your workload suggests high burnout risk. Consider discussing workload with your manager.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
  icon: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, color, icon, description }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderTop: `4px solid ${color}`,
    transition: 'transform 0.2s, box-shadow 0.2s'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <span style={{ fontSize: '32px' }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: '16px', color: '#666', fontWeight: '500' }}>{title}</h3>
    </div>
    <div style={{ fontSize: '48px', fontWeight: '700', color, marginBottom: '8px' }}>
      {value}{unit}
    </div>
    <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>{description}</p>
  </div>
);

interface StatBoxProps {
  label: string;
  value: number | string;
  color: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, color }) => (
  <div>
    <div style={{ fontSize: '14px', color: '#999', marginBottom: '6px' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '600', color }}>{value}</div>
  </div>
);

export const DashboardComponent = Dashboard;

// For Forge integration
export const renderDashboard = (container: HTMLElement) => {
  render(<Dashboard />, container);
};


