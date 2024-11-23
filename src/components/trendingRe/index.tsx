import { View, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { ItemRestaurant } from './restaurant';

// Criando uma tipagem dos dados
export interface RestaurantProps {
    id: string; 
    name: string; 
    image: string;
    imageLocal: string;
}

export function TrendingRestaurants() {

   // queremos add as comidas numa lista para poder listalas horizontalmente
    // Criamos uma estrutua para armazernar as comidas com um array vazio -> ([])
    // useState recebe uma lista e cada objeto da lista terá os atributos do FoodProps
    const [restaurants, setRestaurantes] = useState<RestaurantProps[]>([])

    // Fazendo a Listagem
    // []) -> Quando vazio o array de dependencias o array será chamado e quando chamado, buscaremos da API, usando Async
    // Await espera
    // Usamos o Ipv4 obtido no cmd na máquina no lugar do localhost do endereço da API: 192.168.1.12
    useEffect(() => {
        // Função anônima
        async function getRestaurants() {
            // Requisição HTTP (Busca da API)
            const response = await fetch("http://192.168.1.30:3000/restaurants")
            // 192.168.1.12
            // Transformando o response em json que agora será armazenado no data
            const data = await response.json()
            // console.log(data) // -> Usado pra verificar se os dados do Json estão sendo listados
            setRestaurantes(data); // PASSANDO o data para o useState
        }
        getRestaurants();
    }, [])

    return (
        // restaurants = array de objetos na qual os objetos possuem os atributos listados em RestaurantProps
        <FlatList
            data={restaurants} // passando dentro do data o useState -> a lista dos componentes
            renderItem={ ({ item }) => <ItemRestaurant restaurant={ item } /> } // renderizar um componente do ItemFood item por item
            horizontal={ true } // fazendo com que essa lista seja horizontal
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}// Adicionando espaçamento entre os elementos da lista
            showsHorizontalScrollIndicator={false}
        />
    );
}