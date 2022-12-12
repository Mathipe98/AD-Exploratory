const fileToBase64 = async (file: File) => {
  try {
    const result = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });

    return result as string;
  } catch (error) {
    alert('Error converting file to base64');
    console.error(error);
  }
};

export { fileToBase64 };
