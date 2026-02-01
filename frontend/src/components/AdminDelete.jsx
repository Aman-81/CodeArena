import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    search: ''
  });

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    const filtered = problems.filter(problem => {
      const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
      const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
      const searchMatch = problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         problem.tags.toLowerCase().includes(filters.search.toLowerCase());
      
      return difficultyMatch && tagMatch && searchMatch;
    });
    setFilteredProblems(filtered);
  }, [problems, filters]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return { backgroundColor: '#10b981', color: 'white' }; // Green
      case 'Medium':
        return { backgroundColor: '#f59e0b', color: 'white' }; // Yellow/Orange
      case 'Hard':
        return { backgroundColor: '#ef4444', color: 'white' }; // Red
      default:
        return { backgroundColor: '#6b7280', color: 'white' }; // Gray
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Loading problems...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Delete Problems</h1>
        <span className="text-sm text-gray-500">
          Total: {problems.length} | Showing: {filteredProblems.length}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-base-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search by title or tags..."
              className="input input-bordered input-sm"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>

          <select 
            className="select select-bordered select-sm"
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select 
            className="select select-bordered select-sm"
            value={filters.tag}
            onChange={(e) => setFilters({...filters, tag: e.target.value})}
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="string">String</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">Dynamic Programming</option>
            <option value="stack">Stack</option>
            <option value="tree">Tree</option>
            <option value="queue">Queue</option>
            <option value="hashTable">Hash Table</option>
            <option value="binarySearch">Binary Search</option>
            <option value="greedy">Greedy</option>
            <option value="backtracking">Backtracking</option>
          </select>

          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setFilters({ difficulty: 'all', tag: 'all', search: '' })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No problems found matching your filters
                </td>
              </tr>
            ) : (
              filteredProblems.map((problem, index) => (
                <tr key={problem._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-medium">{problem.title}</div>
                  </td>
                  <td>
                    <span 
                      style={getDifficultyStyle(problem.difficulty)}
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-info">
                      {problem.tags}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(problem._id)}
                      className="btn btn-sm btn-error"
                      title="Delete this problem"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDelete;