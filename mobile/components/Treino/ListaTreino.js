import TreinoAPIRequest from "../../controller/TreinoAPIRequest";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { IconButton } from "react-native-paper";

export default ListaTreino = () => {
    const [treinos, setTreinos] = useState([]);

    useEffect(() => {
        // método assíncrono para buscar os dados
        const fetchData = async () => {
            try {
                // chama a função buscarAlunos do arquivo AlunoAPIService
                const listaTreinos = await TreinoAPIRequest.buscarTreinoAluno(4);
                console.log(listaTreinos);
                // atualiza a lista de alunos
                setTreinos(listaTreinos);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        fetchData();
    }, []);

    const voltar = () => {
        console.log('clicou');
    }

    return (
        <>
            <StatusBar />
            <View style={styles.topbar}>
                <IconButton
                    icon="keyboard-backspace"
                    onPress={voltar}
                    iconColor="#fff"
                />
                <Text style={styles.textMenu}>FICHA DE TREINO</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.infoTreino}>
                        <Text style={styles.title}>Professor</Text>
                        {/* <Text>{treinos[0].nomeprofessor}</Text> */}
                        <Text>ROBERVAL DA SILVA SAURO</Text>
                        <Text style={styles.title}>Aluno</Text>
                        {/* <Text>{treinos[0].nomealuno}</Text> */}
                        <Text>CLEOSVALDO SOUZA</Text>
                        <Text style={styles.title}>Exercícios</Text>
                    </View>
                    {treinos.map((item, index) => (
                        <View key={index} style={styles.listaTreino}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>Exercício:</Text> 
                                <Text style={{paddingLeft: '2%'}}>{item.exercicio}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>Repetições:</Text> 
                                <Text style={{paddingLeft: '2%'}}>{item.repeticoes}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>Carga:</Text> 
                                <Text style={{paddingLeft: '2%'}}>{item.carga} kg</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>Região Ativada:</Text> 
                                <Text style={{paddingLeft: '2%'}}>{item.regiaocorpoativada}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>Aparelho:</Text> 
                                <Text style={{paddingLeft: '2%'}}>{item.nomeaparelho}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    topbar: {
        flex: 0.075,
        flexDirection: 'row',
        width: "100%",
        backgroundColor: '#A63C06',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: "100%",
        // paddingLeft: "5%",
    },
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    infoTreino: {
        paddingLeft: "5%",
    },
    title: {
        marginTop: "5%",
        color: '#A63C06',
        fontWeight: 'bold',
        fontSize: 20,
    },
    listaTreino: {
        marginTop: "3%",
        paddingLeft: "5%",
    },
    treino: {
        flexDirection: 'row',
    },
    textMenu: {
        color: '#fff',
        width: "100%",
        height: '100%',
        fontSize: 20,
        backgroundColor: '#A63C06',
        // textAlign: 'center',
        paddingLeft: "20%",
        textAlignVertical: 'center',
    },
});