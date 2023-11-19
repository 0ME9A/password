import {
  Typography,
  Container,
  Link,
  useTheme,
  ListItem,
  List,
  ListItemText,
} from "@mui/material";
import { Helmet } from "react-helmet";

import React from "react";

const AboutPage: React.FC = () => {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <Container maxWidth="md" sx={{ color: palette.text.secondary }}>
      <Helmet>
        <title>Password Generator - About</title>
        <meta
          name="description"
          content="Learn more about the Password Generator project and its features."
        />
        <link rel="canonical" href="https://password.ome9a.com/about" />
      </Helmet>

      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h6" gutterBottom>
        Website Overview
      </Typography>
      <Typography paragraph>
        Welcome to <b>Password Generator</b>! We are dedicated to providing a
        seamless online experience for our users. Our website offers a
        user-friendly platform for generating strong and secure passwords with
        customizable options.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Extension Overview
      </Typography>
      <Typography paragraph>
        Our extension, the Password Generator, is an additional tool designed to
        enhance your online security. It provides similar features to our
        website, allowing you to generate strong and unique passwords. The
        extension operates on the client/browser side, prioritizing user
        privacy.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Key Features
      </Typography>

      <List>
        <ListItem>
          <ListItemText>
            <Typography>
              <strong>Website Password Generation:</strong>
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Customize passwords based on length, complexity, and
                    additional security measures.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Copy generated passwords to your clipboard for immediate
                    use.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Access password history and manage generated passwords.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <Typography>
              <strong>Extension Features:</strong>
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Similar customization options for password generation.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Operates on the client/browser side for enhanced privacy.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography>
                    - Easily accessible through the extension icon.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </ListItemText>
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom>
        How to Get Started
      </Typography>
      <Typography paragraph>
        To generate passwords, visit our{" "}
        <Link
          href="https://password.ome9a.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Password Generator
        </Link>{" "}
        website or install our Password Generator extension for Chrome and Edge.
        For more details and installation instructions, visit our{" "}
        <Link
          href="https://github.com/0ME9A/password"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </Link>
        .
      </Typography>

      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>

      <Typography paragraph>
        If you have any questions, feedback, or concerns, please feel free to
        reach out to us. You can contact us through our{" "}
        <Link
          href="https://github.com/0ME9A/password"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </Link>{" "}
        or via email at{" "}
        <Link href="mailto:heyome9a@gmail.com">heyome9a@gmail.com</Link>.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Learn More
      </Typography>
      <Typography paragraph>
        Explore our project on GitHub to stay updated with the latest
        developments and contribute to the community.
      </Typography>
      <Link
        href="https://github.com/0ME9A/password"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography>GitHub Repository</Typography>
      </Link>
    </Container>
  );
};

export default AboutPage;
