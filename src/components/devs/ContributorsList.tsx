import { useGetContributorsQuery } from "../../RTK/RTKQuery/contributors";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ContributorsList = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetContributorsQuery("0ME9A/password");
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const palette = theme.palette;

  return (
    <Box
      component={"section"}
      sx={{
        mt: 5,
        p: small ? 1 : 2,
        borderRadius: 3,
        bgcolor: palette.background.paper,
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          pt: 1,
          color: palette.text.primary,
        }}
      >
        Contributors
      </Typography>
      <Typography
        variant="h1"
        component="p"
        gutterBottom
        sx={{
          fontSize: "1rem",
          pb: 2,
          fontWeight: "light",
          color: palette.text.secondary,
        }}
      >
        These are the our valuable contributors/team members who made this
        project possible.
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">
          Error: {!error ? error : "Unknown?"}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {data?.map((item) => (
            <Grid item md={4} sm={6} xs={12} key={item.login}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: `0 0 5px ${palette.primary.main}`,
                  "&:hover": {
                    boxShadow: `0 3px 10px ${palette.primary.main}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={`https://github.com/${item.login}.png`}
                />
                <CardContent sx={{ pb: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ fontSize: "1.4rem" }}
                  >
                    {item.login}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    target="_blank"
                    variant="contained"
                    href={`https://devfinder.ome9a.com/${item.login}`}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    target="_blank"
                    variant="outlined"
                    href={`https://github.com/${item.login}`}
                  >
                    GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ContributorsList;
