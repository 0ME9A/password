async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copying to clipboard was successful!");
    return true;
  } catch (err) {
    console.error("Could not copy text: ", err);
    return false;
  }
}

export default copyToClipboard;
