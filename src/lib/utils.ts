export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getImageDimensions(imgFile: File) {
  const reader = new FileReader();

  const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        const img = new Image();

        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
          });
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = e.target.result;
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(imgFile);
  });

  return dimensions;
}

export function getFileId(str: string) {
  const url = new URL(str);
  const pathname = url.pathname;
  const split = pathname.split('/');
  const fileId = split[split.length - 1];
  return fileId;
}
