import { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view'

export function BannerCard() {
    const pagerRef = useRef<PagerView>(null);
    const totalPages = 2;

    // Array com os caminhos das imagens
    const bannerImages = [
        require('../../assets/creditCard.png'),
        require('../../assets/card3.png'),
    ];

    // Estado para controlar a página ativa
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          // Atualiza o índice para a próxima página
          setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
        }, 2500);
    
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
      }, []);
    
      // Atualiza a página no PagerView sempre que o pageIndex mudar
      useEffect(() => {
        if (pagerRef.current) {
          pagerRef.current.setPage(pageIndex); // Garante que setPage existe e é chamado apenas quando pagerRef está definido
        }
      }, [pageIndex]);

    return (
        <View className='items-center justify-center w-full mx-10'>
            {/* Aplicamos o style direto no componente pois ele n reconhece o className */}
            <PagerView ref={pagerRef} style={{ width: '100%', height: 200}} initialPage={0}>
                {bannerImages.map((image, index) => (
                    <Pressable 
                        key={index}
                        onPress={() => console.log(`Clicou no Banner ${index + 1}`)}
                    >
                        <Image
                            source={image}
                            style={{width: 250, height: 160, borderRadius: 10}}
                        />
                    </Pressable>
                ))}
            </PagerView>
        </View>
    );
}