"use client";
import LeafSVG from "@/components/assets/Leaf";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ResultData } from "@/lib/types"; // Import the ResultData interface
import Result from "./result";

export function ImageBox() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined>();
  const { toast } = useToast();

  // Function to handle image upload
  function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setImageFile(file);

    const objectURL = URL.createObjectURL(file);
    setImageURL(objectURL);

    toast({
      variant: "success",
      title: "Image Uploaded",
      description: `Image Uploaded Successfully`,
    });
  }

  // React Query hook to fetch data from API
  const { isLoading, error, data, refetch } = useQuery<ResultData>({
    queryKey: ["plantData"],
    enabled: false, // Start disabled until form submission
    queryFn: () => {
      const formData = new FormData();
      formData.append("image", imageFile!);

      return fetch("http://localhost:8000/submit", {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      });
    },
  });

  // Handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageFile) return;
    try {
      const result = await refetch(); // Trigger refetch of data from API

      // Show results if data is available
      if (result.data) {
        toast({
          variant: "success",
          title: "Prediction Success",
          description: "Disease detected successfully.",
        });
      } else {
        // Show toast if data is not available
        toast({
          variant: "destructive",
          title: "Data Not Found",
          description: "Unable to detect disease. Please try again.",
        });
      }
    } catch (error: any) {
      // Handle and show error
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <section className="mt-8 md:mt-4">
      <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          {/* Upload image UI */}
          <label htmlFor="plant-image" className="cursor-pointer">
            <div className="relative w-72 mt-4 flex items-center justify-center aspect-square mx-auto border-2 dark:border-white border-black border-dashed rounded-lg">
              {imageURL ? (
                // Display uploaded image if available
                <img
                  src={imageURL}
                  alt="Uploaded Image"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                // Placeholder UI when no image uploaded
                <div className="flex flex-col gap-2 p-4 justify-center items-center">
                  <LeafSVG />
                  <p className="text-center">Upload Plant Image Here</p>
                </div>
              )}
              {/* File input for uploading image */}
              <input
                type="file"
                name="plant-image"
                id="plant-image"
                className="hidden"
                accept=".png, .jpeg, .jpg"
                onChange={onImageUpload}
                required
              />
            </div>
          </label>
          {/* Button section for form submission */}
          <div className="mt-4">
            {imageFile === null ? (
              // Button disabled if no image selected
              <Button disabled className="select-none">
                Add Image to Proceed
              </Button>
            ) : (
              // Button enabled to submit form and detect disease
              <div className="flex flex-col justify-center gap-4 items-center">
                <Button type="submit" disabled={isLoading}>
                  {/* Display spinner icon during loading */}
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Detect Disease
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
      {/* Display result component when data is available */}
      {data && <Result data={data} />}
    </section>
  );
}
