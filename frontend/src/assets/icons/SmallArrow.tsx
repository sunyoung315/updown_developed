const SmallArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <svg
        width="10"
        height="5"
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.40591 2.72449C4.35279 2.77676 4.2896 2.81824 4.21997 2.84655C4.15034 2.87486 4.07565 2.88944 4.00022 2.88944C3.92479 2.88944 3.85011 2.87486 3.78048 2.84655C3.71085 2.81824 3.64765 2.77676 3.59453 2.72449L0.977539 0.164947C0.92442 0.112681 0.861223 0.0711959 0.791594 0.0428855C0.721964 0.0145751 0.647279 -3.64954e-08 0.571848 -3.31982e-08C0.496417 -2.9901e-08 0.421733 0.0145752 0.352103 0.0428855C0.282473 0.0711959 0.219276 0.112681 0.166157 0.164947C0.0597344 0.269427 -1.56891e-07 0.410761 -1.50451e-07 0.55808C-1.44012e-07 0.705399 0.0597344 0.846732 0.166157 0.951212L2.78886 3.51075C3.11027 3.82403 3.54596 4 4.00022 4C4.45448 4 4.89017 3.82403 5.21158 3.51075L7.83428 0.951212C7.93985 0.847346 7.99936 0.707157 7.99999 0.560867C8.00042 0.487479 7.98601 0.414728 7.95758 0.346788C7.92914 0.278847 7.88724 0.217052 7.83428 0.164947C7.78117 0.112681 7.71797 0.0711956 7.64834 0.0428852C7.57871 0.0145748 7.50403 -3.36213e-07 7.42859 -3.32916e-07C7.35316 -3.29619e-07 7.27848 0.0145749 7.20885 0.0428852C7.13922 0.0711956 7.07602 0.112681 7.0229 0.164947L4.40591 2.72449Z"
          fill="#262626"
        />
      </svg>
    </button>
  );
};

export default SmallArrow;
