import { useSelector } from 'react-redux';
import { Badge, Card, createStyles, Text } from '@mantine/core';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: 400,
    alignSelf: 'flex-start',
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
          <Text>{defaultAddress?.street}</Text>
          <Text>{defaultAddress?.city}</Text>
          <Text>{defaultAddress?.postal_code}</Text>
          <Text>{defaultAddress?.country}</Text>

          <Link color="blue" to="/user/address">
            <Badge
              color="blue"
              style={{ fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Change Address
            </Badge>
          </Link>
        </Card>
      </div>
    </div>
  );
};
export default SelectAddress;
