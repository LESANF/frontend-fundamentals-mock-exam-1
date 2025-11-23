import { Helmet } from 'react-helmet-async';

interface MetaProps {
  userName: string;
  openGraphImageUrl: string;
}

const Meta = ({ userName, openGraphImageUrl }: MetaProps) => {
  console.log('openGraphImageUrl', openGraphImageUrl);
  return (
    <Helmet>
      <title>{`${userName}님의 적금계산기`}</title>
      <meta name="description" content={`${userName}님의 적금계산기`} />
      <meta property="og:title" content={`${userName}님의 적금계산기`} />
      <meta property="og:description" content={`${userName}님의 적금계산기`} />
      <meta property="og:image" content={openGraphImageUrl} />
    </Helmet>
  );
};
export default Meta;
