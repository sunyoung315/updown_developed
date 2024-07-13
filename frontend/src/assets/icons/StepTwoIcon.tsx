import theme from '@/styles/theme';

const StepTwoIcon = ({ fillColor }: { fillColor: keyof typeof theme }) => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_38_688)">
        <path
          d="M20.9855 0C9.95717 0 0.985504 8.97167 0.985504 20C0.985504 31.0283 9.95717 40 20.9855 40C32.0138 40 40.9855 31.0283 40.9855 20C40.9855 8.97167 32.0138 0 20.9855 0ZM20.9855 36.6667C11.7955 36.6667 4.31884 29.19 4.31884 20C4.31884 10.81 11.7955 3.33333 20.9855 3.33333C30.1755 3.33333 37.6522 10.81 37.6522 20C37.6522 29.19 30.1755 36.6667 20.9855 36.6667ZM17.6522 19.1667C17.6522 20.5467 16.5322 21.6667 15.1522 21.6667C13.7722 21.6667 12.6522 20.5467 12.6522 19.1667C12.6522 17.7867 13.7722 16.6667 15.1522 16.6667C16.5322 16.6667 17.6522 17.7867 17.6522 19.1667ZM29.3188 19.1667C29.3188 20.5467 28.1988 21.6667 26.8188 21.6667C25.4388 21.6667 24.3188 20.5467 24.3188 19.1667C24.3188 17.7867 25.4388 16.6667 26.8188 16.6667C28.1988 16.6667 29.3188 17.7867 29.3188 19.1667ZM24.3188 30C24.3188 31.8417 22.8272 33.3333 20.9855 33.3333C19.1438 33.3333 17.6522 31.8417 17.6522 30C17.6522 28.1583 19.1438 26.6667 20.9855 26.6667C22.8272 26.6667 24.3188 28.1583 24.3188 30ZM12.2888 14.3717C11.9605 14.785 11.4738 15 10.9838 15C10.6205 15 10.2538 14.8817 9.94717 14.6367C9.22717 14.0617 9.10884 13.0133 9.68217 12.295C11.1988 10.39 13.5288 8.85333 15.6155 8.375C16.5005 8.165 17.4055 8.72833 17.6105 9.62833C17.8155 10.525 17.2555 11.4183 16.3572 11.6233C15.0038 11.9333 13.3322 13.0633 12.2905 14.37L12.2888 14.3717ZM32.2888 12.295C32.8622 13.015 32.7422 14.0633 32.0238 14.6367C31.7172 14.88 31.3505 15 30.9872 15C30.4972 15 30.0105 14.785 29.6822 14.3717C28.6405 13.065 26.9672 11.9333 25.6155 11.625C24.7172 11.42 24.1572 10.5267 24.3622 9.63C24.5672 8.73 25.4722 8.16667 26.3572 8.37667C28.4438 8.85333 30.7722 10.3917 32.2905 12.2967L32.2888 12.295Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_38_688">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.985504)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StepTwoIcon;
