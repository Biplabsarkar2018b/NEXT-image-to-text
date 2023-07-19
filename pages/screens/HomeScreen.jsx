import React, { useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const header = {
    "X-Api-Key": "X4e3pjUrUbjg1QqWzGIeTw==o21cSWFtdu6hy3vi",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError("Please select an image.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Make the POST request using Axios
      const response = await axios.post(
        "https://api.api-ninjas.com/v1/imagetotext",
        formData,
        {
          headers: header,
        }
      );

      // Handle the response as needed (e.g., display a success message)
    //   console.log(response.data);

      // Join the array of strings into a single string
      const text = response.data?.map((item) => item?.text).join(" ");
    //   console.log(text);
      setData(text || "No text found");

      setIsLoading(false);
      setSelectedImage(null); // Reset the selected image after successful upload
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while uploading the image. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white max-w-sm shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Please Select an Image (JPEG or PNG) which has real text or
            handwriting in it
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept=".jpeg, .png"
            onChange={handleImageChange}
          />
        </div>
        {selectedImage && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className="rounded-lg h-32 w-32 object-cover"
            />
          </div>
        )}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      {data && (
        <div className="bg-white shadow-md max-w-sm rounded-lg p-8">
          <div className="text-lg font-bold mb-4">Data Details</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-700">Text:</div>
              <div className="font-bold">{data}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
