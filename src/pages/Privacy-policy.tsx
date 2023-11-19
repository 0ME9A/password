import { Typography, Container, useTheme, Link } from "@mui/material";
import { Helmet } from "react-helmet";

import React from "react";

interface Props {
  lastUpdated: string;
  contactInformation: string;
}

const PrivacyPolicy: React.FC<Props> = ({
  lastUpdated,
  contactInformation,
}) => {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <Container maxWidth="md" sx={{ color: palette.text.secondary }}>
      <Helmet>
        <title>Password Generator - Privacy Policy</title>
        <meta
          name="description"
          content="Read our Privacy Policy to understand how we handle your data securely on our website and extension."
        />
        <link
          rel="canonical"
          href="https://password.ome9a.com/privacy-policy"
        />
      </Helmet>

      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography paragraph>Last Updated: {lastUpdated}</Typography>

      <Typography variant="h6" gutterBottom>
        Overview
      </Typography>

      <Typography paragraph>
        We <b>OMEGASTRIKES</b> operates{" "}
        <b>Password Generator website and browser extension</b>. This page
        informs you of our policies regarding the usage of the Service.
      </Typography>

      <Typography paragraph>
        We do not collect or store any personally identifiable information on
        our servers. All data processing, including password generation, happens
        locally within your browser. We only retain collected information for as
        long as necessary to provide you with your requested service. What data
        we store, we’ll protect within commercially acceptable means to prevent
        loss and theft, as well as unauthorized access, disclosure, copying, use
        or modification.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Data Handling on the Client Side
      </Typography>

      <Typography paragraph>
        While using our Service, no personally identifiable information is
        collected or stored on our servers. All data processing, including
        password generation, happens locally within your browser.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Log Data
      </Typography>

      <Typography paragraph>
        We may collect information that your browser sends whenever you visit
        our Service ("Log Data"). This Log Data may include information such as
        your computer's Internet Protocol ("IP") address, browser type, browser
        version, the pages of our Service that you visit, the time and date of
        your visit, the time spent on those pages, and other statistics.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Cookies
      </Typography>

      <Typography paragraph>
        The Service may use "cookies" to enhance the user experience. You can
        instruct your browser to refuse all cookies or to indicate when a cookie
        is being sent. However, if you do not accept cookies, some features of
        the Service may not function properly.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Security
      </Typography>

      <Typography paragraph>
        While we take measures to ensure the security of our Service, please be
        aware that no method of transmission over the Internet, or method of
        electronic storage, is 100% secure. The Service operates solely on the
        client/browser side, and no user data is stored on our servers.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Changes to This Privacy Policy
      </Typography>

      <Typography paragraph>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </Typography>

      <Typography paragraph>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>

      <Typography paragraph>
        If you have any questions about this Privacy Policy, please contact us.
      </Typography>

      <Typography paragraph>
        <Link
          sx={{ color: palette.text.primary, fontWeight: "bold" }}
          href={`mailto:${contactInformation}`}
        >
          {contactInformation}
        </Link>
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
