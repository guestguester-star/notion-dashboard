'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [projects, setProjects] = useState([
    { id: 1, name: '官網改版', status: '進行中', progress: 65, owner: 'Alice', date: '2026-08-31' },
    { id: 2, name: '行動應用開發', status: '進行中', progress: 45, owner: 'Bob', date: '2026-09-30' },
    { id: 3, name: 'AI功能集成', status: '規劃中', progress: 20, owner: 'Charlie', date: '2026-10-15' },
    { id: 4, name: '資料庫遷移', status: '完成', progress: 100, owner: 'David', date: '2026-06-01' },
    { id: 5, name: '性能優化', status: '暫停', progress: 30, owner: 'Eve', date: '2026-11-30' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, name: '設計首頁UI', status: '完成', project: '官網改版', dueDate: '2026-06-15', owner: 'Alice', priority: 'high' },
    { id: 2, name: '前端開發', status: '進行中', project: '官網改版', dueDate: '2026-07-15', owner: 'Bob', priority: 'high' },
    { id: 3, name: 'API整合', status: '進行中', project: '行動應用開發', dueDate: '2026-07-20', owner: 'Charlie', priority: 'medium' },
    { id: 4, name: '測試框架建立', status: '未開始', project: '行動應用開發', dueDate: '2026-08-01', owner: 'David', priority: 'medium' },
    { id: 5, name: '模型訓練', status: '進行中', project: 'AI功能集成', dueDate: '2026-09-15', owner: 'Eve', priority: 'high' },
  ]);

  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setLoading(false);
    }, 500);
  };

  const stats = {
    totalProjects: projects.length,
    inProgressProjects: projects.filter(p => p.status === '進行中').length,
    completedProjects: projects.filter(p => p.status === '完成').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === '完成').length,
    overdueTasks: 2,
    completionRate: Math.round((tasks.filter(t => t.status === '完成').length / tasks.length) * 100),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 頂部導航 */}
      <div className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <h1 className="text-2xl font-bold text-white">公司專案儀表板</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-400">
                最後更新: {lastUpdate.toLocaleTimeString('zh-TW')}
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                {loading ? '更新中...' : '立即刷新'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 標籤頁導航 */}
      <div className="bg-slate-850 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: '📈 儀表板' },
              { id: 'projects', label: '📋 專案列表' },
              { id: 'tasks', label: '✓ 任務看板' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI 卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="總專案數" value={stats.totalProjects} icon={<Calendar size={24} />} color="blue" />
              <StatCard title="進行中" value={stats.inProgressProjects} icon={<Clock size={24} />} color="yellow" />
              <StatCard title="已完成" value={stats.completedProjects} icon={<CheckCircle size={24} />} color="green" />
              <StatCard title="逾期任務" value={stats.overdueTasks} icon={<AlertCircle size={24} />} color="red" />
            </div>

            {/* 統計信息 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">任務進度</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-300">完成率</span>
                    <span className="text-sm font-semibold text-green-400">{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">所有專案</h2>
            {projects.map(project => (
              <div key={project.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-slate-400">負責人: {project.owner}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.status === '進行中' ? 'bg-blue-500/20 text-blue-300' :
                    project.status === '完成' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">進度</span>
                    <span className="text-white font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">任務看板</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '未開始', status: '未開始', color: 'red' },
                { title: '進行中', status: '進行中', color: 'blue' },
                { title: '已完成', status: '完成', color: 'green' },
              ].map(column => (
                <div key={column.status} className="space-y-3">
                  <h3 className="font-semibold text-white">
                    {column.title} ({tasks.filter(t => t.status === column.status).length})
                  </h3>
                  <div className="bg-slate-800 rounded-lg p-4 min-h-96 space-y-3 border border-slate-700">
                    {tasks.filter(t => t.status === column.status).map(task => (
                      <div key={task.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                        <h4 className="font-medium text-white mb-2">{task.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="text-slate-400">{task.project}</div>
                          <div className="text-slate-500">截止: {task.dueDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className={`rounded-xl p-6 border backdrop-blur-sm ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
    </div>
  );
}
