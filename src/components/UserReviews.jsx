import {
  Button,
  Container,
  createStyles,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import image1 from "../assets/images/product-1.jpg";
import image2 from "../assets/images/product-7.jpg";
import image3 from "../assets/images/product-3.jpg";

const useStyles = createStyles((theme) => ({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 481px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  },

  imgContainer: {
    marginRight: "1rem",
    flex: 1,
    marginBottom: "1rem",

    "@media (min-width: 481px)": {
      width: 220,
      marginRight: "1rem",
      flex: 1,
    },
  },
}));

const UserReviews = () => {
  const { classes } = useStyles();

  return (
    <>
      <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
        My Reviews
      </Text>
      <Paper shadow="sm" p="lg" mb={20} withBorder>
        <div className={classes.reviewContainer}>
          <div className={classes.imgContainer}>
            <Image src={image1} />
            <Text my={20} align="center">
              Lorem, ipsum dolor.
            </Text>
            <Button fullWidth>View Product</Button>
          </div>
          <div style={{ flex: 2 }}>
            <Text weight={500} mb={10}>
              Review:
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quas quibusdam repudiandae architecto delectus magni
              odio maxime quidem! Error, obcaecati. Quis, exercitationem
              accusantium. Sapiente quidem odio ducimus dolorum fuga quia nobis
              dolore vero est porro laudantium, asperiores ex sequi suscipit
              iure optio nesciunt harum minima atque labore molestias possimus
              dolores consequuntur.
            </Text>
          </div>
        </div>
      </Paper>

      <Paper shadow="sm" p="lg" mb={20} withBorder>
        <div className={classes.reviewContainer}>
          <div className={classes.imgContainer}>
            <Image src={image2} />
            <Text my={20} align="center">
              Lorem, ipsum dolor.
            </Text>
            <Button fullWidth>View Product</Button>
          </div>
          <div style={{ flex: 2 }}>
            <Text weight={500} mb={10}>
              Review:
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quas quibusdam repudiandae architecto delectus magni
              odio maxime quidem! Error, obcaecati. Quis, exercitationem
              accusantium.
            </Text>
          </div>
        </div>
      </Paper>

      <Paper shadow="sm" p="lg" mb={20} withBorder>
        <div className={classes.reviewContainer}>
          <div className={classes.imgContainer}>
            <Image src={image3} />
            <Text my={20} align="center">
              Lorem, ipsum dolor.
            </Text>
            <Button fullWidth>View Product</Button>
          </div>
          <div style={{ flex: 2 }}>
            <Text weight={500} mb={10}>
              Review:
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quas quibusdam repudiandae architecto delectus magni
              odio maxime quidem!
            </Text>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default UserReviews;
