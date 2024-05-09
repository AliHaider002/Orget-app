import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SettingIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}>
    <Path
      d="m14 1.167 11.083 6.416v12.834L14 26.833 2.917 20.417V7.583L14 1.167Zm0 2.696L5.25 8.928v10.143L14 24.137l8.75-5.066V8.928L14 3.863Zm0 14.804a4.666 4.666 0 1 1 0-9.333 4.666 4.666 0 0 1 0 9.333Zm0-2.334a2.333 2.333 0 1 0 0-4.666 2.333 2.333 0 0 0 0 4.666Z"
      fill="#2F4858"
    />
  </Svg>
);

export default SettingIcon;
