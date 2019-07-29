export default (src: string) => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = function() {
      resolve({
        width: (this as HTMLImageElement).width,
        height: (this as HTMLImageElement).height,
      });
    };
    img.src = src;
  });
};
