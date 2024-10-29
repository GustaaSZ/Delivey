import { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view'

export function Banner() {
    const pagerRef = useRef<PagerView>(null);
    const totalPages = 5;

    // Array com os caminhos das imagens
    const bannerImages = [
        require('../../assets/banner1.png'),
        require('../../assets/banner2.png'),
        require('../../assets/banner3.png'),
        require('../../assets/banner4.png'),
        require('../../assets/banner5.png')
    ];

    // Estado para controlar a página ativa
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          // Atualiza o índice para a próxima página
          setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
        }, 3000);
    
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
      }, []);
    
      // Atualiza a página no PagerView sempre que o pageIndex mudar
      useEffect(() => {
        if (pagerRef.current) {
          pagerRef.current.setPage(pageIndex); // Garante que setPage existe e é chamado apenas quando pagerRef está definido
        }
      }, [pageIndex]);

    return (
        <View className='w-full h-36 md:h-60 rounded-2xl mt-8 mb-4'>
            {/* Aplicamos o style direto no componente pois ele n reconhece o className */}
            <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0} pageMargin={14}>
                {bannerImages.map((image, index) => (
                    <Pressable 
                        className='w-full h-36 rounded-2xl' 
                        key={index}
                        onPress={() => console.log(`Clicou no Banner ${index + 1}`)}
                    >
                        <Image
                            source={image}
                            className='w-full h-36 md:h-60 rounded-2xl'
                        />
                    </Pressable>
                ))}
            </PagerView>
        </View>
    );
}