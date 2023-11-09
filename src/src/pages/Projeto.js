import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { List, FAB, Text, Dialog, Portal, Modal, Button } from 'react-native-paper';

import Container from '../components/Container';
import Body from '../components/Body';

import { getItems, getProjetos } from '../services/ProjetosServicesDB';
import { useIsFocused } from '@react-navigation/native';

const Projeto = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [projeto, setProjeto] = useState([]);
  //Puxar no BD o item
  const [item, setItem] = useState([])

  useEffect(() => {
    getProjetos().then((dados) => {
      setProjeto(dados)
    });
    getItems().then((dados) => {
      setItem(dados)
    })
  }, [isFocused]);

  const renderitem = ({ item }) => (
    <View style={styles.viewBox}>
      <View style={styles.viewList}>
        <List.Item
          title={'Projeto ' + item.nome}
          description={item.descricao}
          left={(props) => <List.Icon {...props} icon="calendar" />}
        />
      </View>
      <View style={styles.button}>
        <Button icon="lead-pencil" color="#45e" mode="elevated" onPress={() => navigation.navigate('novoProjeto', { item })}>Editar</Button>
        <Button icon="eye-outline" color="green" mode="elevated" onPress={showModal}>abrir</Button>
      </View>

    </View>

  );
  //Modal - 4 constantes
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  console.log(item)
  return (

    <Container>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <FlatList
          data={item}
          renderItem={renderitem}
          keyExtractor={(item) => item.id}
        />
        </Modal>
      </Portal>
      <Body>
        <FlatList
          data={projeto}
          renderItem={renderitem}
          keyExtractor={(item) => item.id}
        />
      </Body>
      <FAB
        icon="plus"
        label='Criar projeto'
        style={styles.fab}
        onPress={() => navigation.navigate('novoProjeto')}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#659cf4',
  },
  viewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 0.2
  },
  viewList: {
    width: 260
  },
  button: {
    borderLeftWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default Projeto;
