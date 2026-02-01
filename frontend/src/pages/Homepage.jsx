import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser, updateUser } from '../authSlice';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, TrendingUp, Clock, Trophy, Star } from 'lucide-react';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    search: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0
  });

  // Pagination
  const problemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Check user role when component mounts or user changes
  useEffect(() => {
    if (user && user.role) {
      setIsAdmin(user.role === 'admin');
      setUserChecked(true);
    } else if (user && !user.role) {
      fetchCompleteUserData();
    } else {
      setIsAdmin(false);
      setUserChecked(true);
    }
  }, [user]);

  const fetchCompleteUserData = async () => {
    try {
      const { data } = await axiosClient.get('/user/check', { withCredentials: true });
      if (data.user) {
        dispatch(updateUser(data.user));
      }
    } catch (error) {
      console.error('Error fetching complete user data:', error);
    } finally {
      setUserChecked(true);
    }
  };

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
        
        // Calculate stats
        const easySolved = data.filter(p => p.difficulty === 'easy').length;
        const mediumSolved = data.filter(p => p.difficulty === 'medium').length;
        const hardSolved = data.filter(p => p.difficulty === 'hard').length;
        
        setStats({
          totalSolved: data.length,
          easySolved,
          mediumSolved,
          hardSolved
        });
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
    setIsAdmin(false);
    setUserChecked(false);
    setIsDropdownOpen(false);
  };

  const isProblemSolved = (problemId) => {
    return solvedProblems.some(sp => sp._id === problemId);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || 
                           problem.difficulty?.toLowerCase() === filters.difficulty;
    const tagMatch = filters.tag === 'all' || 
                    problem.tags?.toLowerCase() === filters.tag.toLowerCase();
    const searchMatch = problem.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                       problem.tags?.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch = filters.status === 'all' ? true :
                       filters.status === 'solved' ? isProblemSolved(problem._id) :
                       !isProblemSolved(problem._id);
    
    return difficultyMatch && tagMatch && searchMatch && statusMatch;
  });

  // Pagination calculations
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.difficulty, filters.tag, filters.status, filters.search]);

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  if (!userChecked || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xl"
          >
            Loading Challenges...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .bg-radial-gradient {
            background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), transparent 50%),
                        radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.1), transparent 50%);
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.6; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s infinite ease-in-out;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 bg-radial-gradient" />
      <motion.div
        className="fixed top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed bottom-32 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-2xl border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-extrabold text-white flex items-center">
            <img 
              src="/src/images/Code.png" 
              alt="CodeArena Logo" 
              className="w-20 h-16 mr-3 brightness-110 contrast-110" 
            />
            <span>CodeArena</span>
          </NavLink>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{user?.firstName}</div>
                  <div className="text-xs text-gray-400">{isAdmin ? 'Administrator' : 'Coder'}</div>
                </div>
                {isAdmin && (
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full font-bold">
                    PRO
                  </span>
                )}
              </motion.button>
              
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-14 right-0 z-50 w-64 p-2 shadow-2xl bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700"
                >
                  <div className="p-3 border-b border-gray-700">
                    <div className="text-sm text-gray-400">Signed in as</div>
                    <div className="font-medium text-white">{user?.emailId}</div>
                  </div>
                  <ul className="space-y-1 p-1">
                    {isAdmin && (
                      <li>
                        <NavLink 
                          to="/admin" 
                          className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <span>Admin Dashboard</span>
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 text-red-300 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Better Spacing */}
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 min-h-screen">
        {/* Header Section with Fixed Height */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight">
            Coding Challenges
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Level up your coding skills with curated challenges and track your progress in real-time
          </p>
        </motion.div>

        {/* User Stats Section */}
        {user && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalSolved}</div>
                  <div className="text-sm text-gray-400">Solved</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.easySolved}</div>
                  <div className="text-sm text-gray-400">Easy</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-2xl p-6 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.mediumSolved}</div>
                  <div className="text-sm text-gray-400">Medium</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl p-6 border border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Star className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.hardSolved}</div>
                  <div className="text-sm text-gray-400">Hard</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="bg-gray-800/50 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-md border border-gray-700"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search problems by title or tags..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>

              <select 
                className="px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              >
                <option value="all">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select 
                className="px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
                <option value="string">String</option>
                <option value="tree">Tree</option>
                <option value="stack">Stack</option>
                <option value="queue">Queue</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-500">
            <span>
              Showing {currentProblems.length} of {filteredProblems.length} problems
              {filters.search && ` for "${filters.search}"`}
            </span>
            <span className="text-blue-400 font-medium">Page {currentPage} of {totalPages}</span>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {currentProblems.map((problem, index) => {
            const solved = isProblemSolved(problem._id);
            return (
              <motion.div
                key={problem._id}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-gray-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight flex-1">
                    <NavLink to={`/problem/${problem._id}`}>
                      {problem.title}
                    </NavLink>
                  </h3>
                  {solved && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full ml-2 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-400 text-xs font-medium">Solved</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyBadgeColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                    {problem.tags}
                  </span>
                </div>

                <NavLink 
                  to={`/problem/${problem._id}`}
                  className="block w-full text-center px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  {solved ? 'Solve Again' : 'Solve Challenge'}
                </NavLink>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12"
          >
            <div className="text-gray-400 text-sm">
              {filteredProblems.length} problems total
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProblems.length === 0 && !loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No challenges found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all', search: '' })}
              className="px-8 py-3 font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Motivational Footer */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="text-center mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-lg">
            "The expert in anything was once a beginner." — Helen Hayes
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Keep solving challenges to become a better developer!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Homepage;