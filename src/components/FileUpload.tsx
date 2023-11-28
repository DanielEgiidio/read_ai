"use client"

import { Inbox } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'


const FileUpload = () => {
    const {getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles)
        }
    });
    
  return (

     <div className="p-2 bg-slate-200 rounded-xl">
        <div {...getRootProps({
            className:"border-dashed border-2 rounded-xl border-gray-600 cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}>
            <input {...getInputProps()}/>
            <>
                <Inbox className="w-10 h-10 text-gray-600" />
                <p className="mt-2 font-bold text-sm text-gray-600">Largue seu PDF Aqui </p>
            </>
        </div>
    </div>
  )
}

export default FileUpload