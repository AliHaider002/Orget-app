import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Forward = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      d="M12.025 4.941 17.084 10l-5.059 5.058M2.917 10h14.025"
      stroke="#1A1824"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Forward;
