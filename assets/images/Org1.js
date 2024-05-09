import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function Org1(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={117}
      height={52}
      viewBox="0 0 117 52"
      fill="none"
      {...props}>
      <Path
        fill="url(#pattern0)"
        d="M0.545864 0.492767H116.48786399999999V51.700467H0.545864z"
      />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_1_40" transform="scale(.00833 .01887)" />
        </Pattern>
        <Image
          id="image0_1_40"
          width={120}
          height={53}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default Org1;
