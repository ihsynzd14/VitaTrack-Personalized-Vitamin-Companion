import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar} from 'react-native-paper';

const AppBar = (props) => {
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header className="bg-black-dark">
      {props.name !== 'Home' && <Appbar.BackAction color="white" onPress={_goBack} />}
      <Appbar.Content titleStyle={{ color: 'white' }} title={props.name}/>
      <Appbar.Action color='white' icon="magnify" onPress={_handleSearch} />
      <Appbar.Action color='white' icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};



export default AppBar;
