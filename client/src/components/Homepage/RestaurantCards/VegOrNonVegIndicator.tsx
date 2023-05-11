interface VegOrNonVegIndicatorProps {
  color: string;
}

const VegOrNonVegIndicator = ({ color }: VegOrNonVegIndicatorProps) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          border: `2px solid ${color}`,
          alignItems: 'center',
          justifyContent: 'center',
          height: '1.5rem',
          width: '1.5rem',
          margin: '0.5rem 0',
        }}
      >
        <div
          style={{
            borderRadius: '50%',
            height: '0.5rem',
            width: '0.5rem',
            background: `${color}`,
          }}
        ></div>
      </div>
    </>
  );
};

export default VegOrNonVegIndicator;
