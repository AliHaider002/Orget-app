import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Backblack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      d="M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67"
      stroke="#000"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Backblack;
