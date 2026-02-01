// import { useParams } from 'react-router';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import axiosClient from '../utils/axiosClient'

// function AdminUpload(){
    
//     const {problemId}  = useParams();
    
//     const [uploading, setUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadedVideo, setUploadedVideo] = useState(null);
    
//       const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//         reset,
//         setError,
//         clearErrors
//       } = useForm();
    
//       const selectedFile = watch('videoFile')?.[0];
    
//       // Upload video to Cloudinary
//       const onSubmit = async (data) => {
//         const file = data.videoFile[0];
        
//         setUploading(true);
//         setUploadProgress(0);
//         clearErrors();
    
//         try {
//           // Step 1: Get upload signature from backend
//           const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
//           const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;
    
//           // Step 2: Create FormData for Cloudinary upload
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('signature', signature);
//           formData.append('timestamp', timestamp);
//           formData.append('public_id', public_id);
//           formData.append('api_key', api_key);
    
//           // Step 3: Upload directly to Cloudinary
//           const uploadResponse = await axios.post(upload_url, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//               const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(progress);
//             },
//           });
    
//           const cloudinaryResult = uploadResponse.data;
    
//           // Step 4: Save video metadata to backend
//           const metadataResponse = await axiosClient.post('/video/save', {
//             problemId:problemId,
//             cloudinaryPublicId: cloudinaryResult.public_id,
//             secureUrl: cloudinaryResult.secure_url,
//             duration: cloudinaryResult.duration,
//           });
    
//           setUploadedVideo(metadataResponse.data.videoSolution);
//           reset(); // Reset form after successful upload
          
//         } catch (err) {
//           console.error('Upload error:', err);
//           setError('root', {
//             type: 'manual',
//             message: err.response?.data?.message || 'Upload failed. Please try again.'
//           });
//         } finally {
//           setUploading(false);
//           setUploadProgress(0);
//         }
//       };
    
//       // Format file size
//       const formatFileSize = (bytes) => {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//       };
    
//       // Format duration
//       const formatDuration = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = Math.floor(seconds % 60);
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//       };
    
//       return (
//         <div className="max-w-md mx-auto p-6">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title">Upload Video</h2>
              
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* File Input */}
//                 <div className="form-control w-full">
//                   <label className="label">
//                     <span className="label-text">Choose video file</span>
//                   </label>
//                   <input
//                     type="file"
//                     accept="video/*"
//                     {...register('videoFile', {
//                       required: 'Please select a video file',
//                       validate: {
//                         isVideo: (files) => {
//                           if (!files || !files[0]) return 'Please select a video file';
//                           const file = files[0];
//                           return file.type.startsWith('video/') || 'Please select a valid video file';
//                         },
//                         fileSize: (files) => {
//                           if (!files || !files[0]) return true;
//                           const file = files[0];
//                           const maxSize = 100 * 1024 * 1024; // 100MB
//                           return file.size <= maxSize || 'File size must be less than 100MB';
//                         }
//                       }
//                     })}
//                     className={`file-input file-input-bordered w-full ${errors.videoFile ? 'file-input-error' : ''}`}
//                     disabled={uploading}
//                   />
//                   {errors.videoFile && (
//                     <label className="label">
//                       <span className="label-text-alt text-error">{errors.videoFile.message}</span>
//                     </label>
//                   )}
//                 </div>
    
//                 {/* Selected File Info */}
//                 {selectedFile && (
//                   <div className="alert alert-info">
//                     <div>
//                       <h3 className="font-bold">Selected File:</h3>
//                       <p className="text-sm">{selectedFile.name}</p>
//                       <p className="text-sm">Size: {formatFileSize(selectedFile.size)}</p>
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Upload Progress */}
//                 {uploading && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Uploading...</span>
//                       <span>{uploadProgress}%</span>
//                     </div>
//                     <progress 
//                       className="progress progress-primary w-full" 
//                       value={uploadProgress} 
//                       max="100"
//                     ></progress>
//                   </div>
//                 )}
    
//                 {/* Error Message */}
//                 {errors.root && (
//                   <div className="alert alert-error">
//                     <span>{errors.root.message}</span>
//                   </div>
//                 )}
    
//                 {/* Success Message */}
//                 {uploadedVideo && (
//                   <div className="alert alert-success">
//                     <div>
//                       <h3 className="font-bold">Upload Successful!</h3>
//                       <p className="text-sm">Duration: {formatDuration(uploadedVideo.duration)}</p>
//                       <p className="text-sm">Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Upload Button */}
//                 <div className="card-actions justify-end">
//                   <button
//                     type="submit"
//                     disabled={uploading}
//                     className={`btn btn-primary ${uploading ? 'loading' : ''}`}
//                   >
//                     {uploading ? 'Uploading...' : 'Upload Video'}
//                   </button>
//                 </div>
//               </form>
            
//             </div>
//           </div>
//         </div>
//     );
// }


// export default AdminUpload;
import { useParams } from 'react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';

