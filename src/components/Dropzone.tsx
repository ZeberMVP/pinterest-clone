"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

type CustomFile = File & { preview: string };

export default function Dropzone({ className }: { className?: string }) {
  const [file, setFile] = useState<CustomFile | null>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        const newFile = acceptedFiles[0];
        setFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          }),
        );
      }

      if (rejectedFiles?.length) {
        toast({
          variant: "destructive",
          title: "File Rejected",
          description:
            "File type not supported. Please upload an image file (jpg, png, etc.)",
        });
      }
    },
    [],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const title = e.currentTarget.pintitle.value;
    const description = e.currentTarget.description.value;
    const allowPeople = e.currentTarget["people-comment"].value;

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload",
      });
      return;
    }

    if (!title) {
      toast({
        variant: "destructive",
        title: "No title",
        description: "Please add a title to your pin",
      });
      return;
    }

    if (!description) {
      toast({
        variant: "destructive",
        title: "No description",
        description: "Please add a description to your pin",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Pinterest");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    try {
      await fetch("/api/pin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: data.secure_url,
          allowPeople,
        }),
      });

      toast({
        variant: "default",
        title: "Pin created",
        description: "Your pin has been created successfully",
      });

      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-20">
      {file ? (
        <div className="ml-40">
          {loading ? (
            <div className="w-[322px]">
              <Loader2 className="mx-auto mt-28 h-12 w-12 animate-spin" />
            </div>
          ) : (
            <>
              <Image
                src={file.preview}
                style={{ objectFit: "cover" }}
                width={322}
                height={500}
                alt="Your image"
              />
              <Button
                variant="ghost"
                className="mt-2 hover:bg-background hover:text-foreground"
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: className,
          })}
          className="ml-40 h-[500px] w-[322px] rounded-xl border border-dashed border-secondary"
        >
          <input {...getInputProps()} />

          <div>
            <h3 className="p-4 text-center">
              Choose a file or drag and drop it here
            </h3>
            <h5 className="text-center text-xs font-light text-secondary">
              We recommend using high quality .jpg files less than 20MB
            </h5>
          </div>
        </div>
      )}
      <div>
        <Label className="text-sm" htmlFor="title">
          Title
        </Label>
        <Input
          type="text"
          id="pintitle"
          placeholder="Add a title"
          className="mt-2 h-12 w-48 rounded-2xl border-2 border-neutral-400 placeholder:opacity-90 md:w-[300px] xl:w-[600px]"
        />
        <div className="mt-4">
          <Label className="text-sm" htmlFor="description">
            Description
          </Label>
        </div>
        <Textarea
          id="description"
          placeholder="Write a detailed description for your Pin here"
          className="mt-2 h-24 w-48 rounded-2xl border-2 border-neutral-400 placeholder:opacity-90 md:w-[300px] xl:w-[600px]"
        />
        <div className="ml-0.5 mt-6 flex items-center gap-2">
          <Switch id="people-comment" value="allow-people" defaultChecked />
          <Label htmlFor="people-commment">Allow people to comment</Label>
        </div>
        <Button className="mt-6 h-12 rounded-[40px] bg-[#E60023] hover:bg-[#E60023] hover:opacity-90">
          Publish
        </Button>
      </div>
    </form>
  );
}
