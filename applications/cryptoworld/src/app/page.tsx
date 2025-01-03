import Banner from '../components/Banner/Banner';
import Contents from '../components/Contents/Contents';
import { ImageIndexProvider } from '../contexts/ImageIndexContext';

export default function Home() {
  return (
    <ImageIndexProvider>
      <Banner />
      <Contents />
    </ImageIndexProvider>
  );
}