function AdminUpload() {
    const { problemId } = useParams();
    
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [error, setError] = useState(null);
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const selectedFile = watch('videoFile')?.[0];

    // Direct upload to Cloudinary - SIMPLIFIED APPROACH
    const onSubmit = async (data) => {
        const file = data.videoFile[0];
        
        setUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            // Step 1: Get a fresh timestamp
            const timestamp = Math.round(Date.now() / 1000);
            const uniqueId = `video_${problemId}_${timestamp}`;
            
            // Step 2: Upload directly to Cloudinary with minimal parameters
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', '318157648734157'); // Your API key
            formData.append('timestamp', timestamp.toString());
            formData.append('public_id', uniqueId);
            
            console.log('Uploading with direct approach...');
            console.log('Public ID:', uniqueId);
            console.log('Timestamp:', timestamp);

            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/dl5kijxuw/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        resource_type: 'video' // Add as query parameter instead of form data
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress);
                    },
                }
            );

            const cloudinaryResult = uploadResponse.data;
            console.log('Cloudinary upload success:', cloudinaryResult);

            // Step 3: Save video metadata to backend
            const metadataResponse = await axiosClient.post('/video/save', {
                problemId: problemId,
                cloudinaryPublicId: cloudinaryResult.public_id,
                secureUrl: cloudinaryResult.secure_url,
                duration: cloudinaryResult.duration,
            });

            console.log('Metadata save success:', metadataResponse.data);
            
            setUploadedVideo({
                secureUrl: cloudinaryResult.secure_url,
                duration: cloudinaryResult.duration,
                uploadedAt: new Date()
            });
            
            reset();
            
        } catch (err) {
            console.error('Upload error details:', err);
            console.error('Full error response:', err.response?.data);
            
            let errorMessage = 'Upload failed. ';
            
            // Detailed error analysis
            if (err.response?.data?.error?.message) {
                errorMessage += `Cloudinary Error: ${err.response.data.error.message}`;
            } else if (err.response?.status === 400) {
                errorMessage += 'Bad Request - Check your API credentials and parameters.';
            } else if (err.response?.status === 401) {
                errorMessage += 'Unauthorized - Invalid API key or secret.';
            } else if (err.message) {
                errorMessage += err.message;
            }
            
            setError(errorMessage);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Format duration
    const formatDuration = (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Upload Video for Problem #{problemId}</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* File Input */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Choose video file</span>
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                {...register('videoFile', {
                                    required: 'Please select a video file',
                                    validate: {
                                        isVideo: (files) => {
                                            if (!files || !files[0]) return 'Please select a video file';
                                            const file = files[0];
                                            return file.type.startsWith('video/') || 'Please select a valid video file';
                                        },
                                        fileSize: (files) => {
                                            if (!files || !files[0]) return true;
                                            const file = files[0];
                                            const maxSize = 100 * 1024 * 1024; // 100MB
                                            return file.size <= maxSize || 'File size must be less than 100MB';
                                        }
                                    }
                                })}
                                className={`file-input file-input-bordered w-full ${errors.videoFile ? 'file-input-error' : ''}`}
                                disabled={uploading}
                            />
                            {errors.videoFile && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.videoFile.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Selected File Info */}
                        {selectedFile && (
                            <div className="alert alert-info">
                                <div>
                                    <h3 className="font-bold">Selected File:</h3>
                                    <p className="text-sm">{selectedFile.name}</p>
                                    <p className="text-sm">Size: {formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {uploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <progress 
                                    className="progress progress-primary w-full" 
                                    value={uploadProgress} 
                                    max="100"
                                ></progress>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="alert alert-error">
                                <div>
                                    <h3 className="font-bold">Upload Error</h3>
                                    <p className="text-sm">{error}</p>
                                    <details className="mt-2 text-xs">
                                        <summary>Technical Details</summary>
                                        <p>API Key: 318157648734157</p>
                                        <p>Cloud Name: dl5kijxuw</p>
                                        <p>Check your Cloudinary dashboard settings</p>
                                    </details>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {uploadedVideo && (
                            <div className="alert alert-success">
                                <div>
                                    <h3 className="font-bold">Upload Successful!</h3>
                                    <p className="text-sm">Duration: {formatDuration(uploadedVideo.duration)}</p>
                                    <p className="text-sm">Uploaded: {uploadedVideo.uploadedAt.toLocaleString()}</p>
                                    <div className="mt-2">
                                        <a 
                                            href={uploadedVideo.secureUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline"
                                        >
                                            View Video
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upload Button */}
                        <div className="card-actions justify-end">
                            <button
                                type="submit"
                                disabled={uploading || !selectedFile}
                                className={`btn btn-primary ${uploading ? 'loading' : ''}`}
                            >
                                {uploading ? 'Uploading...' : 'Upload Video'}
                            </button>
                        </div>
                    </form>

                    {/* Debug Section */}
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <h3 className="font-bold text-sm mb-2">Troubleshooting:</h3>
                        <ul className="text-xs list-disc list-inside space-y-1">
                            <li>Verify API Key in Cloudinary Dashboard</li>
                            <li>Check that API Secret is correct in .env file</li>
                            <li>Ensure Cloudinary account is active</li>
                            <li>Try a different video file format</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpload;