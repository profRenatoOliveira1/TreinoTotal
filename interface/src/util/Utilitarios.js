class Utilitario {

    cleanCPF(cpf) {
        return cpf.replace(/\D/g, '');
    }

    cleanCelular(celular) {
        return celular.replace(/\D/g, '');
    }

    formatarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, "");

        // Aplica a máscara no formato 999.999.999-99
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    formatarCelular(celular) {
        celular = celular.replace(/\D/g, '');

        return celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

}

export default new Utilitario();