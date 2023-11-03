import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

const TwitterShare = () => {
  const websiteUrl = "https://password.ome9a.com"; // replace with your website URL
  const text = "Check out this awesome password generator website!"; // replace with your share text
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    websiteUrl
  )}&text=${encodeURIComponent(text)}`;

  return (
    <IconButton
      title="Share on twitter"
      onClick={() => window.open(shareUrl, "_blank")}
    >
      <TwitterIcon />
    </IconButton>
  );
};

export default TwitterShare;
