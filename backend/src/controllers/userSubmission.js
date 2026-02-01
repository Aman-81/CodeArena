
//AMAN CODE
// const Problem = require('../models/problems');
// const Submission = require('../models/submission');
// const { getLanguageById, submitBatch, submitToken } = require('../utils/problemUtility');

// const submitCode = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const problemId = req.params.id;
//     const { code, language } = req.body;

//     if (!userId || !problemId || !code || !language) {
//       return res.status(400).send("Some field missing");
//     }

//     const problem = await Problem.findById(problemId);
//     if (!problem) {
//       return res.status(404).send("Problem not found");
//     }

//     // Create initial submission record
//     const submitedResult = await Submission.create({
//       userId,
//       problemId,
//       code,
//       language,
//       status: "pending",
//       testCasesTotal: problem.hiddenTestCases.length
//     });

//     const languageId = getLanguageById(language);
//     if (!languageId) {
//       return res.status(400).send(`Language "${language}" not supported`);
//     }

//     // Prepare Judge0 submissions
//     const submissions = problem.hiddenTestCases.map((testcase) => ({
//       source_code: code,
//       language_id: languageId,
//       stdin: testcase.input,
//       expected_output: testcase.output
//     }));

//     // Submit to Judge0
//     const submitResult = await submitBatch(submissions);
//     const resultTokens = submitResult.map((value) => value.token);

//     // Fetch results from Judge0
//     const testResults = await submitToken(resultTokens);

//     // Evaluate results
//     let testCasesPassed = 0;
//     let runtime = 0;
//     let memory = 0;
//     let status = "accepted";
//     let errorMessage = null;

//     for (const test of testResults) {
//      if (test.status_id == 3) {
//   testCasesPassed++;
//   runtime += parseFloat(test.time || 0);
//   memory = Math.max(memory, test.memory || 0);
// } else if (test.status_id == 4) { 
//   // Compilation error
//   status = "compilation_error";
//   errorMessage = test.compile_output || test.stderr;
// } else if (test.status_id == 5) { 
//   // Runtime error
//   status = "runtime_error";
//   errorMessage = test.stderr;
// } else {
//   // Wrong Answer / TLE / etc.
//   status = "wrong";
//   errorMessage = test.stderr || test.message;
// }

//     }

//     // Update submission record in DB
//     submitedResult.status = status;
//     submitedResult.testCasesPassed = testCasesPassed;
//     submitedResult.runtime = runtime;
//     submitedResult.memory = memory;
//     submitedResult.errorMessage = errorMessage;

//     await submitedResult.save();
   
//     if(!req.user.problemSolved.includes(problemId)){
//       req.user.problemSolved.push(problemId)
//       await req.user.save()
//     }

//     res.status(201).send(submitedResult);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error: hellow rold  " + err.message);
//   }
// };


// // const runCode = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const problemId = req.params.id;
// //     const { code, language } = req.body;

// //     if (!userId || !problemId || !code || !language) {
// //       return res.status(400).send("Some field missing");
// //     }

// //     const problem = await Problem.findById(problemId);
// //     if (!problem) {
// //       return res.status(404).send("Problem not found");
// //     }

// //     const languageId = getLanguageById(language);
// //     if (!languageId) {
// //       return res.status(400).send(`Language "${language}" not supported`);
// //     }

// //     // Prepare Judge0 submissions using visible test cases
// //     const submissions = problem.visibleTestCases.map((testcase) => ({
// //       source_code: code,
// //       language_id: languageId,
// //       stdin: testcase.input,
// //       expected_output: testcase.output,
// //     }));

// //     // Submit to Judge0
// //     const submitResult = await submitBatch(submissions);
// //     const resultTokens = submitResult.map((value) => value.token);

// //     // Fetch results from Judge0
// //     const testResults = await submitToken(resultTokens);

// //     // Return results (not saved in DB for runCode)
// //     res.status(201).send(testResults);

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Internal server error: " + err.message);
// //   }
// // };

// module.exports = {submitCode};

// const Problem = require('../models/problems');
// const Submission = require('../models/submission');
// const { getLanguageById, submitBatch, submitToken } = require('../utils/problemUtility');

// const submitCode = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const problemId = req.params.id;
//     const { code, language } = req.body;

//     if (!userId || !problemId || !code || !language) {
//       return res.status(400).send("Some field missing");
//     }

//     const problem = await Problem.findById(problemId);
//     if (!problem) {
//       return res.status(404).send("Problem not found");
//     }

//     // Create initial submission record
//     const submitedResult = await Submission.create({
//       userId,
//       problemId,
//       code,
//       language,
//       status: "pending",
//       testCasesTotal: problem.hiddenTestCases.length
//     });

//     const languageId = getLanguageById(language);
//     if (!languageId) {
//       return res.status(400).send(`Language "${language}" not supported`);
//     }

//     // Prepare Judge0 submissions
//     const submissions = problem.hiddenTestCases.map((testcase) => ({
//       source_code: code,
//       language_id: languageId,
//       stdin: testcase.input,
//       expected_output: testcase.output
//     }));

