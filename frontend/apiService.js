//SPRINT 4
//CENTRALIZA TODA A COMUNICAÇÃO COM BACKEND

//definir rota base da nossa API
const API_BASE_URL = 'http://localhost:3001/api';

//criar um objeto que centraliza as chamadas da API
const api = {
    //busca todos os recursos da API
    // usado para popular os <select>

    async getRecursos() {
        try {
            const response = await fetch(`${API_BASE_URL}/recursos`);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Falha ao buscar recursos: ', error);
            //retorna um array vazio para não quebrar a UI
            return [];
        }
    },

    //busca reservas da API
    //usada para carregar histórico
    async getReservas(usuarioId = null) {
        try {
            let url = `${API_BASE_URL}/reservas`;
            //se um usuarioId for fornecido, filtra as reservas
            if (usuarioId) {
                url += `?usuarioId = ${encodeURIComponent(usuarioId)}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Falha ao buscar reservas: ', error);
            return [];
            }
    },

    //envia recurso para a API
    //usada no formulário de 'Solicitar'
    //@param {object} dadosReserva 
    async createReserva(dadosReserva){
        const response = await fetch(`${API_BASE_URL}/reservas`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dadosReserva)
        });

        //pega a resposta da API (seja sucesso 201 ou erro 409)
        const data = await response.json();

        //se a resposta não foi OK
        if(!response.ok){
            throw new Error(data.message || 'Erro desconhecido ao criar reserva');
        }

        //se foi OK retorna a nova reserva
        return data;
    }

};