import { TkCard } from '@takeoff-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <TkCard>
      <div className="text-lg">
        <p className="mb-4">
          Bu uygulama komponentlerimizi react üzerinden test edebilmek amacıyla
          oluşturulmuştur.
        </p>
        <p>
          - Eğer yeni bir komponent geliştiriyorsanız veya mevcut komponente bir
          feature ekliyorsanız&nbsp;
          <Link to="components" className="text-red-600 hover:text-red-600">
            Components
          </Link>
          &nbsp; alanını kullanabilirsiniz. Üzerinde çalıştığınız komponent
          burada yok ise kendiniz ekleme yapın.
        </p>
        <p>
          - Eğer birden fazla komponentin bir arada kullanıldığı senaryoları
          denemek istiyorsanız &nbsp;
          <Link to="examples" className="text-red-600 hover:text-red-600">
            Examples
          </Link>
          &nbsp; bölümüne ilgili örnek için bir ekleme yaparak testlerinizi
          yapabiliriz.
        </p>
      </div>
    </TkCard>
  );
}

export default Home;