//     // Submit to Judge0
//     const submitResult = await submitBatch(submissions);
//     const resultTokens = submitResult.map((value) => value.token);

//     // Fetch results from Judge0
//     const testResults = await submitToken(resultTokens);

//     // Evaluate results
//     let testCasesPassed = 0;
//     let runtime = 0;
//     let memory = 0;
//     let status = "accepted";
//     let errorMessages = [];

//     for (const test of testResults) {
//       const statusId = test.status?.id || test.status_id;

//       if (statusId === 3) { 
//         testCasesPassed++;
//         runtime = Math.max(runtime, parseFloat(test.time || 0));
//         memory = Math.max(memory, test.memory || 0);
//       } 
//       else if (statusId === 6) { 
//         status = "compilation_error";
//         errorMessages.push(test.compile_output || test.stderr);
//       } 
//       else if (statusId === 7) { 
//         status = "runtime_error";
//         errorMessages.push(test.stderr);
//       } 
//       else { 
//         status = "wrong";
//         errorMessages.push(test.stderr || test.message || test.status?.description);
//       }
//     }

//     // Update submission record in DB
//     submitedResult.status = status;
//     submitedResult.testCasesPassed = testCasesPassed;
//     submitedResult.runtime = runtime;
//     submitedResult.memory = memory;
//     submitedResult.errorMessage = errorMessages.join("\n");

//     await submitedResult.save();
   
//     // Add problem to solved list only if all passed
//     if (status === "accepted" && !req.user.problemSolved.includes(problemId)) {
//       req.user.problemSolved.push(problemId);
//       await req.user.save();
//     }

//     res.status(201).send(submitedResult);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error: " + err.message);
//   }
// };

// module.exports = { submitCode };




//ritik ka code




// const Problem = require('../models/problems');
// const Submission = require('../models/submission');
// const User = require('../models/user'); 
// const { getLanguageById, submitBatch, submitToken } = require('../utils/problemUtility');

// const submitCode = async (req, res) => {
//   try {
//     const userId = req.user?._id;
//     const problemId = req.params.id;
//     const { code, language } = req.body;

//     if (!userId || !problemId || !code || !language) {
//       return res.status(400).json({ error: "Some field missing" });
//     }

//     const problem = await Problem.findById(problemId);
//     if (!problem) {
//       return res.status(404).json({ error: "Problem not found" });
//     }

//     // initial submission
//     const submitedResult = await Submission.create({
//       userId,
//       problemId,
//       code,
//       language,
//       status: "pending",
//       testCasesTotal: problem.hiddenTestCases.length
//     });

//     const languageId = getLanguageById(language);
//     if (!languageId) {
//       return res.status(400).json({ error: `Language "${language}" not supported` });
//     }

//     // prepare Judge0 submissions
//     const submissions = problem.hiddenTestCases.map((testcase) => ({
//       source_code: code,
//       language_id: languageId,
//       stdin: testcase.input,
//       expected_output: testcase.output
//     }));

//     // send to Judge0
//     const submitResult = await submitBatch(submissions);
//     const resultTokens = submitResult.map((value) => value.token);
//     const testResults = await submitToken(resultTokens);

//     // evaluate
//     let testCasesPassed = 0;
//     let runtime = 0;
//     let memory = 0;
//     let status = "accepted";
//     let errorMessages = [];

//     for (const test of testResults) {
//       const statusId = test.status?.id || test.status_id;
//       if (statusId === 3) {
//         testCasesPassed++;
//         runtime = Math.max(runtime, parseFloat(test.time || 0));
//         memory = Math.max(memory, test.memory || 0);
//       } else if (statusId === 6) {
//         status = "compilation_error";
//         errorMessages.push(test.compile_output || test.stderr);
//       } else if (statusId === 7) {
//         status = "runtime_error";
//         errorMessages.push(test.stderr);
//       } else {
//         status = "wrong";
//         errorMessages.push(test.stderr || test.message || test.status?.description);
//       }
//     }

//     // update submission
//     submitedResult.status = status;
//     submitedResult.testCasesPassed = testCasesPassed;
//     submitedResult.runtime = runtime;
//     submitedResult.memory = memory;
//     submitedResult.errorMessage = errorMessages.join("\n");
//     await submitedResult.save();

//     // ✅ add problem to solved list
//     // if (status === "accepted") {
//     //   const user = await User.findById(userId);
//     //   if (user && !user.problemSolved.includes(problemId)) {
//     //     user.problemSolved.push(problemId);
//     //     await user.save();
//     //   }
//    // }
   
//    //Problem ko insert krege userSchema mai 
//     if(!req.user.problemSolved.includes(problemId)){
//         req.user.problemSolved.push(problemId)
//         await req.user.save();
//     }
//    const accepted=(status=='accepted')
//     res.status(201).json({accepted,
//       totalTestCase:submitResult.testCasesTotal,
//       passedTestCases:testCasesPassed,
//       runtime,
//       memory
//     });
//          }
//    catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error: " + err.message });
//   }
// };

//VERION-4

// const runCode = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const problemId = req.params.id;
//     const { code, language } = req.body;

