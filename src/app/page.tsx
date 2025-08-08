import Presentation from '@/components/presentation';
import { getMediaFiles } from '@/lib/server-utils';

export default async function Home() {
  const mediaFiles = await getMediaFiles();
  return <Presentation mediaFiles={mediaFiles} />;
}
