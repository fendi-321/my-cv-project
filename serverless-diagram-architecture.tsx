import React from 'react';

const VisitorCounterArchitecture = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <svg viewBox="0 0 900 600" className="w-full h-auto max-w-4xl mx-auto">
        <defs>
          <linearGradient id="awsCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          <linearGradient id="lambdaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9900" />
            <stop offset="100%" stopColor="#c77700" />
          </linearGradient>
          <linearGradient id="dynamoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b48cc" />
            <stop offset="100%" stopColor="#2d3a9e" />
          </linearGradient>
          <linearGradient id="cloudwatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e7157b" />
            <stop offset="100%" stopColor="#b8125f" />
          </linearGradient>
          <linearGradient id="terraformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7b42bc" />
            <stop offset="100%" stopColor="#5c3198" />
          </linearGradient>
          
          <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
          <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff9900" />
          </marker>
          <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
          </marker>
          <marker id="arrowPink" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e7157b" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="900" height="600" fill="#0f172a" />

        {/* Title */}
        <text x="450" y="35" fill="#f8fafc" fontSize="20" fontWeight="bold" textAnchor="middle">🏗️ Visitor Counter Architecture</text>
        <text x="450" y="55" fill="#64748b" fontSize="12" textAnchor="middle">Serverless Architecture on AWS</text>

        {/* User/Browser Section */}
        <rect x="40" y="200" width="160" height="140" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="120" y="235" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">👤 User Browser</text>
        
        {/* Browser icon representation */}
        <rect x="70" y="250" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        <rect x="75" y="255" width="90" height="12" rx="2" fill="#334155" />
        <circle cx="82" cy="261" r="3" fill="#ef4444" />
        <circle cx="92" cy="261" r="3" fill="#eab308" />
        <circle cx="102" cy="261" r="3" fill="#22c55e" />
        <text x="120" y="295" fill="#94a3b8" fontSize="9" textAnchor="middle">maffindi.html</text>
        
        <text x="120" y="330" fill="#67e8f9" fontSize="9" fontFamily="monospace" textAnchor="middle">fetch() API call</text>

        {/* AWS Cloud Boundary */}
        <rect x="260" y="80" width="600" height="460" rx="15" fill="url(#awsCloudGrad)" stroke="#ff9900" strokeWidth="2" strokeDasharray="8,4" />
        <text x="280" y="108" fill="#ff9900" fontSize="14" fontWeight="bold">☁️ AWS Cloud</text>
        <text x="280" y="125" fill="#fcd34d" fontSize="10">Region: ap-southeast-1</text>

        {/* Lambda Function URL */}
        <rect x="300" y="200" width="180" height="100" rx="10" fill="#1e1e2e" stroke="#ff9900" strokeWidth="2" />
        <rect x="315" y="215" width="40" height="40" rx="6" fill="url(#lambdaGrad)" />
        <text x="335" y="242" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">λ</text>
        <text x="410" y="235" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Lambda</text>
        <text x="410" y="250" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Function URL</text>
        <text x="390" y="275" fill="#a3a3a3" fontSize="8" textAnchor="middle">visitor_counter.py</text>
        <text x="390" y="290" fill="#67e8f9" fontSize="7" fontFamily="monospace" textAnchor="middle">*.lambda-url.ap-southeast-1.on.aws</text>

        {/* DynamoDB */}
        <rect x="560" y="150" width="170" height="120" rx="10" fill="#1e1e2e" stroke="#3b48cc" strokeWidth="2" />
        <rect x="580" y="170" width="40" height="40" rx="6" fill="url(#dynamoGrad)" />
        <text x="600" y="197" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">📊</text>
        <text x="680" y="190" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">DynamoDB</text>
        <text x="645" y="225" fill="#a3a3a3" fontSize="9" textAnchor="middle">Table: visitor_count</text>
        <text x="645" y="242" fill="#67e8f9" fontSize="8" fontFamily="monospace" textAnchor="middle">PK: id</text>
        <text x="645" y="257" fill="#67e8f9" fontSize="8" fontFamily="monospace" textAnchor="middle">Attr: count (Number)</text>

        {/* CloudWatch Logs */}
        <rect x="560" y="310" width="170" height="100" rx="10" fill="#1e1e2e" stroke="#e7157b" strokeWidth="2" />
        <rect x="580" y="325" width="40" height="40" rx="6" fill="url(#cloudwatchGrad)" />
        <text x="600" y="352" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">📈</text>
        <text x="680" y="345" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">CloudWatch</text>
        <text x="680" y="360" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Logs</text>
        <text x="645" y="390" fill="#a3a3a3" fontSize="9" textAnchor="middle">Lambda execution logs</text>

        {/* Terraform */}
        <rect x="300" y="380" width="180" height="120" rx="10" fill="#1e1e2e" stroke="#a855f7" strokeWidth="2" />
        <rect x="320" y="400" width="45" height="45" rx="6" fill="url(#terraformGrad)" />
        <text x="342" y="430" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">TF</text>
        <text x="420" y="420" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Terraform</text>
        <text x="420" y="438" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">IaC</text>
        <text x="390" y="465" fill="#a3a3a3" fontSize="9" textAnchor="middle">main.tf</text>
        <text x="390" y="480" fill="#67e8f9" fontSize="8" fontFamily="monospace" textAnchor="middle">Provisions infrastructure</text>

        {/* Connection Lines */}
        
        {/* Browser to Lambda */}
        <path d="M 200 270 L 300 250" stroke="#60a5fa" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="245" y="245" fill="#60a5fa" fontSize="8" textAnchor="middle">HTTPS</text>
        
        {/* Lambda to DynamoDB */}
        <path d="M 480 230 L 560 210" stroke="#ff9900" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <text x="520" y="205" fill="#fbbf24" fontSize="8" textAnchor="middle">Read/Write</text>
        
        {/* Lambda to CloudWatch */}
        <path d="M 450 300 L 560 340" stroke="#e7157b" strokeWidth="2" fill="none" markerEnd="url(#arrowPink)" />
        <text x="500" y="335" fill="#f472b6" fontSize="8" textAnchor="middle">Logs</text>
        
        {/* Terraform to Lambda */}
        <path d="M 370 380 L 370 300" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#arrowPurple)" />
        <text x="355" y="345" fill="#c084fc" fontSize="8" textAnchor="middle">Deploy</text>
        
        {/* Terraform to DynamoDB */}
        <path d="M 480 440 Q 600 440 645 270" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#arrowPurple)" />
        <text x="580" y="380" fill="#c084fc" fontSize="8" textAnchor="middle">Provision</text>

        {/* Response flow */}
        <path d="M 300 270 L 200 290" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,2" fill="none" />
        <text x="245" y="295" fill="#22c55e" fontSize="8" textAnchor="middle">JSON response</text>

        {/* Legend */}
        <rect x="760" y="420" width="90" height="110" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        <text x="805" y="440" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">Legend</text>
        
        <line x1="770" y1="455" x2="790" y2="455" stroke="#60a5fa" strokeWidth="2" />
        <text x="800" y="458" fill="#a3a3a3" fontSize="8">Request</text>
        
        <line x1="770" y1="475" x2="790" y2="475" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2" />
        <text x="800" y="478" fill="#a3a3a3" fontSize="8">Response</text>
        
        <line x1="770" y1="495" x2="790" y2="495" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,3" />
        <text x="800" y="498" fill="#a3a3a3" fontSize="8">IaC</text>

        <line x1="770" y1="515" x2="790" y2="515" stroke="#ff9900" strokeWidth="2" />
        <text x="800" y="518" fill="#a3a3a3" fontSize="8">Data</text>

        {/* Flow numbers */}
        <circle cx="225" cy="255" r="12" fill="#3b82f6" />
        <text x="225" y="259" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
        
        <circle cx="520" cy="215" r="12" fill="#ff9900" />
        <text x="520" y="219" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
        
        <circle cx="225" cy="285" r="12" fill="#22c55e" />
        <text x="225" y="289" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">3</text>

        {/* Footer */}
        <text x="450" y="575" fill="#64748b" fontSize="10" textAnchor="middle">Stack: HTML/JS + AWS Lambda (Python) + DynamoDB • IaC: Terraform</text>
      </svg>

      {/* Flow Description */}
      <div className="max-w-4xl mx-auto mt-6 bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-cyan-400 font-bold mb-4">📋 Request Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-blue-400 font-semibold">Request</span>
            </div>
            <p className="text-gray-400 text-xs">User loads maffindi.html → JavaScript calls fetch() to Lambda Function URL</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-orange-400 font-semibold">Process</span>
            </div>
            <p className="text-gray-400 text-xs">Lambda reads count from DynamoDB, increments it, writes back, logs to CloudWatch</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-green-400 font-semibold">Response</span>
            </div>
            <p className="text-gray-400 text-xs">Lambda returns JSON with updated count → Browser displays visitor number</p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-4xl mx-auto mt-4 flex flex-wrap gap-2 justify-center">
        <span className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">HTML/JavaScript</span>
        <span className="px-3 py-1 bg-orange-900 text-orange-300 rounded-full text-xs">AWS Lambda</span>
        <span className="px-3 py-1 bg-indigo-900 text-indigo-300 rounded-full text-xs">DynamoDB</span>
        <span className="px-3 py-1 bg-pink-900 text-pink-300 rounded-full text-xs">CloudWatch</span>
        <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-xs">Terraform</span>
      </div>
    </div>
  );
};

export default VisitorCounterArchitecture;
