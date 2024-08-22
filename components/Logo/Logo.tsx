import React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export default function Component({ currentColor = "white" }) {
  return (
    <Svg width="168" height="31" viewBox="0 0 168 31" fill="none">
      <Path
        d="M160.973 13.8903C161.684 13.8903 162.263 14.4679 162.263 15.1799C162.263 15.8919 161.685 16.4695 160.973 16.4695V21.7975C164.621 21.7975 167.591 18.8295 167.591 15.1799C167.591 13.6999 167.101 12.3303 166.277 11.2263C165.069 12.8423 163.141 13.8903 160.973 13.8903Z"
        fill="#E95052"
      />
      <Path
        d="M166.277 11.2265C167.103 10.1225 167.591 8.75448 167.591 7.27288C167.591 3.62488 164.623 0.655273 160.973 0.655273V5.98328C161.684 5.98328 162.263 6.56088 162.263 7.27288C162.263 7.98488 161.685 8.56248 160.973 8.56248C163.141 8.56248 165.069 9.61047 166.277 11.2265Z"
        fill="#55B68C"
      />
      <Path
        d="M166.277 11.2265C165.069 9.61049 163.141 8.5625 160.973 8.5625H157.433V13.8905H160.973C163.141 13.8905 165.069 12.8425 166.277 11.2265Z"
        fill="url(#paint0_linear_421_1853)"
      />
      <Path
        d="M166.277 11.2265C165.069 9.61049 163.141 8.5625 160.973 8.5625H157.433V13.8905H160.973C163.141 13.8905 165.069 12.8425 166.277 11.2265Z"
        fill="#FDC800"
      />
      <Path
        d="M0.408691 30.0889V0.501709H5.29029V30.0873L0.408691 30.0889Z"
        fill={currentColor}
      />
      <Path
        d="M31.0455 17.8984V30.0904H26.1639V27.8216C23.9927 29.26 20.6583 30.4984 17.3351 30.4984C11.1991 30.4984 8.97827 27.2488 8.97827 23.9864C8.97827 20.724 11.4183 17.4632 17.3351 17.4632C20.6583 17.4632 23.9927 18.7144 26.1639 20.1528V17.9C26.1639 13.772 25.5431 11.8856 20.4663 11.8856C15.3895 11.8856 11.4423 14.4088 11.4423 14.4088L9.21508 11.1208C9.21508 11.1208 14.2279 7.88403 20.1191 7.88403C28.6551 7.88403 31.0455 11.8616 31.0455 17.8984ZM26.1639 23.5608C24.2759 22.0888 21.4951 20.7208 18.5543 20.7208C15.1591 20.7208 13.8615 22.2392 13.8615 23.9864C13.8615 25.7336 15.8967 27.2472 18.5543 27.2472C21.4951 27.2472 24.2759 25.9096 26.1639 24.4376V23.5608Z"
        fill={currentColor}
      />
      <Path
        d="M68.6184 8.30469L62.6647 30.0871H54.4104L50.66 16.3687L46.9096 30.0871H38.6552L32.7 8.30469H39.3175L42.7783 20.9751L46.2344 8.30469H55.0648L58.5336 20.9607L62.0039 8.30469H68.6184Z"
        fill={currentColor}
      />
      <Path
        d="M91.7334 17.8984V30.0904H85.311V28.6984C83.2534 29.7256 80.639 30.4984 78.023 30.4984C71.8886 30.4984 69.6694 27.2488 69.6694 23.9864C69.6694 20.4488 72.5734 17.4632 78.0262 17.4616C80.6422 17.4616 83.2582 18.2408 85.3142 19.2728V17.8984C85.3142 14.3528 85.1494 13.4248 81.1574 13.4248C76.623 13.4248 72.9974 15.6856 72.9622 15.708L69.9062 11.1208C69.9062 11.1208 74.919 7.88403 80.8102 7.88403C89.3446 7.88563 91.7334 11.8616 91.7334 17.8984ZM85.3126 23.9992C84.0246 23.1992 82.0326 22.2632 79.7686 22.2632C77.6582 22.2632 76.0902 22.5624 76.0902 23.9864C76.0902 24.9288 77.4806 25.7064 79.7686 25.7064C81.5542 25.7064 83.551 25.0824 85.3126 23.9992Z"
        fill={currentColor}
      />
      <Path
        d="M96.0278 30.0888V0.5H102.45V30.0872H96.0278V30.0888Z"
        fill={currentColor}
      />
      <Path
        d="M107.053 30.0888V0.5H113.476V30.0872H107.053V30.0888Z"
        fill={currentColor}
      />
      <Path
        d="M139.548 19.1992C139.548 19.5656 139.522 19.948 139.486 20.3336H122.367C122.818 22.6072 124.574 25.46 128.19 25.4728C131.55 25.4728 134.212 22.6136 134.231 22.5848L138.7 25.3128C138.7 25.3128 135.278 30.5 127.838 30.5C119.076 30.5 116.13 23.9224 116.13 19.2008C116.13 14.4808 119.076 7.90161 127.838 7.90161C136.602 7.90001 139.548 14.4792 139.548 19.1992ZM132.972 15.6152C132.972 15.6152 131.858 12.7064 127.847 12.7064C123.836 12.7064 123.158 15.6152 123.158 15.6152H132.972Z"
        fill={currentColor}
      />
      <Path
        d="M156.431 28.0584C156.431 28.0584 153.07 30.4984 150.39 30.4984C143.658 30.4984 143.658 24.772 143.658 20.1736V13.6376H140.778V8.30637H143.658V2.53037L150.081 0.503174V8.30637H155.177V13.6376H150.081V20.1752C150.081 22.268 150.081 25.0744 151.772 25.0744C153.246 25.0728 155.092 24.1 155.092 24.1L156.431 28.0584Z"
        fill={currentColor}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_421_1853"
          x1="162.071"
          y1="9.16745"
          x2="161.75"
          y2="14.2723"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFAA19" />
          <Stop offset="1" stopColor="#FDC800" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
