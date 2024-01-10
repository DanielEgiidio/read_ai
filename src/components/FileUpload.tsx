"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: String;
      file_name: String;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        //maior que 10mb
        toast.error("O limite é 10mb meu nobre");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("alguma coisa deu ruim");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (err) => {
            toast.error("Algo impossibilitou a criação do chat");
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-slate-200 rounded-xl mx-auto max-w-[500px] max-y-[600px]">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl border-gray-600 cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Trocando uma ideia com o ChatGPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-gray-600" />
            <p className="mt-2 font-bold text-sm text-gray-600">
              Largue seu PDF Aqui
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
