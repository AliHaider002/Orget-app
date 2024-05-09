import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function Orgatlogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={199}
      height={62}
      viewBox="0 0 199 62"
      fill="none"
      {...props}>
      <Path fill="url(#pattern0)" d="M0 0H199V62H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use
            xlinkHref="#image0_1_103"
            transform="matrix(.00483 0 0 .0155 0 -.004)"
          />
        </Pattern>
        <Image
          id="image0_1_103"
          width={207}
          height={65}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default Orgatlogo;
