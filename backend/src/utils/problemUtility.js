
// const axios = require('axios');

// // Convert language name to Judge0 ID
// const getLanguageById = (lang) => {
//   const language = {
//     "c++": 54,
//     "cpp": 54,        // added alias
//     "java": 62,
//     "javascript": 63,
//     "js": 63,         // optional alias
//     "sql": 82,
//     "python": 71
//   };
//   return language[lang.toLowerCase()];
// };


// // Submit a batch of codes to Judge0
// const submitBatch = async (submission) => {
//   const options = {
//     method: 'POST',
//     url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//     params: { base64_encoded: 'false' },
//     headers: {
//       'x-rapidapi-key': '409400af90mshd26bb3804c35af1p1130dajsna80675deee7a',
//       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//       'Content-Type': 'application/json'
//     },
//     data: { submissions: submission } // ✅ Fixed variable name
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return await fetchData();
// };

// // Wait for given time (ms)
// const waiting = (timer) => {
//   return new Promise((resolve) => setTimeout(resolve, timer)); // ✅ Fixed
// };

// // Fetch results from Judge0 using tokens
// const submitToken = async (resultToken) => {
//   const options = {
//     method: 'GET',
//     url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//     params: {
//       tokens: resultToken.join(","),
//       base64_encoded: 'false',
//       fields: '*'
//     },
//     headers: {
//       'x-rapidapi-key': '409400af90mshd26bb3804c35af1p1130dajsna80675deee7a',
//       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
//     }
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // Keep polling until Judge0 finishes execution
//   while (true) {
//     const result = await fetchData();
//     const isResultObtained = result.submissions.every((r) => r.status_id > 2); // ✅ Fixed key
//     if (isResultObtained) return result.submissions;

//     await waiting(1000); // ✅ Fixed waiting
//   }
// };

// module.exports = { getLanguageById, submitBatch, submitToken };


const axios = require('axios');

// Convert language name to Judge0 ID
const getLanguageById = (lang) => {
  const language = {
  "c++": 54,
  "cpp": 54,        // ✅ ab cpp alias bhi added hai
  "java": 62,
  "javascript": 63,
  "js": 63,
  "sql": 82,
  "python": 71
};

  return language[lang.toLowerCase()];
};


// Submit a batch of codes to Judge0
const submitBatch = async (submission) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: { base64_encoded: 'false' },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: { submissions: submission } // ✅ Fixed variable name
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};

// Wait for given time (ms)
const waiting = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer)); // ✅ Fixed
};

// Fetch results from Judge0 using tokens
const submitToken = async (resultToken) => {
  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(","),
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
   'x-rapidapi-key': process.env.JUDGE0_KEY,

      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Keep polling until Judge0 finishes execution
  while (true) {
    const result = await fetchData();
    const isResultObtained = result.submissions.every((r) => r.status_id > 2); // ✅ Fixed key
    if (isResultObtained) return result.submissions;

    await waiting(1000); // ✅ Fixed waiting
  }
};

module.exports = { getLanguageById, submitBatch, submitToken };
