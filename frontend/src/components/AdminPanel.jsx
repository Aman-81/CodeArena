import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';

// Zod schema matching the problem schema
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'string', 'linkedList', 'graph', 'dp', 'stack', 'tree', 'queue', 'hashTable', 'binarySearch', 'greedy', 'backtracking']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(4, 'All four languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(4, 'All four languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' },
        { language: 'Python', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' },
        { language: 'Python', completeCode: '' }
      ],
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // Default code templates for each language
  const defaultCodes = {
    'C++': `#include <iostream>
#include <vector>
using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}`,
    'Java': `import java.util.*;
class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
    'JavaScript': `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var solution = function(nums, target) {
    // Write your solution here
    return [];
};`,
    'Python': `def solution(nums, target):
    # Write your solution here
    return []`
  };

  const languageNames = ['C++', 'Java', 'JavaScript', 'Python'];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register('title')}
                className={`input input-bordered ${errors.title && 'input-error'}`}
                placeholder="Enter problem title"
              />
              {errors.title && (
                <span className="text-error">{errors.title.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register('description')}
                className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
                placeholder="Enter problem description"
              />
              {errors.description && (
                <span className="text-error">{errors.description.message}</span>
              )}
            </div>

            <div className="flex gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Difficulty</span>
                </label>
                <select
                  {...register('difficulty')}
                  className={`select select-bordered ${errors.difficulty && 'select-error'}`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Tag</span>
                </label>
                <select
                  {...register('tags')}
                  className={`select select-bordered ${errors.tags && 'select-error'}`}
                >
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
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
          {/* Visible Test Cases */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Visible Test Cases</h3>
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Visible Case
              </button>
            </div>
            
            {visibleFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Test Case {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="btn btn-xs btn-error"
                    disabled={visibleFields.length === 1}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Input</span>
                  </label>
                  <input
                    {...register(`visibleTestCases.${index}.input`)}
                    placeholder="e.g., [1,2,3], 5"
                    className="input input-bordered"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Output</span>
                  </label>
                  <input
                    {...register(`visibleTestCases.${index}.output`)}
                    placeholder="e.g., [0,1]"
                    className="input input-bordered"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Explanation</span>
                  </label>
                  <textarea
                    {...register(`visibleTestCases.${index}.explanation`)}
                    placeholder="Explain the test case"
                    className="textarea textarea-bordered"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Hidden Test Cases</h3>
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Hidden Case
              </button>
            </div>
            
            {hiddenFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Hidden Test {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeHidden(index)}
                    className="btn btn-xs btn-error"
                    disabled={hiddenFields.length === 1}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Input</span>
                  </label>
                  <input
                    {...register(`hiddenTestCases.${index}.input`)}
                    placeholder="Hidden test input"
                    className="input input-bordered"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Output</span>
                  </label>
                  <input
                    {...register(`hiddenTestCases.${index}.output`)}
                    placeholder="Expected output"
                    className="input input-bordered"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Templates */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
          <div className="space-y-8">
            {languageNames.map((language, index) => (
              <div key={language} className="space-y-4 border-b pb-6 last:border-b-0">
                <h3 className="font-semibold text-lg text-primary">{language}</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Initial Code (Starter Template)</span>
                    </label>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-base-300 px-4 py-2 text-sm font-mono">
                        {language}
                      </div>
                      <textarea
                        {...register(`startCode.${index}.initialCode`)}
                        className="w-full h-48 font-mono p-4 bg-base-100 focus:outline-none"
                        placeholder={`Enter ${language} starter code`}
                        defaultValue={defaultCodes[language]}
                      />
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Reference Solution</span>
                    </label>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-base-300 px-4 py-2 text-sm font-mono">
                        {language}
                      </div>
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        className="w-full h-48 font-mono p-4 bg-base-100 focus:outline-none"
                        placeholder={`Enter ${language} solution`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            className="btn btn-outline flex-1"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Create Problem
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;