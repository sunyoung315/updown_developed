import theme from '@/styles/theme';

const StepThreeIcon = ({ fillColor }: { fillColor: keyof typeof theme }) => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_38_672)">
        <path
          d="M17.4106 15.8333C17.4106 16.3278 17.264 16.8111 16.9893 17.2223C16.7146 17.6334 16.3242 17.9538 15.8673 18.143C15.4105 18.3323 14.9079 18.3818 14.4229 18.2853C13.938 18.1888 13.4925 17.9507 13.1429 17.6011C12.7932 17.2515 12.5551 16.806 12.4587 16.3211C12.3622 15.8361 12.4117 15.3334 12.6009 14.8766C12.7902 14.4198 13.1106 14.0294 13.5217 13.7547C13.9328 13.48 14.4162 13.3333 14.9106 13.3333C15.5737 13.3333 16.2096 13.5967 16.6784 14.0656C17.1472 14.5344 17.4106 15.1703 17.4106 15.8333ZM26.5773 13.3333C26.0828 13.3333 25.5995 13.48 25.1884 13.7547C24.7773 14.0294 24.4568 14.4198 24.2676 14.8766C24.0784 15.3334 24.0289 15.8361 24.1253 16.3211C24.2218 16.806 24.4599 17.2515 24.8095 17.6011C25.1592 17.9507 25.6046 18.1888 26.0896 18.2853C26.5745 18.3818 27.0772 18.3323 27.534 18.143C27.9908 17.9538 28.3813 17.6334 28.656 17.2223C28.9307 16.8111 29.0773 16.3278 29.0773 15.8333C29.0773 15.1703 28.8139 14.5344 28.3451 14.0656C27.8762 13.5967 27.2403 13.3333 26.5773 13.3333ZM40.744 20C40.744 23.9556 39.571 27.8224 37.3734 31.1114C35.1757 34.4004 32.0522 36.9638 28.3976 38.4776C24.7431 39.9913 20.7218 40.3874 16.8422 39.6157C12.9625 38.844 9.39888 36.9392 6.60183 34.1421C3.80478 31.3451 1.89997 27.7814 1.12826 23.9018C0.356556 20.0222 0.752623 16.0009 2.26638 12.3463C3.78013 8.69181 6.34358 5.56824 9.63256 3.37061C12.9215 1.17298 16.7883 0 20.744 0C26.0465 0.00573514 31.1303 2.11471 34.8798 5.8642C38.6293 9.61368 40.7382 14.6974 40.744 20ZM37.4106 20C37.4106 16.7036 36.4332 13.4813 34.6018 10.7405C32.7704 7.99968 30.1675 5.86347 27.122 4.60201C24.0766 3.34055 20.7255 3.01049 17.4925 3.65358C14.2594 4.29667 11.2897 5.88401 8.95885 8.21489C6.62798 10.5458 5.04063 13.5155 4.39755 16.7485C3.75446 19.9815 4.08451 23.3326 5.34597 26.3781C6.60744 29.4235 8.74364 32.0265 11.4845 33.8578C14.2253 35.6892 17.4476 36.6667 20.744 36.6667C25.1628 36.6618 29.3992 34.9043 32.5237 31.7798C35.6483 28.6552 37.4058 24.4188 37.4106 20Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_38_672">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.743958)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StepThreeIcon;
