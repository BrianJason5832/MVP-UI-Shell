import { useState } from "react"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Progress } from "./components/ui/progress"
import { Textarea } from "./components/ui/textarea"
import {
  AlertCircle,
  CheckCircle,
  Info,
  Trophy,
  Zap,
  Plus,
  Search,
  Filter,
  Star,
  Target,
  TrendingUp,
} from "lucide-react"

type TabType = "logs" | "xp" | "feedback"

interface LogEntry {
  id: string
  timestamp: string
  type: "info" | "warning" | "error" | "success"
  message: string
}

interface XPEntry {
  id: string
  rank: number
  name: string
  xp: number
  level: number
  progress: number
}

interface FeedbackEntry {
  id: string
  title: string
  content: string
  priority: "low" | "medium" | "high"
  timestamp: string
}

const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2024-01-15 14:32:15", type: "success", message: "User authentication successful" },
  { id: "2", timestamp: "2024-01-15 14:31:42", type: "info", message: "Database connection established" },
  { id: "3", timestamp: "2024-01-15 14:30:18", type: "warning", message: "High memory usage detected (85%)" },
  { id: "4", timestamp: "2024-01-15 14:29:33", type: "error", message: "Failed to load external API resource" },
  { id: "5", timestamp: "2024-01-15 14:28:07", type: "info", message: "System backup completed successfully" },
  { id: "6", timestamp: "2024-01-15 14:27:21", type: "success", message: "New user registration completed" },
]

const mockXPData: XPEntry[] = [
  { id: "1", rank: 1, name: "Alex Chen", xp: 12450, level: 15, progress: 75 },
  { id: "2", rank: 2, name: "Sarah Kim", xp: 11200, level: 14, progress: 60 },
  { id: "3", rank: 3, name: "Mike Johnson", xp: 9800, level: 13, progress: 40 },
  { id: "4", rank: 4, name: "Emma Davis", xp: 8900, level: 12, progress: 85 },
  { id: "5", rank: 5, name: "David Wilson", xp: 7650, level: 11, progress: 30 },
]

const mockFeedback: FeedbackEntry[] = [
  {
    id: "1",
    title: "UI Performance Optimization",
    content: "Consider implementing lazy loading for better performance",
    priority: "high",
    timestamp: "2024-01-15",
  },
  {
    id: "2",
    title: "Mobile Navigation",
    content: "Add swipe gestures for better mobile experience",
    priority: "medium",
    timestamp: "2024-01-14",
  },
  {
    id: "3",
    title: "Dark Mode Enhancement",
    content: "Improve contrast ratios for better accessibility",
    priority: "low",
    timestamp: "2024-01-13",
  },
]

export default function MVPShell() {
  const [activeTab, setActiveTab] = useState<TabType>("logs")
  const [newFeedback, setNewFeedback] = useState({ title: "", content: "" })

  const getLogIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400" />
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />
    }
  }

  const getLogBadgeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getPriorityColor = (priority: FeedbackEntry["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const addFeedback = () => {
    if (newFeedback.title && newFeedback.content) {
      setNewFeedback({ title: "", content: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
               <Zap className="w-5 h-5 text-white" />
               <h1 className="text-xl font-bold text-white">MVP Shell</h1>
             </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {[
                { id: "logs", label: "Logs", icon: Target },
                { id: "xp", label: "XP / Ranking", icon: Trophy },
                { id: "feedback", label: "Feedback", icon: Star },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => id === "logs" ? setActiveTab(id as TabType) : null}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === id
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex space-x-1">
            {[
              { id: "logs", label: "Logs", icon: Target },
              { id: "xp", label: "XP", icon: Trophy },
              { id: "feedback", label: "Notes", icon: Star },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => id === "logs" ? setActiveTab(id as TabType) : null}
                className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 text-sm ${
                  activeTab === id
                    ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Logs Tab */}
        {activeTab === "logs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Target className="w-6 h-6 text-teal-400" />
                <span>System Logs</span>
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {mockLogs.map((log) => (
                <Card
                  key={log.id}
                  className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getLogIcon(log.type)}
                        <span className="text-white font-medium">{log.message}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getLogBadgeColor(log.type)}>{log.type.toUpperCase()}</Badge>
                        <span className="text-slate-400 text-sm">{log.timestamp}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}


      </main>
    </div>
  )
}