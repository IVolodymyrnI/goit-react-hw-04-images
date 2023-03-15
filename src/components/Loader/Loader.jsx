import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrapper } from './LoaderStyle';

export function Loader() {
  return (
    <LoaderWrapper>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </LoaderWrapper>
  );
}
