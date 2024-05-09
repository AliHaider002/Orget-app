import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Close(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 14 14"
      fill="none"
      {...props}>
      <Path
        d="M11.667 2.333l-9.334 9.334m9.334 0L2.333 2.333l9.334 9.334z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Close;
