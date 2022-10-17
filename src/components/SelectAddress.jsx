import { useSelector } from "react-redux";
import { Badge, Button, Card, createStyles, Group, Text } from "@mantine/core";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: 400,
    alignSelf: "flex-start",
    marginTop: theme.spacing.xl * 2,
  },
}));

const SelectAddress = () => {
  const { classes } = useStyles();
  const { defaultAddress, isLoading } = useSelector((state) => state.address);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.wrapper}>
      <div>
        <Card>
          <Badge mb={15} color="dark">
            Default Address
          </Badge>
          <Text>
            {defaultAddress?.street}, {defaultAddress?.barangay},{" "}
            {defaultAddress?.city}, {defaultAddress?.province},{" "}
            {defaultAddress?.region}, {defaultAddress?.zip}
          </Text>
          <Group position="right">
            <Button variant="subtle" component={Link} to="/user/address">
              Change Address
            </Button>
          </Group>
        </Card>
      </div>
    </div>
  );
};
export default SelectAddress;
