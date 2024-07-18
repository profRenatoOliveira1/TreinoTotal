import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import GymWeight from '../../assets/gym-weight.png';
import { useNavigation } from '@react-navigation/native';
import jsonTreino from '../../assets/data.json';

const ListaTreinoBonita = () => {
    const navigation = useNavigation();
    const [treinos, setTreinos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulando busca assíncrona dos dados
                // Substitua esta linha pela chamada real à API
                // const listaTreinos = await TreinoAPIRequest.buscarTreinoAluno(4);
                
                // Aqui, usamos os dados do arquivo JSON para exemplo
                setTreinos(jsonTreino);
                console.log(treinos);
            } catch (error) {
                console.error('Erro ao buscar treinos: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <StatusBar />
            <View style={styles.topbar}>
                <Text style={styles.textMenu}>FICHA DE TREINO</Text>
            </View>
            {treinos.length > 0 && (
                <View style={styles.infoBase}>
                    <View style={styles.professor}>
                        <Text style={styles.titulo}>PROFESSOR</Text>
                        <Text style={styles.nome}>{treinos[0].nomeprofessor}</Text>
                    </View>
                    <View style={styles.aluno}>
                        <Text style={styles.titulo}>ALUNO</Text>
                        <Text style={styles.nome}>{treinos[0].nomealuno}</Text>
                    </View>
                </View>
            )}
            <Text style={styles.tituloExercicios}>EXERCÍCIOS</Text>
            <ScrollView style={styles.scrollContainer}>
                {treinos.map((exercicio, index) => (
                    <TouchableOpacity key={index} style={styles.exercicio} onPress={() => navigation.navigate('InfoExercicio', { exercicio })}>
                        <Image source={GymWeight} style={styles.imagem} />
                        <View>
                            <Text style={styles.descricao}>{exercicio.exercicio}</Text>
                            <Text style={styles.descricao}>Repetições: {exercicio.repeticoes}</Text>
                            <Text style={styles.descricao}>Máq.: {exercicio.nomeaparelho}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    topbar: {
        flex: 0.1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#0512DB',
        alignItems: 'center'
    },
    textMenu: {
        color: '#fff',
        width: '100%',
        fontSize: 20,
        backgroundColor: '#0512DB',
        textAlign: 'center',
    },
    infoBase: {
        flexDirection: 'row',
        paddingTop: '5%',
        paddingBottom: '5%',
        maxHeight: 100,
        backgroundColor: '#333',
    },
    professor: {
        flex: 1,
        alignItems: 'center',
    },
    aluno: {
        flex: 1,
        alignItems: 'center',
    },
    titulo: {
        color: '#DBAF04',
        fontWeight: 'bold',
    },
    nome: {
        paddingTop: '5%',
        color: '#eee',
    },
    tituloExercicios: {
        textAlign: 'center',
        color: '#DBAF04',
        fontWeight: 'bold',
        paddingVertical: '5%',
        backgroundColor: '#333',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    exercicio: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '92%',
        height: 80,
        marginVertical: '5%',
        marginLeft: '4%',
        backgroundColor: '#0512DB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0512DB',
    },
    imagem: {
        width: 50,
        height: 50,
        marginHorizontal: '4%',
        tintColor: '#ccc',
    },
    descricao: {
        marginLeft: '5%',
        color: 'white',
    },
});

export default ListaTreinoBonita;
