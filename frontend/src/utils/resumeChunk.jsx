// Utility to render item content as HTML string
export const renderContent = (item) => `<>${item.text}</>`;

// Utility to estimate the height of an item by rendering it temporarily
export const estimateHeight = (item) => {
  const tempElement = document.createElement("div");
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  tempElement.style.width = "794px";
  tempElement.innerHTML = renderContent(item);

  document.body.appendChild(tempElement);
  const height = tempElement.getBoundingClientRect().height;
  document.body.removeChild(tempElement);

  return height;
};

// Utility to chunk content into sections that fit within a single page
export const chunkContent = (content) => {
  // Ensure content is an array
  if (!Array.isArray(content)) {
    throw new Error("Content must be an array");
  }

  const chunks = [];
  let currentChunk = [];
  let currentHeight = 0;
  const maxHeight = 1123; // The height of one page

  content.forEach((item) => {
    const itemHeight = estimateHeight(item);
    if (currentHeight + itemHeight > maxHeight) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentHeight = 0;
    }
    currentChunk.push(item);
    currentHeight += itemHeight;
  });

  if (currentChunk.length) {
    chunks.push(currentChunk);
  }

  return chunks;
};
