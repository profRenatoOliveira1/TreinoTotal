import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, StatusBar } from 'react-native';
import { IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

function InfoExercicio() {
    const navigation = useNavigation();
    const route = useRoute();

    const { exercicio } = route.params;

    return (
        <>
            <StatusBar />
            <View style={bar.topbar}>
                <IconButton
                    icon="keyboard-backspace"
                    onPress={() => navigation.navigate('ListaTreino')}
                    iconColor="#eee"
                />
                <Text style={bar.textMenu}>EXERCÍCIO</Text>
            </View>
            <View style={painel.container}>
                <Text style={painel.header}>Detalhes do exercício</Text>
                <View style={painel.info}>
                    <Text style={painel.titulo}>Exercício:</Text>
                    <Text style={painel.descricao}>{exercicio.exercicio}</Text>
                </View>
                <View style={painel.info}>
                    <Text style={painel.titulo}>Repetições:</Text>
                    <Text style={painel.descricao}>{exercicio.repeticoes}</Text>
                </View>
                <View style={painel.info}>
                    <Text style={painel.titulo}>Máquina:</Text>
                    <Text style={painel.descricao}>{exercicio.nomeaparelho}</Text>
                </View>
                <View style={painel.info}>
                    <Text style={painel.titulo}>Carga:</Text>
                    <Text style={painel.descricao}>{exercicio.carga}</Text>
                </View>
                {/* <Text style={painel.lista}>Repetições: {exercicio.repeticoes}</Text>
                <Text style={painel.lista}>Máquina: {exercicio.nomeaparelho}</Text>
                <Text style={painel.lista}>Carga: {exercicio.carga} kg</Text> */}
            </View>
            <WebView
                style={{ flex: 1, alignItems: 'center' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo={true}
                source={{ uri: `https://www.youtube.com/embed/${exercicio.video}` }}
            />

        </>
    );
}

const bar = StyleSheet.create({
    topbar: {
        flex: 0.15,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#0512DB',
        alignItems: 'center'
    },
    textMenu: {
        color: '#fff',
        width: "100%",
        height: '100%',
        fontSize: 20,
        backgroundColor: '#0512DB',
        color: '#eee',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 0,
        padding: 0,
    },
    scrollContainer: {
        flex: 0.8,
        width: "100%",
        backgroundColor: '#ddd'
    },
});

const painel = StyleSheet.create({
    container: {
        flex: 0.9,
        width: "100%",
        backgroundColor: '#333',
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 15,
        color: '#ddd',
    },
    titulo: {
        width: '30%',
        height: 40,
        paddingLeft: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#ddd',
    },
    descricao: {
        width: '70%',
        height: 40,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#ddd',
    },
    info: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default InfoExercicio;