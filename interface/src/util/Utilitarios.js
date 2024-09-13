class Utilitario {

    cleanCPF(cpf) {
        return cpf.replace(/\D/g, '');
    }

    cleanCelular(celular) {
        return celular.replace(/\D/g, '');
    }

}

export default new Utilitario();