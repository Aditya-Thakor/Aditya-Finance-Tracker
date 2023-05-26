export const imageBase64 = async (
  file: FileList
): Promise<string | ArrayBuffer | null> => {
  const FILE = new FileReader();

  return new Promise((resolve, rejects) => {
    FILE.readAsDataURL(file[0]);
    FILE.onloadend = () => resolve(FILE.result);
  });
};
