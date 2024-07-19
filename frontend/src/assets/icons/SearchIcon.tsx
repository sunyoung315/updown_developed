import theme from '@/styles/theme';

const SearchIcon = ({ color }: { color: keyof typeof theme }) => {
  const fillColor = theme[color];

  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_33_767)">
        <path
          d="M12.7622 11.6162L10.2461 9.09898C12.1288 6.58306 11.6154 3.01727 9.09951 1.13458C6.58359 -0.748098 3.0178 -0.234752 1.13512 2.28117C-0.747564 4.79709 -0.234218 8.36288 2.2817 10.2456C4.3027 11.7579 7.07849 11.7579 9.09951 10.2456L11.6167 12.7627C11.933 13.0791 12.4459 13.0791 12.7622 12.7627C13.0785 12.4464 13.0785 11.9336 12.7622 11.6172L12.7622 11.6162ZM5.71158 9.75972C3.47555 9.75972 1.66291 7.94708 1.66291 5.71105C1.66291 3.47502 3.47555 1.66238 5.71158 1.66238C7.94761 1.66238 9.76025 3.47502 9.76025 5.71105C9.75787 7.94607 7.94663 9.75734 5.71158 9.75972Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_33_767">
          <rect width="13" height="13" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