//     if (!userId || !problemId || !code || !language) {
//       return res.status(400).send("Some field missing");
//     }

//     const problem = await Problem.findById(problemId);
//     if (!problem) {
//       return res.status(404).send("Problem not found");
//     }

//     const languageId = getLanguageById(language);
//     if (!languageId) {
//       return res.status(400).send(`Language "${language}" not supported`);
//     }

//     // Prepare Judge0 submissions using visible test cases
//     const submissions = problem.visibleTestCases.map((testcase) => ({
//       source_code: code,
//       language_id: languageId,
//       stdin: testcase.input,
//       expected_output: testcase.output,
//     }));

//     // Submit to Judge0
//     const submitResult = await submitBatch(submissions);
//     const resultTokens = submitResult.map((value) => value.token);

//     // Fetch results from Judge0
//     const testResults = await submitToken(resultTokens);
      
    
//     // Return results (not saved in DB for runCode)
//     res.status(201).json({
//         success:status,
//         testCase:testResults,

//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error: " + err.message);
//   }
// };

// module.exports = { submitCode,runCode };


//Aman updated code
const Problem = require("../models/problems");
const Submission = require("../models/submission");
const User = require("../models/user");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

// Submit code (saves result in DB)
const submitCode = async (req, res) => {
  try {
    // Add proper validation for req.result
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userId = req.user._id;
    const problemId = req.params.id;
    let { code, language } = req.body;

    if (!userId || !code || !problemId || !language) {
      return res.status(400).json({ error: "Some fields are missing" });
    }

    if (language === "cpp") language = "c++";

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // Create initial submission
    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      testCasesTotal: problem.hiddenTestCases?.length || 0,
    });

    const languageId = getLanguageById(language);
    if (!languageId) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const submissions = (problem.hiddenTestCases || []).map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    // Evaluate results
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "accepted";
    let errorMessages = [];

    const testCaseDetails = testResult.map((test, index) => {
      const statusId = test.status?.id || test.status_id;
      let caseStatus = "accepted";
      let message = null;

      if (statusId === 3) {
        testCasesPassed++;
        runtime = Math.max(runtime, parseFloat(test.time || 0));
        memory = Math.max(memory, test.memory || 0);
      } else if (statusId === 6) {
        caseStatus = "compilation_error";
        status = "compilation_error";
        message = test.compile_output || test.stderr;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      } else if (statusId === 7) {
        caseStatus = "runtime_error";
        status = "runtime_error";
        message = test.stderr;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      } else {
        caseStatus = "wrong";
        status = "wrong";
        message = test.stderr || test.message || test.status?.description;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      }

      return {
        input: problem.hiddenTestCases?.[index]?.input || "N/A",
        expected_output: problem.hiddenTestCases?.[index]?.output || "N/A",
        status: caseStatus,
        message,
      };
    });

    // Update submission in DB
    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;
    submittedResult.errorMessage = errorMessages.join("\n");
    await submittedResult.save();

    // Update user's problemSolved list - only if accepted
    if (status === "accepted" && req.result && !req.result.problemSolved.includes(problemId)) {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    res.status(201).json({
      accepted: status === "accepted",
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory,
      testCaseDetails,
    });
  } catch (err) {
    console.error("Submit code error:", err);
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

// Run code (just run, no DB save)
const runCode = async (req, res) => {
  try {
    // Add proper validation for req.result
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userId = req.user._id;
    const problemId = req.params.id;
    let { code, language } = req.body;

    if (!userId || !code || !problemId || !language) {
      return res.status(400).json({ error: "Some fields are missing" });
    }

    if (language === "cpp") language = "c++";

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const languageId = getLanguageById(language);
    if (!languageId) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const submissions = (problem.visibleTestCases || []).map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessages = [];

    const testCaseDetails = testResult.map((test, index) => {
      const statusId = test.status?.id || test.status_id;
      let caseStatus = "accepted";
      let message = null;

      if (statusId === 3) {
        testCasesPassed++;
        runtime = Math.max(runtime, parseFloat(test.time || 0));
        memory = Math.max(memory, test.memory || 0);
      } else if (statusId === 6) {
        caseStatus = "compilation_error";
        status = false;
        message = test.compile_output || test.stderr;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      } else if (statusId === 7) {
        caseStatus = "runtime_error";
        status = false;
        message = test.stderr;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      } else {
        caseStatus = "wrong";
        status = false;
        message = test.stderr || test.message || test.status?.description;
        errorMessages.push(`Test ${index + 1}: ${message}`);
      }

      return {
        input: problem.visibleTestCases?.[index]?.input || "N/A",
        expected_output: problem.visibleTestCases?.[index]?.output || "N/A",
        status: caseStatus,
        message,
      };
    });

    res.status(200).json({
      success: status,
      totalTestCases: problem.visibleTestCases?.length || 0,
      passedTestCases: testCasesPassed,
      runtime,
      memory,
      testCaseDetails,
    });
  } catch (err) {
    console.error("Run code error:", err);
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};

module.exports = { submitCode, runCode };
