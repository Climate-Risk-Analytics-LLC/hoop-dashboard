'use client';

import { useState } from 'react';
import { 
  WalletMultiButton 
} from '@solana/wallet-adapter-react-ui';
import { 
  BarChart3, 
  Users, 
  Send, 
  Activity, 
  Shield, 
  Settings,
  Cpu
} from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getProgram, registerValidator } from '../lib/hoop-program';
import { toast } from 'sonner';

export default function HoopDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'validation' | 'contract' | 'disbursements' | 'validators' | 'nfts' | 'transactions' | 'admin'>('overview');
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'validation', label: 'Digital Twin Validation', icon: Cpu },
    { id: 'contract', label: 'Smart Contract', icon: Settings },
    { id: 'disbursements', label: 'Disbursements', icon: Send },
    { id: 'validators', label: 'Validators', icon: Users },
    { id: 'nfts', label: '21 NFTs', icon: Activity },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'admin', label: 'Admin', icon: Shield },
  ] as const;

  const handleRegisterValidator = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
    setLoading(true);
    try {
      const program = getProgram(connection, wallet);
      const tx = await registerValidator(program);
      toast.success(`Validator registered! Tx: ${tx}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to register validator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <span className="text-black font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="font-semibold text-xl tracking-tight">HOOP Dashboard</h1>
              <p className="text-[10px] text-zinc-500 -mt-1">Protocol + Digital Twin Validation</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DevNet
            </div>
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-1 mb-8 border-b border-zinc-800 pb-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-black' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total NFTs', value: '21', change: '1 Digital Twin + 20 Units' },
                { label: 'Validators', value: '1,248', change: '+84 this week' },
                { label: 'Validation Tasks', value: '3,942', change: '+312 this week' },
                { label: 'USDC Routed', value: '$412.8k', change: '+$48.2k this week' },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                  <div className="text-3xl font-semibold mt-2 tracking-tighter">{stat.value}</div>
                  <div className="text-emerald-400 text-sm mt-1">{stat.change}</div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleRegisterValidator} disabled={loading} className="px-5 py-2.5 bg-white text-black rounded-xl text-sm font-medium disabled:opacity-50">
                  {loading ? "Processing..." : "Register Validator (Live)"}
                </button>
                <button className="px-5 py-2.5 border border-zinc-700 hover:bg-zinc-800 rounded-xl text-sm font-medium">Start Digital Twin Validation</button>
                <button className="px-5 py-2.5 border border-zinc-700 hover:bg-zinc-800 rounded-xl text-sm font-medium">Create Verification Task</button>
              </div>
            </div>
          </div>
        )}

        {/* Digital Twin Validation Tab (NEW) */}
        {activeTab === 'validation' && (
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-blue-400" />
              <h2 className="text-2xl font-semibold">Engineering Validation — Digital Twin</h2>
            </div>
            <p className="text-zinc-400 mb-8">NFT #1: Pure Digital Twin (no physical twin). Used exclusively for engineering validation of the first unit. All data private.</p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
              <div>
                <div className="text-sm text-zinc-400">Status</div>
                <div className="text-xl font-medium text-emerald-400">Ready for Validation</div>
              </div>
              <button onClick={handleRegisterValidator} className="w-full py-4 bg-white text-black rounded-2xl font-semibold">Begin Digital Twin Validation</button>
              <p className="text-xs text-zinc-500">This will create on-chain record for the first validation task. Technical data remains private and validation-only.</p>
            </div>
          </div>
        )}

        {activeTab === 'contract' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Smart Contract Execution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={handleRegisterValidator} className="p-6 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-left">Register Validator</button>
              <button className="p-6 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-left">Create Verification Task</button>
              <button className="p-6 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-left">Claim Task</button>
              <button className="p-6 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-left">Submit Attestation</button>
            </div>
          </div>
        )}

        {activeTab === 'nfts' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">21 NFTs Overview</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="mb-6">
                <div className="text-emerald-400 font-medium">NFT #1 — Digital Twin (Validation Only)</div>
                <div className="text-sm text-zinc-400">No physical twin. Engineering validation complete.</div>
              </div>
              <div className="text-zinc-400">NFTs #2 – #21: Physical units following standard protocol after Digital Twin validation.</div>
            </div>
          </div>
        )}

        {activeTab === 'validators' && <div className="text-zinc-400">Validator management and reputation tracking (connected to on-chain ValidatorProfile).</div>}
        {activeTab === 'disbursements' && <div className="text-zinc-400">USDC disbursement workflows based on validated tasks and reputation.</div>}
        {activeTab === 'transactions' && <div className="text-zinc-400">Live transaction monitoring for HOOP program.</div>}
        {activeTab === 'admin' && <div className="text-zinc-400">Admin controls (protocol parameters, pause, etc.).</div>}
      </div>
    </div>
  );
}
